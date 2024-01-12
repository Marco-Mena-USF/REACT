function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

/**
 * O(N) time complexity
 * O(1) space complexity
 */
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  return left && right ? root : left || right;
}

module.exports = { TreeNode, lowestCommonAncestor };