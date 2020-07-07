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
    // distances object: to store the distances to all the nodes from the source node.
    const distances = {};
    distances[source] = 0;

    // pred object: to store the predecessor of each node.
    const pred = {};

    // visited set: to mark the visited nodes.
    const visited = new Set();

    // queue: to store the next nodes to be visited.
    const queue = [];
    queue.push(source);

    while (queue.length > 0) {
      // get the next node to be visited and mark it as visited.
      let node = queue.shift();
      visited.add(node);

      let current = this.head;
      while (current != null) {
        if (current.value == node) {
          let currentNode = current.root;

          while (currentNode != null) {
            /*
              if the current node is not in the distances object
              or its current value in the obj is greater than the new value
              update the distances obj.
            */
            if (
              !distances.hasOwnProperty(currentNode.value) ||
              distances[currentNode.value] >
                distances[current.value] + currentNode.cost
            ) {
              distances[currentNode.value] =
                distances[current.value] + currentNode.cost;
              pred[currentNode.value] = current.value;
            }

            // put the current node neighbors which weren't visited yet in the queue.
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

    // find the path between source and destination using the predecessor object
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
