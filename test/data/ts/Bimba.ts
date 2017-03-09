namespace TestDataNamespace {
  export interface Bimba {
    BimbaID: number;
    Vendor: Vendor;
    VideoUrl: string;
    Title: string;
    Available: boolean;
    Description: string;
    TokenSymbol: string;
    ExchangeRate: number | null;
    IsGood: boolean;

    Specifications: { [key: string]: any };
    Length: number | null;
    MaxLength: number | null;
    Kids: BimbaKid[];
  }
}