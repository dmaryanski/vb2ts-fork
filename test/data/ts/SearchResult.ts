namespace TestDataNamespace {
  export interface SearchResult {
    RealID: number | null;
    SomethingID: number;
    Title: string;
    Image: string;
    Variations: number;
    Price: number;
    SuperPrice: number;
    CurrencySymbol: string;
    ExchangeRate: number;
    Vendor: Vendor;

    IsGood: boolean;
    IsAvailable: boolean;
  }
}