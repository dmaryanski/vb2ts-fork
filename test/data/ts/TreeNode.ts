namespace TestDataNamespace {
  export interface TreeNode extends TreeNodeBase {
    TotalChildrenCount: number | null;
    Children: TreeNode[];
  }
}