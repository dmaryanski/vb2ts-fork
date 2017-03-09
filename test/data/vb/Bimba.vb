Namespace TestDataNamespace
  Public Class Bimba
    Public Property BimbaID As Integer
    Public Property Vendor As Vendor
    Public Property VideoUrl As String
    Public Property Title As String
    Public Property Available As Boolean
    Public Property Description As String
    Public Property TokenSymbol As String
    Public Property ExchangeRate As Double?
    Public Property IsGood As Boolean

    Public Property Specifications As New Dictionary(Of String, Object)
    Public Property Length As Double?
    Public Property MaxLength As Double?
    Public Property Kids As List(Of BimbaKid)
  End Class
End Namespace