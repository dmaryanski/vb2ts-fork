import * as types from './vbtypes';

// "[^\S\r\n]*(?=\r\n?|\n)" = end of current line: any number of spaces plus cross-platform newline, which is not included into match so that it remains in the final result.

const eof = "\r\n"

/**Generate a typescript property */
function generateTypescriptProperty(vbType: string, name: string): string {
    //trim spaces:
    var tsType = types.parseType(vbType).convertToTypescript();
    return name + ": " + tsType + ";";
}

/**Convert a vb.net property to a typescript property */
function vbProperty(code: string): Match {
    let patt = /Public\s+(?:(?:MustInherit\s+)|(?:NotInheritable\s+)|(?:MustOverride\s+)|(?:Overridable\s+))?Property\s+(?:(?=\[\S+\])\[(\S+)\]|(?!\[\S+\])(\S+))\s+As\s+(?:New)?\s*(.+)[^\S\r\n]*(?=\r\n?|\n)/;
    let arr = patt.exec(code);

    if (!arr) {
        return null;
    }
    var name = arr[1] || arr[2];
    var type = arr[3];
    return {
        result: generateTypescriptProperty(type, name),
        index: arr.index,
        length: arr[0].length,
        type: 'property'
    };
}

/**Convert a vb.net opening namespace declaration to a typescript property */
function vbNamespaceStart(code: string): Match {
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
}

/**Convert a vb.net opening namespace declaration to a typescript property */
function vbNamespaceEnd(code: string): Match {
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
}

function imports(code: string): Match {
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
}

function vbClassStart(code: string): Match {
    let patt = /Public\s+(?:(?:MustInherit\s+)|(?:NotInheritable\s+))?Class\s+(\S+)[^\S\r\n]*(?:\r\n?|\n)(?:\s*Inherits\s+(\S+)\s*\n)?/;
    let arr = patt.exec(code);

    if (!arr) {
        return null;
    }
    var name = arr[1];
    let baseClassName = arr[2];
    return {
        result: `export interface ${name}${baseClassName ? " extends " + baseClassName : ""} {${eof}`,
        index: arr.index,
        length: arr[0].length,
        type: 'class'
    };
}

function vbClassEnd(code: string): Match {
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
}

function vbEnum(code: string): Match {
    let patt = /Public\s+Enum\s+(\S+)[^\S\r\n]*(?=\r\n?|\n)([\S\s]*)End\s+Enum[^\S\r\n]*(?=\r\n?|\n)/;
    let arr = patt.exec(code);

    if (!arr) {
        return null;
    }
    let name = arr[1];
    let contents = arr[2];
    let convertedContents = vbEnum2ts(contents);

    return {
        result: `export enum ${name} {${convertedContents}}`,
        index: arr.index,
        length: arr[0].length,
        type: 'enum'
    };
}

/**
 * This is an internal function that only parses the inner contents of an enum.
 * @param code The vb.net Enum contents code (which is between 'Public Enum x' and 'End Enum')
 */
function enumContents(code: string): Match {
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
}

function singleLineComment(code: string): Match {
    var patt = /'(.*)/;
    var arr = patt.exec(code);
    if (arr == null) return null;

    return {
        result: `// ${arr[1]}`,
        index: arr.index,
        length: arr[0].length,
        type: 'single-line-comment'
    };
}

function documentationComments(code: string): Match {
    var patt = /'''(.*)/;
    var arr = patt.exec(code);
    if (arr == null) return null;

    return {
        result: `///${arr[1]}`,
        index: arr.index,
        length: arr[0].length,
        type: 'documentation-comments'
    };
}

function documentationSummary(code: string): Match {
    var patt = /(?=[^\S\r\n]*)'''\s*<summary>[^\S\r\n]*(?=\r\n?|\n)([\s\S]*?)(?=[^\S\r\n]*)'''\s*<\/summary>[^\S\r\n]*(?=\r\n?|\n)/g;
    var arr = patt.exec(code);
    if (arr == null) return null;

    let contents = arr[1];
    let summaryContents = vbDocSummary2Ts(contents);

    return {
        result: `/**${summaryContents} */`,
        index: arr.index,
        length: arr[0].length,
        type: 'documentation-summary-start'
    };
}

function documentationSummaryContents(code: string): Match {
    var patt = /'''(.*)/;
    var arr = patt.exec(code);
    if (arr == null) return null;

    return {
        result: ` *${arr[1]}`,
        index: arr.index,
        length: arr[0].length,
        type: 'documentation-comments'
    };
}

function attribute(code: string): Match {
    var patt = /^(?:[^\S\x0a\x0d]*)<.*>\s*\n/m;
    var arr = patt.exec(code);
    if (arr == null) return null;

    return {
        result: "",
        index: arr.index,
        length: arr[0].length,
        type: 'attribute'
    };
}

interface Match {
    /**Replacement string */
    result: string;
    /**Original index */
    index: number;
    /**Original lenght */
    length: number;
    type: string;
}

/**Find the next match */
function findMatch(code: string, startIndex: number): Match {
    code = code.substr(startIndex);

    var functions: ((code: string) => Match)[] = [
        vbNamespaceStart,
        vbNamespaceEnd,
        vbClassStart,
        vbClassEnd,
        vbEnum,
        vbProperty,
        documentationSummary,
        documentationComments,
        singleLineComment,
        imports,
        attribute
    ];

    var firstMatch: Match = null;
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
}

function findEnumMatch(code: string, startIndex: number): Match {
    code = code.substr(startIndex);

    var functions: ((code: string) => Match)[] = [
        enumContents,
        documentationSummary,
        documentationComments,
        singleLineComment
    ];

    var firstMatch: Match = null;
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
}

function findDocMatch(code: string, startIndex: number): Match {
    code = code.substr(startIndex);

    var functions: ((code: string) => Match)[] = [
        documentationSummaryContents,
        documentationComments,
        singleLineComment
    ];

    var firstMatch: Match = null;
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
}

function vbEnum2ts(code: string) {
    var ret: string[] = [];
    var lineArr: RegExpExecArray;
    var lastAddedLineJump = true;

    let index = 0, match, lastMember;
    while (true) {
        var nextMatch = findEnumMatch(code, index);
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
}

function vbDocSummary2Ts(code: string) {
    var ret: string[] = [];
    var lineArr: RegExpExecArray;
    var lastAddedLineJump = true;

    let index = 0, match, lastMember;
    while (true) {
        var nextMatch = findDocMatch(code, index);
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
}

/**Convert c# code to typescript code */
export default function vb2ts(code: string): string {
    var ret = "";
    var lineArr: RegExpExecArray;
    var lastAddedLineJump = true;

    var index = 0;
    while (true) {
        var nextMatch = findMatch(code, index);
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
}
