// bun test src/problems/17-tree-select/test/tree-select.test.ts

type TSelectStatus = 'v' | ' ' | 'o'

const SELECTED: TSelectStatus = 'v'
const NOT_SELECTED: TSelectStatus = ' '
const PARTIAL: TSelectStatus = 'o'

// Step 0: Implement TreeNode methods
class TreeNode {
  children: TreeNode[] = []
  status: TSelectStatus = NOT_SELECTED

  constructor(
      public name: string,
      public parent: TreeNode | null = null,
  ) {}

  addChild(node: TreeNode) {
    node.parent = this;
    this.children.push(node)
  }

  toString(level: number = -1): string {
    const dots = Math.max(0, level)
    const root = level === -1 ? '' : `${'.'.repeat(dots)}[${this.status}]${this.name}\n`
    return root.concat(this.children.map((n) => n.toString(level + 1)).join(''))
  }

  updateStatus() {
    const isSelected = this.children
        .every(ch => ch.status === SELECTED);
    const isNotSelected = this.children
        .filter(ch => ch.status === PARTIAL || ch.status === SELECTED).length === 0;
    if(isNotSelected) {
      this.status = NOT_SELECTED;
    } else if(isSelected) {
      this.status = SELECTED;
    } else {
      this.status = PARTIAL;
    }
  }
}

// Step 1: Implement createTree
function createTree(paths: string[]): [TreeNode, Map<string, TreeNode>] {
  const root = new TreeNode('root');
  const store = new Map<string, TreeNode>();
  for(const path of paths) {
    let current = root;
    for(const token of path.split('/')) {
      if(!store.has(token)) {
        const child = new TreeNode(token, current)
        store.set(token, child);
        current.addChild(child)
      }
      current = store.get(token) as TreeNode;
    }
  }
  return [root, store];
}
//   - Create a root TreeNode and a Map<string, TreeNode> store
//   - For each path, split by '/' into tokens
//   - For each token, check if it exists in the store; if not, create a new TreeNode and addChild to parent
//   - Return [root, store]

// Step 2: Implement bubble
function * bubble(node: TreeNode): Iterable<TreeNode>{
  if(node.parent) {
    yield node.parent;
    yield* bubble(node.parent);
  }
}

// Step 3: Implement propagate
function * propagate(node: TreeNode): Iterable<TreeNode>{
  for(const child of node.children) {
    yield child;
    yield *propagate(child);
  }
}
// Step 4: Implement renderTreeSelect
//   - Call createTree to build the tree
//   - For each click: toggle the clicked node's status, propagate to descendants, bubble up to update ancestors
//   - Return root.toString()

export const renderTreeSelect = (paths: string[], clicks: string[]): string => {
  const [root, store] = createTree(paths);

  for(const click of clicks) {
    const node = store.get(click);
    if(!node) {
      continue;
    }
    node.status = node.status === SELECTED ? NOT_SELECTED : SELECTED;
    for(const child of propagate(node)) {
      child.status = node.status;
    }
    for(const parent of bubble(node)) {
      parent.updateStatus();
    }
  }

  return root.toString();
}

// --- Examples ---
// Uncomment to test your implementation:
// Example 1: Basic tree rendering (no clicks)
// const paths1 = ['fruits/apple', 'fruits/banana', 'vegetables/carrot']
// console.log(renderTreeSelect(paths1, []))
// Expected output:
// [ ]fruits
// .[ ]apple
// .[ ]banana
// [ ]vegetables
// .[ ]carrot

// Example 2: Select a leaf node → parent becomes partial
// console.log(renderTreeSelect(['fruits/apple', 'fruits/banana'], ['apple']))
// Expected output:
// [o]fruits
// .[v]apple
// .[ ]banana

// Example 3: Select all children → parent becomes selected
// console.log(renderTreeSelect(['fruits/apple', 'fruits/banana'], ['apple', 'banana']))
// Expected output:
// [v]fruits
// .[v]apple
// .[v]banana

// Example 4: Select parent → all children become selected, then deselect one child
// console.log(renderTreeSelect(['a/b', 'a/c'], ['a', 'b']))
// Expected output:
// [o]a
// .[ ]b
// .[v]c
