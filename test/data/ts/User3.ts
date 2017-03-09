namespace TestDataNamespace {
  export interface User3 {
    UserID: number;
    FirstName: string;
    LastName: string;
    Company: string;
    ProfilePicture: string;
    IsClient: boolean;
    IsAdmin: boolean;
    NotificationCount: number;
    PasswordReset: boolean;

    // -1 - No Role
    //  0 - Staff
    //  1 - Vendor
    //  2 - Client
    Type: number;
  }
}