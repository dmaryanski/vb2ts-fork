namespace TestDataNamespace {
  export interface MainObject {
    /**
     * If the object is actually an object, this is the id of the containing MainObject.
     * If the object is actually a body, this is the id of the body.
     * If the object is actually a fake object, this value is 0.
     */
    MainObjectID: number;
    /**
     * The Id of the jungle. If the object is actually a MainObject, this field is null.
     */
    JungleID: number | null;
    /**
     * The id of the parent jungle. If the object is actually a MainObject, or if it is a root object of a MainObject, this field is null.
     */
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