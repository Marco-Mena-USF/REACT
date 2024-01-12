const { BinaryTree, BinaryTreeNode } = require("./binary-tree");

let smallTree;
let largeTree;
let emptyTree;

beforeEach(() => {
  emptyTree = new BinaryTree();

  // build small tree;
  const smallLeft = new BinaryTreeNode(5);
  const smallRight = new BinaryTreeNode(5);
  const smallRoot = new BinaryTreeNode(6, smallLeft, smallRight);
  smallTree = new BinaryTree(smallRoot);

  // build large tree
  const node6 = new BinaryTreeNode(1);
  const node5 = new BinaryTreeNode(1);
  const node4 = new BinaryTreeNode(2);
  const node3 = new BinaryTreeNode(3, node4, node6);
  const node2 = new BinaryTreeNode(5, node3, node5);
  const node1 = new BinaryTreeNode(5);
  const root = new BinaryTreeNode(6, node1, node2);
  largeTree = new BinaryTree(root);
});

describe("minDepth", () => {
  it("handles simple trees", () => {
    expect(smallTree.minDepth()).toBe(2);
  });

  it("handles more complex trees", () => {
    expect(largeTree.minDepth()).toBe(2);
  });

  it("handles empty trees", () => {
    expect(emptyTree.minDepth()).toBe(0);
  });
});

describe("maxDepth", () => {
  it("handles simple trees", () => {
    expect(smallTree.maxDepth()).toBe(2);
  });

  it("handles more complex trees", () => {
    expect(largeTree.maxDepth()).toBe(4);
  });

  it("handles empty trees", () => {
    expect(emptyTree.maxDepth()).toBe(0);
  });
});

describe("maxSum", () => {
  it("handles simple trees", () => {
    expect(smallTree.maxSum()).toBe(16);
  });

  it("handles empty trees", () => {
    expect(emptyTree.maxSum()).toBe(0);
  });

  it("handles more complex trees", () => {
    expect(largeTree.maxSum()).toBe(21);
  });

  it("handles negative values", () => {
    const node100 = new BinaryTreeNode(100);
    const node8 = new BinaryTreeNode(8);
    const nodeNeg4 = new BinaryTreeNode(-4);
    const node2 = new BinaryTreeNode(2, nodeNeg4);
    const nodeNeg3 = new BinaryTreeNode(-3, node8, node100);
    const root = new BinaryTreeNode(10, node2, nodeNeg3);
    const tree = new BinaryTree(root);

    expect(tree.maxSum()).toBe(109);
  });
});

describe("nextLarger", () => {
  it("handles simple trees", () => {
    expect(smallTree.nextLarger(4)).toBe(5);
    expect(smallTree.nextLarger(5)).toBe(6);
    expect(smallTree.nextLarger(6)).toBe(null);
  });

  it("handles empty trees", () => {
    expect(emptyTree.nextLarger(0)).toBe(null);
  });

  it("handles more complex trees", () => {
    expect(largeTree.nextLarger(1)).toBe(2);
    expect(largeTree.nextLarger(2)).toBe(3);
    expect(largeTree.nextLarger(3)).toBe(5);
    expect(largeTree.nextLarger(4)).toBe(5);
    expect(largeTree.nextLarger(5)).toBe(6);
    expect(largeTree.nextLarger(6)).toBe(null);
  });
});

describe("areCousins", () => {
  it("returns true if they are cousins, false if not", () => {
    const n7 = new BinaryTreeNode(7);
    const n6 = new BinaryTreeNode(6);
    const n5 = new BinaryTreeNode(5);
    const n4 = new BinaryTreeNode(4);
    const n3 = new BinaryTreeNode(3, n6, n7);
    const n2 = new BinaryTreeNode(2, n4, n5);
    const root = new BinaryTreeNode(1, n2, n3);
    const tree = new BinaryTree(root);

    expect(tree.areCousins(n4, n6)).toBe(true);
    expect(tree.areCousins(n4, n7)).toBe(true);
    expect(tree.areCousins(n5, n6)).toBe(true);
    expect(tree.areCousins(n5, n7)).toBe(true);
    expect(tree.areCousins(n2, n3)).toBe(false);
    expect(tree.areCousins(n4, n5)).toBe(false);
    expect(tree.areCousins(n6, n7)).toBe(false);
    expect(tree.areCousins(n4, n3)).toBe(false);
    expect(tree.areCousins(root, n3)).toBe(false);
  });
});

describe("serialize and deserialize", () => {
  let myTree;

  beforeEach(() => {
    const root = new BinaryTreeNode(1);
    root.left = new BinaryTreeNode(2);
    root.right = new BinaryTreeNode(3);
    root.right.left = new BinaryTreeNode(4);
    root.right.right = new BinaryTreeNode(5);

    myTree = new BinaryTree(root);
  });

  it("serializes trees into strings", () => {
    expect(typeof BinaryTree.serialize(myTree)).toBe("string");
  });

  it("deserializes strings into BinaryTree objects", () => {
    const serialized = BinaryTree.serialize(myTree);
    const result = BinaryTree.deserialize(serialized);
    expect(result instanceof BinaryTree).toBe(true);
  });

  it("reverses one another", () => {
    const serialized = BinaryTree.serialize(myTree);
    const result = BinaryTree.deserialize(serialized);
    expect(result).toEqual(myTree);
  });

  it("is a pure function", () => {
    const root = new BinaryTreeNode(1);
    root.left = new BinaryTreeNode(2);
    root.right = new BinaryTreeNode(3);
    root.right.left = new BinaryTreeNode(4);
    root.right.right = new BinaryTreeNode(5);

    myTreeCopy = new BinaryTree(root);

    const serialized = BinaryTree.serialize(myTree);
    BinaryTree.deserialize(serialized);

    expect(myTree).toEqual(myTreeCopy);
  });
});

describe("lowestCommonAncestor", () => {
  it("returns the lowest common ancestor", () => {
    const root = new BinaryTreeNode(3);
    const tree = new BinaryTree(root);

    const left = new BinaryTreeNode(5);
    root.left = left;

    const leftLeft = new BinaryTreeNode(6);
    left.left = leftLeft;

    const leftRight = new BinaryTreeNode(2);
    left.right = leftRight;

    const leftRightLeft = new BinaryTreeNode(7);
    leftRight.left = leftRightLeft;

    const leftRightRight = new BinaryTreeNode(4);
    leftRight.right = leftRightRight;

    const right = new BinaryTreeNode(1);
    root.right = right;

    const right_left = new BinaryTreeNode(0);
    right.left = right_left;

    const right_right = new BinaryTreeNode(8);
    right.right = right_right;

    expect(tree.lowestCommonAncestor(left, right)).toBe(root);
    expect(tree.lowestCommonAncestor(leftRight, leftRightLeft)).toBe(leftRight);
    expect(tree.lowestCommonAncestor(leftRightLeft, leftLeft)).toBe(left);
    expect(tree.lowestCommonAncestor(right_left, right_right)).toBe(right);
  });
});
