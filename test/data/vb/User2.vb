Imports System.ComponentModel.DataAnnotations

Namespace TestDataNamespace
  Public Class User2
    Public Property UserID As Integer
    <Required>
    <MaxLength(45)>
    Public Property FirstName As String
    <Required>
    <MaxLength(45)>
    Public Property LastName As String
    <Required>
    Public Property Email As String
    Public Property Telephone As String
    <Required>
    <RegularExpression("^[MF]$", ErrorMessage:="Gender can only be ""M"" or ""F"".")>
    Public Property Gender As Char
    Public Property JobTitle As String
    Public Property ProfilePicture As String
    Public Property IsAdmin As Boolean?
  End Class
End Namespace