namespace TestDataNamespace {
  export interface BimbaKid {
    BimbaID: number;
    MRU: string;
    Unit: string;
    Available: boolean;
    Length: number;
    MaxLength: number;

    History: BimbaKidHistory[];
    Specific: { [key: string]: any };
  }
}