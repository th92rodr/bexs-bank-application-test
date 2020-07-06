class Node {
  constructor(value, cost) {
    this.value = value;
    this.cost = cost;
    this.next = null;
  }
}

class RootNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.root = null;
  }

  insertNode(value, cost) {
    const node = new Node(value, cost);

    if (this.root == null) {
      this.root = node;
    } else {
      let current = this.root;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
  }
}

class Graph {
  constructor() {
    this.head = null;
  }

  addEdge(source, destination, cost) {
    if (this.head == null) {
      const rootNode = new RootNode(source);
      this.head = rootNode;
      rootNode.insertNode(destination, cost);
    } else {
      let current = this.head;
      let last;
      while (current != null) {
        if (current.value == source) {
          current.insertNode(destination, cost);
          return;
        }
        last = current;
        current = current.next;
      }
      const rootNode = new RootNode(source);
      last.next = rootNode;
      rootNode.insertNode(destination, cost);
    }
  }

  printGraph() {
    let currentRoot = this.head;
    while (currentRoot != null) {
      process.stdout.write("|" + currentRoot.value + "| -> ");

      let currentNode = currentRoot.root;
      while (currentNode != null) {
        process.stdout.write(
          currentNode.value + "(" + currentNode.cost + ")" + " -> "
        );
        currentNode = currentNode.next;
      }

      currentRoot = currentRoot.next;
      process.stdout.write(" NULL\n");
    }
  }

  shortestPath(source, destination) {
    const distances = {};
    distances[source] = 0;

    const pred = {};
    const visited = new Set();
    const queue = [];
    queue.push(source);

    while (queue.length > 0) {
      let node = queue.shift();
      visited.add(node);

      let current = this.head;
      while (current != null) {
        if (current.value == node) {
          let currentNode = current.root;

          while (currentNode != null) {
            if (
              !distances.hasOwnProperty(currentNode.value) ||
              distances[currentNode.value] >
                distances[current.value] + currentNode.cost
            ) {
              distances[currentNode.value] =
                distances[current.value] + currentNode.cost;
              pred[currentNode.value] = current.value;
            }

            if (!visited.has(currentNode.value)) {
              queue.push(currentNode.value);
            }

            currentNode = currentNode.next;
          }

          break;
        } else {
          current = current.next;
        }
      }
    }

    if (!distances.hasOwnProperty(destination)) {
      return null;
    }

    const path = [];
    path.unshift(destination);
    let x = pred[destination];

    while (x != source) {
      path.unshift(x);
      x = pred[x];
    }
    path.unshift(source);

    return {
      path,
      cost: distances[destination],
    };
  }
}

module.exports = Graph;
