namespace TestDataNamespace {
  export interface OrderLot {
    OrderID: number;
    Previewer: User;
    Budget: number;
    Manager: User;

    /**
     * The current status of the order
     */
    /// <value></value>
    /// <returns></returns>
    /// <remarks>
    ///-2 - Unknown
    ///-1 - Postponed (The order was postponed by one of the previewers)
    /// 0 - Open (The order is open to be read by subscribers)
    /// 1 - Preview (The order has been previewed)
    /// 2 - Accepted (Everyone is happy)
    ///</remarks>
    Status: number;
    Preference: string;
    ItemCount: number;
    IsRealOrder: boolean;
    CanAdvance: boolean;

    AvailableWishes: number;
    Wishes: number;

    TotalMojitos: number;
    SustainedPeople: number;
    SustainedMojitos: number;
    DeniedPeople: number;
    DeniedMojitos: number;
    DisgracedPeople: number;
    DisgracedMojitos: number;
    MeanPeople: number;
    MeanMojitos: number;

    CurrencySymbol: string;
    // Just another comment
    ID1: number | null;
    ID2: number | null;
    JungleName: string;

    // And yet another one
    Subscribers: number[];
  }
}