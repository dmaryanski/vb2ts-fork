namespace TestDataNamespace {
  export interface Item {
    Vendor: Vendor;

    ItemID: number;
    SubscriptionID: number;
    MRU: string;
    TrueUrl: string;
    Title: string;
    Description: string;
    Status: string;
    HasSomething: boolean;

    /// <summary>
    /// The priority of the item
    /// </summary>
    /// <value></value>
    /// <returns></returns>
    /// <remarks>
    /// The priority is an Integer rather than a boolean due to
    /// the old designs where we had 3 different priorities:
    /// 1 - Very high
    /// 0 - High
    /// -1 - Low
    /// 
    /// High and Very high have since been merged to give us
    /// 0 High
    /// -1 Low
    ///</remarks>
    Priority: number;

    RealPrice: number | null;
    Value: number | null;
    Quantity: number;
    Unit: string;
    JungleSymbol: string;
    PID: number;

    AdditionalID: number;
    TinyUrl: string;
    Details: { [key: string]: string };
  }
}
