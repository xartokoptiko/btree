class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.x = 0; 
      this.y = 0; 
    }
  }
  
  class BinaryTree {
    constructor() {
      this.root = null;
    }
  
    insert(value) {
      const newNode = new Node(value);
      if (!this.root) {
        this.root = newNode;
        return;
      }
  
      let current = this.root;
      while (true) {
        if (value < current.value) {
          if (!current.left) {
            current.left = newNode;
            break;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = newNode;
            break;
          }
          current = current.right;
        }
      }
    }
  
    inOrderTraversal(node = this.root, result = []) {
      if (node) {
        this.inOrderTraversal(node.left, result);
        result.push(node.value);
        this.inOrderTraversal(node.right, result);
      }
      return result;
    }
  
    preOrderTraversal(node = this.root, result = []) {
      if (node) {
        result.push(node.value);
        this.preOrderTraversal(node.left, result);
        this.preOrderTraversal(node.right, result);
      }
      return result;
    }
  
    postOrderTraversal(node = this.root, result = []) {
      if (node) {
        this.postOrderTraversal(node.left, result);
        this.postOrderTraversal(node.right, result);
        result.push(node.value);
      }
      return result;
    }
  }
  
  function drawTree(context, node, x, y, level = 1, spacing = 100) {
    if (!node) return;
  
    node.x = x;
    node.y = y;
  
    if (node.left) {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x - spacing / level, y + 80);
      context.stroke();
      drawTree(context, node.left, x - spacing / level, y + 80, level + 1, spacing);
    }
  
    if (node.right) {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + spacing / level, y + 80);
      context.stroke();
      drawTree(context, node.right, x + spacing / level, y + 80, level + 1, spacing);
    }
  
    context.beginPath();
    context.arc(x, y, 20, 0, 2 * Math.PI);
    context.fillStyle = 'lightblue';
    context.fill();
    context.stroke();
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(node.value, x, y);
  }

  const tree = new BinaryTree();
  
  const valueInput = document.getElementById('valueInput');
  const canvas = document.getElementById('treeCanvas');
  const context = canvas.getContext('2d');

  valueInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const value = parseInt(valueInput.value);
  
      if (isNaN(value)) {
        alert('Please enter a valid number.');
        return;
      }
  
      tree.insert(value);
  
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawTree(context, tree.root, canvas.width / 2, 50);
  
  
      valueInput.value = '';
    }
  });
  