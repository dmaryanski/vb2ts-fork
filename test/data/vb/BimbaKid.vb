Namespace TestDataNamespace
  Public Class BimbaKid
    Public Property BimbaID As Integer
    Public Property MRU As String
    Public Property Unit As String
    Public Property Available As Boolean
    Public Property Length As Double
    Public Property MaxLength As Double

    Public Property History As New List(Of BimbaKidHistory)
    Public Property Specific As New Dictionary(Of String, Object)
  End Class
End Namespace