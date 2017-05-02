Imports System.ComponentModel.DataAnnotations

Namespace TestDataNamespace
  Public Class MainObject
    ''' <summary>
    ''' If the object is actually an object, this is the id of the containing MainObject.
    ''' If the object is actually a body, this is the id of the body.
    ''' If the object is actually a fake object, this value is 0.
    ''' </summary>
    Public Property MainObjectID As Integer
    ''' <summary>
    ''' The Id of the jungle. If the object is actually a MainObject, this field is null.
    ''' </summary>
    Public Property JungleID As Integer?
    ''' <summary>
    ''' The id of the parent jungle. If the object is actually a MainObject, or if it is a root object of a MainObject, this field is null.
    ''' </summary>
    Public Property ParentJungleID As Integer?

    Public Property Name As String
    Public Property Money As Double
    Public Property Owner As User
    Public Property Unallocated As Double
    Public Property Logo As String
    Public Property ChildrenCount As Integer

    Public Property LetterCount As Integer
    Public Property LetterBudget As Double
    Public Property LetterAmount As Double
    Public Property OverallMice As Integer
    Public Property OverallRocks As Double
    Public Property OrderedMice As Integer
    Public Property OrderedRocks As Double
    Public Property StewedMice As Integer
    Public Property StewedRocks As Double
    Public Property HiddenMice As Integer
    Public Property HiddenRocks As Double
    Public Property NotReadableMice As Integer
    Public Property NotReadableRocks As Double

    Public Property CanShow As Boolean
    Public Property CanCreate As Boolean
  End Class
End Namespace