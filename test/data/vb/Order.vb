Imports System.ComponentModel.DataAnnotations

Namespace TestDataNamespace
  Public Class Order
    Public Property OrderID As Integer
    Public Property JungleID As Integer?

    <Required>
    Public Property RegionID As Integer
    <Required(AllowEmptyStrings:=False)>
    Public Property Preference As String
    <Required>
    <Range(0, Double.PositiveInfinity, ErrorMessage:="Value must be positive.")>
    Public Property Budget As Double
    <Required>
    Public Property ManagedByID As Integer
    Public Property Subscribers As List(Of Integer)
  End Class
End Namespace
