namespace TestDataNamespace {
  export interface ExtendedInfo extends MainObject {
    /**
     * The current status of the Object
     */
    /// <value></value>
    /// <returns></returns>
    /// <remarks>
    /// 0 - Open (The Object is open to be edited)
    /// 1 - Closed (All children have been closed and the Object has been sent back)
    /// 2 - Sealed (All items in the Object have now been supplied to the Jungle, or the Jungle has been notified of items that ths store could not supply)
    /// -1 - Unknown
    /// </remarks>
    Status: number;

    DeliveryAddressID: number;
    InvoiceAddressID: number;
    FreightContactID: number | null;

    MayorID: number;

    RequiredShredDate: Date | null;
    ClosureDate: Date | null;
    ClosureYear: number | null;

    TotalPixels: number;
    CompletePixels: number;
    PartialPixels: number;
    EmptyPixels: number;
  }
}