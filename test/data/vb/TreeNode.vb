Namespace TestDataNamespace
  Public Class TreeNode
    Inherits TreeNodeBase

    Public Property TotalChildrenCount As Integer?
    Public Property Children As New List(Of TreeNode)
  End Class
End Namespace