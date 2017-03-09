namespace TestDataNamespace {
  export interface OrderInfoCollection {
    ProjectID: number;
    ProjectName: string;
    FolderID: number | null;
    FolderName: string;
    RequiredBy: Date | null;
    Owner: User;
    CurrencySymbol: string;
    Orders: OrderLot[];
  }
}
