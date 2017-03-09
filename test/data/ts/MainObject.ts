namespace TestDataNamespace {
  export interface MainObject {
    MainObjectID: number;
    JungleID: number | null;
    ParentJungleID: number | null;

    Name: string;
    Money: number;
    Owner: User;
    Unallocated: number;
    Logo: string;
    ChildrenCount: number;

    LetterCount: number;
    LetterBudget: number;
    LetterAmount: number;
    OverallMice: number;
    OverallRocks: number;
    OrderedMice: number;
    OrderedRocks: number;
    StewedMice: number;
    StewedRocks: number;
    HiddenMice: number;
    HiddenRocks: number;
    NotReadableMice: number;
    NotReadableRocks: number;

    CanShow: boolean;
    CanCreate: boolean;
  }
}