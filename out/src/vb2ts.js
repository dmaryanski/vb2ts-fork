"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vb2Ts = void 0;
const types = require("./vbtypes");
class Vb2Ts {
    constructor() {
        this.Convert = (code, options) => {
            options = Object.assign({}, this.defaultOptions, options);
            var ret = "";
            var lineArr;
            var lastAddedLineJump = true;
            var index = 0;
            while (true) {
                var nextMatch = this.findMatch(code, index);
                if (nextMatch == null)
                    break;
                //add the last unmatched code:
                ret += code.substr(index, nextMatch.index - index);
                //add the matched code:
                ret += nextMatch.result;
                //increment the search index:
                index = nextMatch.index + nextMatch.length;
            }
            //add the last unmatched code:
            ret += code.substr(index);
            return ret;
        };
        this.defaultOptions = {
            ignoreNamespace: false
        };
        /**Generate a typescript property */
        this.generateTypescriptProperty = (vbType, name) => {
            //trim spaces:
            var tsType = types.parseType(vbType).convertToTypescript();
            return name + ": " + tsType + ";";
        };
        /**Convert a vb.net property to a typescript property */
        this.vbProperty = (code) => {
            let patt = /Public\s+(?:(?:MustInherit\s+)|(?:NotInheritable\s+)|(?:MustOverride\s+)|(?:Overridable\s+)|(?:Overrides\s+)|(?:Overloads\s+))?Property\s+(?:(?=\[\S+\])\[(\S+)\]|(?!\[\S+\])(\S+))\s+As\s+(?:New)?\s*(.+)[^\S\r\n]*(?=\r\n?|\n)/;
            let arr = patt.exec(code);
            if (!arr) {
                return null;
            }
            var name = arr[1] || arr[2];
            var type = arr[3];
            return {
                result: this.generateTypescriptProperty(type, name),
                index: arr.index,
                length: arr[0].length,
                type: 'property'
            };
        };
        /**Convert a vb.net opening namespace declaration to a typescript property */
        this.vbNamespaceStart = (code) => {
            let patt = /Namespace\s+(\S+)[^\S\r\n]*(?=\r\n?|\n)/;
            let arr = patt.exec(code);
            if (!arr) {
                return null;
            }
            var name = arr[1];
            return {
                result: `namespace ${name} {`,
                index: arr.index,
                length: arr[0].length,
                type: 'namespace'
            };
        };
        /**Convert a vb.net opening namespace declaration to a typescript property */
        this.vbNamespaceEnd = (code) => {
            let patt = /End\s+Namespace/;
            let arr = patt.exec(code);
            if (!arr) {
                return null;
            }
            return {
                result: "}",
                index: arr.index,
                length: arr[0].length,
                type: 'namespace-end'
            };
        };
        this.imports = (code) => {
            let patt = /Imports\s+\S*[^\S\r\n]*(?:\r\n?|\n)+/;
            let arr = patt.exec(code);
            if (!arr) {
                return null;
            }
            return {
                result: "",
                index: arr.index,
                length: arr[0].length,
                type: 'ímports'
            };
        };
        this.vbClassStart = (code) => {
            let patt = /Public\s+(?:(?:MustInherit\s+)|(?:NotInheritable\s+))?Class\s+(\S+)[^\S\r\n]*(?:\r\n?|\n)(?:\s*Inherits\s+(\S+)\s*\n)?/;
            let arr = patt.exec(code);
            if (!arr) {
                return null;
            }
            var name = arr[1];
            let baseClassName = arr[2];
            return {
                result: `export interface ${name}${baseClassName ? " extends " + baseClassName : ""} {${Vb2Ts.eof}`,
                index: arr.index,
                length: arr[0].length,
                type: 'class'
            };
        };
        this.vbClassEnd = (code) => {
            let patt = /End\s+Class[^\S\r\n]*(?=\r\n?|\n)/;
            let arr = patt.exec(code);
            if (!arr) {
                return null;
            }
            return {
                result: `}`,
                index: arr.index,
                length: arr[0].length,
                type: 'class-end'
            };
        };
        this.vbEnum = (code) => {
            let patt = /Public\s+Enum\s+(\S+)[^\S\r\n]*(?=\r\n?|\n)([\S\s]*?)End\s+Enum[^\S\r\n]*/;
            let arr = patt.exec(code);
            if (!arr) {
                return null;
            }
            let name = arr[1];
            let contents = arr[2];
            let convertedContents = this.vbEnum2ts(contents);
            return {
                result: `export enum ${name} {${convertedContents}}`,
                index: arr.index,
                length: arr[0].length,
                type: 'enum'
            };
        };
        /**
         * This is an internal function that only parses the inner contents of an enum.
         * @param code The vb.net Enum contents code (which is between 'Public Enum x' and 'End Enum')
         */
        this.enumContents = (code) => {
            let literalsPatt = /(\w+)(?:\s*=\s*([\d-]+))?/;
            let arr = literalsPatt.exec(code);
            if (!arr) {
                return null;
            }
            let name = arr[1];
            let value = arr[2];
            return {
                result: value !== undefined ? `${name} = ${value}` : `${name}`,
                index: arr.index,
                length: arr[0].length,
                type: 'enum-contents'
            };
        };
        this.singleLineComment = (code) => {
            var patt = /'(.*)/;
            var arr = patt.exec(code);
            if (arr == null)
                return null;
            return {
                result: `// ${arr[1]}`,
                index: arr.index,
                length: arr[0].length,
                type: 'single-line-comment'
            };
        };
        this.documentationComments = (code) => {
            var patt = /'''(.*)/;
            var arr = patt.exec(code);
            if (arr == null)
                return null;
            return {
                result: `///${arr[1]}`,
                index: arr.index,
                length: arr[0].length,
                type: 'documentation-comments'
            };
        };
        this.documentationSummary = (code) => {
            var patt = /(?=[^\S\r\n]*)'''\s*<summary>[^\S\r\n]*(?=\r\n?|\n)([\s\S]*?)(?=[^\S\r\n]*)'''\s*<\/summary>[^\S\r\n]*(?=\r\n?|\n)/g;
            var arr = patt.exec(code);
            if (arr == null)
                return null;
            let contents = arr[1];
            let summaryContents = this.vbDocSummary2Ts(contents);
            return {
                result: `/**${summaryContents} */`,
                index: arr.index,
                length: arr[0].length,
                type: 'documentation-summary-start'
            };
        };
        this.documentationSummaryContents = (code) => {
            var patt = /'''(.*)/;
            var arr = patt.exec(code);
            if (arr == null)
                return null;
            return {
                result: ` *${arr[1]}`,
                index: arr.index,
                length: arr[0].length,
                type: 'documentation-comments'
            };
        };
        this.attribute = (code) => {
            var patt = /^(?:[^\S\x0a\x0d]*)<.*>\s*\n/m;
            var arr = patt.exec(code);
            if (arr == null)
                return null;
            return {
                result: "",
                index: arr.index,
                length: arr[0].length,
                type: 'attribute'
            };
        };
        /**Find the next match */
        this.findMatch = (code, startIndex) => {
            code = code.substr(startIndex);
            var functions = [
                this.vbNamespaceStart,
                this.vbNamespaceEnd,
                this.vbClassStart,
                this.vbClassEnd,
                this.vbEnum,
                this.vbProperty,
                this.documentationSummary,
                this.documentationComments,
                this.singleLineComment,
                this.imports,
                this.attribute
            ];
            var firstMatch = null;
            for (let i = 0; i < functions.length; i++) {
                var match = functions[i](code);
                if (match != null && (firstMatch == null || match.index < firstMatch.index)) {
                    firstMatch = match;
                }
            }
            return firstMatch ? {
                result: firstMatch.result,
                index: firstMatch.index + startIndex,
                length: firstMatch.length,
                type: firstMatch.type
            } : null;
        };
        this.findEnumMatch = (code, startIndex) => {
            code = code.substr(startIndex);
            var functions = [
                this.enumContents,
                this.documentationSummary,
                this.documentationComments,
                this.singleLineComment
            ];
            var firstMatch = null;
            for (let i = 0; i < functions.length; i++) {
                var match = functions[i](code);
                if (match != null && (firstMatch == null || match.index < firstMatch.index)) {
                    firstMatch = match;
                }
            }
            return firstMatch ? {
                result: firstMatch.result,
                index: firstMatch.index + startIndex,
                length: firstMatch.length,
                type: firstMatch.type
            } : null;
        };
        this.findDocMatch = (code, startIndex) => {
            code = code.substr(startIndex);
            var functions = [
                this.documentationSummaryContents,
                this.documentationComments,
                this.singleLineComment
            ];
            var firstMatch = null;
            for (let i = 0; i < functions.length; i++) {
                var match = functions[i](code);
                if (match != null && (firstMatch == null || match.index < firstMatch.index)) {
                    firstMatch = match;
                }
            }
            return firstMatch ? {
                result: firstMatch.result,
                index: firstMatch.index + startIndex,
                length: firstMatch.length,
                type: firstMatch.type
            } : null;
        };
        this.vbEnum2ts = (code) => {
            var ret = [];
            var lineArr;
            var lastAddedLineJump = true;
            let index = 0, match, lastMember;
            while (true) {
                var nextMatch = this.findEnumMatch(code, index);
                if (nextMatch == null)
                    break;
                //add the last unmatched code:
                ret.push(code.substr(index, nextMatch.index - index));
                //add the matched code:
                ret.push(nextMatch.result + (nextMatch.type == "enum-contents" ? "," : ""));
                if (nextMatch.type == "enum-contents") {
                    lastMember = ret.length - 1;
                }
                //increment the search index:
                index = nextMatch.index + nextMatch.length;
            }
            ret[lastMember] = ret[lastMember].substr(0, ret[lastMember].length - 1);
            //add the last unmatched code:
            ret.push(code.substr(index));
            return ret.join("");
        };
        this.vbDocSummary2Ts = (code) => {
            var ret = [];
            var lineArr;
            var lastAddedLineJump = true;
            let index = 0, match, lastMember;
            while (true) {
                var nextMatch = this.findDocMatch(code, index);
                if (nextMatch == null)
                    break;
                //add the last unmatched code:
                ret.push(code.substr(index, nextMatch.index - index));
                //add the matched code:
                ret.push(nextMatch.result);
                //increment the search index:
                index = nextMatch.index + nextMatch.length;
            }
            //add the last unmatched code:
            ret.push(code.substr(index));
            return ret.join("");
        };
    }
}
exports.Vb2Ts = Vb2Ts;
// "[^\S\r\n]*(?=\r\n?|\n)" = end of current line: any number of spaces plus cross-platform newline, which is not included into match so that it remains in the final result.
Vb2Ts.eof = "\r\n";
/**Convert vb.net code to typescript code */
function vb2ts(code, options) {
    return new Vb2Ts().Convert(code, options);
}
exports.default = vb2ts;
//# sourceMappingURL=vb2ts.js.map