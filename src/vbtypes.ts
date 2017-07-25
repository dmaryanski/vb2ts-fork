import { NetTypeCategory } from './NetTypeCategory';

/**A c# type */
export class VbType {
    constructor(name: string, generics: VbType[], array: VbArray[]) {
        this.name = name;
        this.generics = generics;
        this.array = array;
    }

    /**Nullable type name */
    static nullable = "Nullable";

    /**Type name */
    name: string;
    /**Generic arguments */
    generics: VbType[];

    /**Neasted arrays */
    array: VbArray[];

    /**Gets the type category */
    get category(): NetTypeCategory {
        var enumerables = ["List", "ObservableCollection", "Array", "IEnumerable", "IList", "IReadOnlyList", "Collection", "ICollection"];
        var dictionaries = ["Dictionary", "IDictionary"];

        var bools = ["bool", "Boolean", "System.Boolean"];
        var strings = ["String", "Char", "Guid"];
        var numbers = [
            "Integer", "Double",
            'int', "Int32", "System.Int32",
            'float', "Single", "System.Single",
            'decimal', "Decimal", "System.Decimal",
            'long', "Int64", "System.Int64",
            'byte', "Byte", "System.Byte",
            'sbyte', "SByte", "System.SByte",
            'short', "Int16", "System.Int16",
            'ushort', "UInt16", "System.UInt16",
            'ulong', "UInt64", "System.UInt64"
        ];
        var dates = ["DateTime", "System.DateTime", "DateTimeOffset", "System.DateTimeOffset"];
        var anys = ["Object", "object", "System.Object", "dynamic"];
        if (enumerables.indexOf(this.name) != -1 && this.generics.length <= 1) {
            return NetTypeCategory.Enumerable;
        } else if (dictionaries.indexOf(this.name) != -1 && this.generics.length == 2) {
            return NetTypeCategory.Dictionary;
        } else if (this.name == VbType.nullable && this.generics.length == 1) {
            return NetTypeCategory.Nullable;
        } else if (this.name == "Tuple" && this.generics.length > 0) {
            return NetTypeCategory.Tuple;
        } else if (bools.indexOf(this.name) != -1 && this.generics.length == 0) {
            return NetTypeCategory.Boolean;
        } else if (strings.indexOf(this.name) != -1 && this.generics.length == 0) {
            return NetTypeCategory.String;
        } else if (numbers.indexOf(this.name) != -1 && this.generics.length == 0) {
            return NetTypeCategory.Number;
        } else if (dates.indexOf(this.name) != -1 && this.generics.length == 0) {
            return NetTypeCategory.Date;
        } else if (anys.indexOf(this.name) != -1 && this.generics.length == 0) {
            return NetTypeCategory.Any;
        } else {
            return NetTypeCategory.Other;
        }
    }

    /**Convert this type to a typescript type */
    private convertToTypescriptNoArray(): string {
        switch (this.category) {
            case NetTypeCategory.Enumerable: {
                if (this.generics.length == 0) {
                    return "any[]";
                } else if (this.generics.length == 1) {
                    return this.generics[0].convertToTypescript() + "[]";
                } else {
                    throw "";
                }
            }

            case NetTypeCategory.Dictionary: {
                if (this.generics.length == 2) {
                    let keyType = (this.generics[0].category == NetTypeCategory.Number) ? "number" : "string";

                    return `{ [key: ${keyType}]: ${this.generics[1].convertToTypescript()} }`;
                } else {
                    throw "";
                }
            }
            case NetTypeCategory.Nullable: {
                if (this.generics.length == 1) {
                    return `${this.generics[0].convertToTypescript()} | null`;
                }
                else {
                    throw "";
                }
            }
            case NetTypeCategory.Tuple: {
                if (this.generics.length == 0)
                    throw "";
                let x: { Item1: number, Item2: boolean };
                let tupleElements = this.generics.map((v, i) => `Item${i + 1}: ${v.convertToTypescript()}`);
                let join = tupleElements.reduce((a, b) => a ? a + ", " + b : b, "");
                return `{ ${join} }`;
            }
            case NetTypeCategory.Boolean: {
                return "boolean";
            }
            case NetTypeCategory.String: {
                return "string";
            }
            case NetTypeCategory.Number: {
                return "number";
            }
            case NetTypeCategory.Date: {
                return "Date";
            }
            case NetTypeCategory.Any: {
                return "any";
            }
            case NetTypeCategory.Other: {
                if (this.generics.length > 0) {
                    var generics = this.generics.map(x => x.convertToTypescript()).reduce((a, b) => a ? a + ", " + b : b, "");
                    return `${this.name}<${generics}>`;
                } else {
                    return this.name;
                }
            }
        }
    }

    /**Convert this type to a typescript type */
    convertToTypescript(): string {
        var arrayStr = "";
        for (var a of this.array) {
            arrayStr += "[";
            for (var i = 1; i < a.dimensions; i++) {
                arrayStr += ",";
            }
            arrayStr += "]";
        }
        return this.convertToTypescriptNoArray() + arrayStr;
    }
}
/**A c# array */
interface VbArray {
    /**Array dimensions */
    dimensions: number;
}

/**Split on top level by a given separator, separators inside < >, [ ], { } or ( ) groups are not considered
 *
 * @param separator One char separators
 */
function splitTopLevel(text: string, separators: string[], openGroup: string[], closeGroup: string[]): string[] {
    var ret: string[] = [];
    var level = 0;
    var current = "";
    var openGroup = ["[", "(", "<", "{"];
    var closeGroup = ["]", ")", ">", "}"];
    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);
        if (openGroup.indexOf(char) != -1) {
            level++;
        }
        if (closeGroup.indexOf(char) != -1) {
            level--;
        }

        if (level == 0 && separators.indexOf(char) != -1) {
            ret.push(current);
            current = "";
        } else {
            current += char;
        }
    }
    if (current != "")
        ret.push(current);
    return ret;
}

/**Split on top level commas */
function splitCommas(text: string): string[] {
    return splitTopLevel(text, [","], ["[", "(", "<", "{"], ["]", ")", ">", "}"]);
}

/**Parse an array definition */
function parseArray(code: string): VbArray[] {
    let ret: VbArray[] = [];
    for (let i = 0; i < code.length; i++) {
        let char = code.charAt(i);
        if (char == "[") {
            ret.push({ dimensions: 1 });
        }
        if (char == "," && ret.length) {
            ret[ret.length - 1].dimensions++;
        }
    }
    return ret;
}

/**Parse a .net type, returns null if the given type could not be parsed */
export function parseType(code: string): VbType | null {
    var patt = /([a-zA-Z0-9_]+)(\??)\s*(?:\(Of (.*)\))?/;

    var arr = patt.exec(code);
    if (!arr) {
        return null;
    }

    //Pattern groups:
    var name = arr[1];
    var nullable = arr[2] == "?";
    var genericsStr = splitCommas(arr[3] || "");
    // var arraysStr = arr[4] || "";

    // var arrays = parseArray(arraysStr);
    var generics = genericsStr.map(x => parseType(x));
    if (nullable) {
        var underlyingType = new VbType(name, generics, []);
        return new VbType(VbType.nullable, [underlyingType], []/*arrays*/);
    } else {
        return new VbType(name, generics, []/*, arrays*/);
    }
}
