namespace TestDataNamespace {
  export interface Order {
    OrderID: number;
    JungleID: number | null;

    RegionID: number;
    Preference: string;
    Budget: number;
    ManagedByID: number;
    Subscribers: number[];
  }
}
