Namespace TestDataNamespace
  Public Class OrderLot
    Public Property OrderID As Integer
    Public Property Previewer As User
    Public Property Budget As Double
    Public Property Manager As User

    ''' <summary>
    ''' The current status of the order
    ''' </summary>
    ''' <value></value>
    ''' <returns></returns>
    ''' <remarks>
    '''-2 - Unknown
    '''-1 - Postponed (The order was postponed by one of the previewers)
    ''' 0 - Open (The order is open to be read by subscribers)
    ''' 1 - Preview (The order has been previewed)
    ''' 2 - Accepted (Everyone is happy)
    '''</remarks>
    Public Property Status As Integer
    Public Property Preference As String
    Public Property ItemCount As Integer
    Public Property IsRealOrder As Boolean
    Public Property CanAdvance As Boolean

    Public Property AvailableWishes As Double
    Public Property Wishes As Double

    Public Property TotalMojitos As Double
    Public Property SustainedPeople As Integer
    Public Property SustainedMojitos As Double
    Public Property DeniedPeople As Integer
    Public Property DeniedMojitos As Double
    Public Property DisgracedPeople As Integer
    Public Property DisgracedMojitos As Double
    Public Property MeanPeople As Integer
    Public Property MeanMojitos As Double

    Public Property CurrencySymbol As String
    'Just another comment
    Public Property ID1 As Integer?
    Public Property ID2 As Integer?
    Public Property JungleName As String

    'And yet another one
    Public Property Subscribers As New List(Of Integer)
  End Class
End Namespace