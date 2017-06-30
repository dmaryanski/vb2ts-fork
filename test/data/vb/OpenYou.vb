Namespace TestDataNamespace
  Public Class OpenYou
    Inherits OpenMe

    Public Overrides Property Type As ObjectType = ObjectType.Folder
    Public Property Children As New List(Of OpenMe)
  End Class
End Namespace