Imports System.ComponentModel.DataAnnotations

Namespace TestDataNamespace
  Public Class ExtendedInfo
    Inherits MainObject
    ''' <summary>
    ''' The current status of the Object
    ''' </summary>
    ''' <value></value>
    ''' <returns></returns>
    ''' <remarks>
    ''' 0 - Open (The Object is open to be edited)
    ''' 1 - Closed (All children have been closed and the Object has been sent back)
    ''' 2 - Sealed (All items in the Object have now been supplied to the Jungle, or the Jungle has been notified of items that ths store could not supply)
    ''' -1 - Unknown
    ''' </remarks>
    Public Property Status As Integer

    Public Property DeliveryAddressID As Integer
    Public Property InvoiceAddressID As Integer
    Public Property FreightContactID As Integer?

    Public Property MayorID As Integer

    Public Property RequiredShredDate As Date?
    Public Property ClosureDate As Date?
    Public Property ClosureYear As Integer?

    Public Property TotalPixels As Integer
    Public Property CompletePixels As Integer
    Public Property PartialPixels As Integer
    Public Property EmptyPixels As Integer
  End Class
End Namespace