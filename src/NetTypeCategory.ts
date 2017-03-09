export enum NetTypeCategory {
    /**A type that can be represented as a collection of items */
    Enumerable,
    /**A dictionary is equivalent to a typescript object */
    Dictionary,
    /**A c$# nullable type where the value type is the first generic type */
    Nullable,
    /**A c# tuple */
    Tuple,
    /**A boolean type */
    Boolean,
    /**A numeric type */
    Number,
    /* A string type */
    String,
    /**A date type */
    Date,
    /**Any type */
    Any,
    /**Unidentified type */
    Other
}