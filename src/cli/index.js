const path = require('path');
const rlp = require('readline');

const Graph = require('../utils/graph');
const { readInputFile } = require('../utils/fileOperations');

const readline = rlp.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const routes = init();
  await exec(routes);
  readline.close();
}

function init() {
  console.log('Initializing...');

  const inputFilePath = parseFilePath();

  const inputFile = readInputFile(inputFilePath);
  if (inputFile == null) {
    console.log('Input file do not exists.');
  }

  const routes = parseInputFile(inputFile);

  console.log('Initialized\n');
  return routes;
}

function parseFilePath() {
  const callPath = process.cwd();
  const filename = process.argv[2];

  if (filename == undefined) {
    console.log('Input file not provided.');
    process.exit(1);
  }

  return path.resolve(callPath, filename);
}

function parseInputFile(inputFile) {
  inputFile.forEach(route => (route.custo = +route.custo));
  return inputFile;
}

async function exec(routes) {
  while (true) {
    const input = await getInput();

    const { origem, destino } = parseInput(input);
    console.log(`\nFrom ${origem} to ${destino}.\n`);

    const bestRoute = findBestRoute(routes, origem, destino);
    console.log(`The best route is: ${bestRoute}\n`);
  }
}

function getInput() {
  return new Promise((resolve, reject) => {
    readline.question('Inform origin and destination (In this format <origin>-<destination>): ', input =>
      resolve(input),
    );
  });
}

function parseInput(input) {
  const route = input.split('-');

  if (route.length < 2) {
    console.log('Invalid input');
    process.exit(1);
  }

  return {
    origem: route[0],
    destino: route[1],
  };
}

function findBestRoute(routes, origem, destino) {
  console.log('Finding the best route...');

  const graph = new Graph();

  routes.forEach(route => {
    graph.addEdge(route.origem, route.destino, route.custo);
  });

  const bestRoute = graph.bestPath(origem, destino);

  if (bestRoute == null) {
    console.log('There is no path between these two locations.');
    process.exit(1);
  }

  return parseGraphResponse(bestRoute);
}

function parseGraphResponse({ path, cost }) {
  let data = '';
  path.forEach(place => {
    data = data + place + '-';
  });
  data = data.slice(0, -1);
  data = data + ' > ' + cost;

  return data;
}

main();
