Namespace TestDataNamespace
  Public Class Item
    Public Property Vendor As Vendor

    Public Property ItemID As Integer
    Public Property SubscriptionID As Integer
    Public Property MRU As String
    Public Property TrueUrl As String
    Public Property Title As String
    Public Property Description As String
    Public Property Status As String
    Public Property HasSomething As Boolean

    ''' <summary>
    ''' The priority of the item
    ''' </summary>
    ''' <value></value>
    ''' <returns></returns>
    ''' <remarks>
    ''' The priority is an Integer rather than a boolean due to
    ''' the old designs where we had 3 different priorities:
    ''' 1 - Very high
    ''' 0 - High
    ''' -1 - Low
    ''' 
    ''' High and Very high have since been merged to give us
    ''' 0 High
    ''' -1 Low
    '''</remarks>
    Public Property Priority As Integer

    Public Property RealPrice As Double?
    Public Property Value As Double?
    Public Property Quantity As Integer
    Public Property Unit As String
    Public Property JungleSymbol As String
    Public Property PID As Integer

    Public Property AdditionalID As Integer
    Public Property TinyUrl As String
    Public Property Details As New Dictionary(Of String, String)
  End Class
End Namespace
