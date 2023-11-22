"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetTypeCategory = void 0;
var NetTypeCategory;
(function (NetTypeCategory) {
    /**A type that can be represented as a collection of items */
    NetTypeCategory[NetTypeCategory["Enumerable"] = 0] = "Enumerable";
    /**A dictionary is equivalent to a typescript object */
    NetTypeCategory[NetTypeCategory["Dictionary"] = 1] = "Dictionary";
    /**A c$# nullable type where the value type is the first generic type */
    NetTypeCategory[NetTypeCategory["Nullable"] = 2] = "Nullable";
    /**A c# tuple */
    NetTypeCategory[NetTypeCategory["Tuple"] = 3] = "Tuple";
    /**A boolean type */
    NetTypeCategory[NetTypeCategory["Boolean"] = 4] = "Boolean";
    /**A numeric type */
    NetTypeCategory[NetTypeCategory["Number"] = 5] = "Number";
    /* A string type */
    NetTypeCategory[NetTypeCategory["String"] = 6] = "String";
    /**A date type */
    NetTypeCategory[NetTypeCategory["Date"] = 7] = "Date";
    /**Any type */
    NetTypeCategory[NetTypeCategory["Any"] = 8] = "Any";
    /**Unidentified type */
    NetTypeCategory[NetTypeCategory["Other"] = 9] = "Other";
})(NetTypeCategory = exports.NetTypeCategory || (exports.NetTypeCategory = {}));
//# sourceMappingURL=NetTypeCategory.js.map