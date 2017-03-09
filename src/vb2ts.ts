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
    let patt = /Public\s+(?:(?:MustInherit\s+)|(?:NotInheritable\s+)|(?:MustOverride\s+))?Property\s+(?:(?=\[\S+\])\[(\S+)\]|(?!\[\S+\])(\S+))\s+As\s+(?:New)?\s*(.+)[^\S\r\n]*(?=\r\n?|\n)/;
    let arr = patt.exec(code);

    if (!arr) {
        return null;
    }
    var name = arr[1] || arr[2];
    var type = arr[3];
    return {
        result: generateTypescriptProperty(type, name),
        index: arr.index,
        length: arr[0].length
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
        length: arr[0].length
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
        length: arr[0].length
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
        length: arr[0].length
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
        length: arr[0].length
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
        length: arr[0].length
    };
}

function singleLineComment(code: string): Match {
    var patt = /'(.*)/;
    var arr = patt.exec(code);
    if (arr == null) return null;

    return {
        result: `// ${arr[1]}`,
        index: arr.index,
        length: arr[0].length
    };
}

function documentationComments(code: string): Match {
    var patt = /'''(.*)/;
    var arr = patt.exec(code);
    if (arr == null) return null;

    return {
        result: `///${arr[1]}`,
        index: arr.index,
        length: arr[0].length
    };
}

function attribute(code: string): Match {
    var patt = /^(?:[^\S\x0a\x0d]*)<.*>\s*\n/m;
    var arr = patt.exec(code);
    if (arr == null) return null;

    return {
        result: "",
        index: arr.index,
        length: arr[0].length
    };
}

interface Match {
    /**Replacement string */
    result: string;
    /**Original index */
    index: number;
    /**Original lenght */
    length: number;
}

/**Find the next match */
function findMatch(code: string, startIndex: number): Match {
    code = code.substr(startIndex);

    var functions: ((code: string) => Match)[] = [
        vbNamespaceStart,
        vbNamespaceEnd,
        vbClassStart,
        vbClassEnd,
        vbProperty,
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
        length: firstMatch.length
    } : null;
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
