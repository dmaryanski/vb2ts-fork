Namespace TestDataNamespace
  Public Class OrderInfoCollection
    Public Property ProjectID As Integer
    Public Property ProjectName As String
    Public Property FolderID As Integer?
    Public Property FolderName As String
    Public Property RequiredBy As Date?
    Public Property Owner As User
    Public Property CurrencySymbol As String
    Public Property Orders As New List(Of OrderLot)
  End Class
End Namespace
