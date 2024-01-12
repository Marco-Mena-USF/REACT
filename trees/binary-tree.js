/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  minDepth() {
    return this.root ? this.minDepthHelper(this.root) : 0;
  }

  minDepthHelper(node) {
    if (!node.left && !node.right) return 1;
    if (!node.left) return this.minDepthHelper(node.right) + 1;
    if (!node.right) return this.minDepthHelper(node.left) + 1;
    return Math.min(this.minDepthHelper(node.left), this.minDepthHelper(node.right)) + 1;
  }

  maxDepth() {
    return this.root ? this.maxDepthHelper(this.root) : 0;
  }

  maxDepthHelper(node) {
    if (!node.left && !node.right) return 1;
    if (!node.left) return this.maxDepthHelper(node.right) + 1;
    if (!node.right) return this.maxDepthHelper(node.left) + 1;
    return Math.max(this.maxDepthHelper(node.left), this.maxDepthHelper(node.right)) + 1;
  }

  maxSum() {
    let result = 0;

    const maxSumHelper = (node) => {
      if (!node) return 0;
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    };

    maxSumHelper(this.root);
    return result;
  }

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let queue = [this.root];
    let closest = null;

    while (queue.length) {
      let currentNode = queue.shift();
      let currentVal = currentNode.val;
      let higherThanLowerBound = currentVal > lowerBound;
      let shouldReassignClosest = currentVal < closest || closest === null;

      if (higherThanLowerBound && shouldReassignClosest) {
        closest = currentVal;
      }

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return closest;
  }

  areCousins(node1, node2) {
    if (node1 === this.root || node2 === this.root) return false;

    const findLevelAndParent = (nodeToFind, currentNode, level = 0, data = { level: 0, parent: null }) => {
      if (data.parent) return data;
      if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
        data.level = level + 1;
        data.parent = currentNode;
      }
      if (currentNode.left) findLevelAndParent(nodeToFind, currentNode.left, level + 1, data);
      if (currentNode.right) findLevelAndParent(nodeToFind, currentNode.right, level + 1, data);
      return data;
    };

    let node1Info = findLevelAndParent(node1, this.root);
    let node2Info = findLevelAndParent(node2, this.root);

    let sameLevel = node1Info && node2Info && node1Info.level === node2Info.level;
    let differentParents = node1Info && node2Info && node1Info.parent !== node2Info.parent;
    return sameLevel && differentParents;
  }

  static serialize(tree) {
    const values = [];

    const traverse = (node) => {
      if (node) {
        values.push(node.val);
        traverse(node.left);
        traverse(node.right);
      } else {
        values.push("#");
      }
    };

    traverse(tree.root);
    return values.join(" ");
  }

  static deserialize(stringTree) {
    if (!stringTree) return null;

    const values = stringTree.split(" ");

    const buildTree = () => {
      if (values.length) {
        const currentVal = values.shift();

        if (currentVal === "#") return null;

        let currentNode = new BinaryTreeNode(+currentVal);
        currentNode.left = buildTree();
        currentNode.right = buildTree();

        return currentNode;
      }
    };

    const root = buildTree();
    return new BinaryTree(root);
  }

  lowestCommonAncestor(node1, node2, currentNode = this.root) {
    if (currentNode === null) return null;
    if (currentNode === node1 || currentNode === node2) return currentNode;

    const left = this.lowestCommonAncestor(node1, node2, currentNode.left);
    const right = this.lowestCommonAncestor(node1, node2, currentNode.right);

    if (left !== null && right !== null) return currentNode;
    if (left !== null || right !== null) return left || right;
    if (left === null && right === null) return null;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
