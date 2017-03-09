Namespace TestDataNamespace
  Public Class User3
    Public Property UserID As Integer
    Public Property FirstName As String
    Public Property LastName As String
    Public Property Company As String
    Public Property ProfilePicture As String
    Public Property IsClient As Boolean
    Public Property IsAdmin As Boolean
    Public Property NotificationCount As Integer
    Public Property PasswordReset As Boolean

    '-1 - No Role
    ' 0 - Staff
    ' 1 - Vendor
    ' 2 - Client
    Public Property Type As Integer
  End Class
End Namespace