const fs = require('fs');
const path = require('path');

const getFilePath = () => {
  return path.resolve(__dirname, '..', '..', 'input-file.csv');
};

const fileExists = filePath => {
  return fs.existsSync(filePath);
};

const readInputFile = filePath => {
  if (!fileExists(filePath)) {
    return null;
  }

  const file = fs.readFileSync(filePath).toString();

  const fileLines = file.split('\n');
  const headers = fileLines[0].split(',');

  const routes = [];

  fileLines.slice(1, fileLines.length - 1).forEach(row => {
    const columns = row.split(',');
    const route = {};
    headers.forEach((header, index) => (route[header] = columns[index]));
    routes.push(route);
  });

  return routes;
};

const addNewRow = (routes, newRoute) => {
  routes.push(newRoute);

  const headers = Object.keys(routes[0]);

  let data = '';

  headers.forEach(header => {
    data = data + header + ',';
  });
  data = data.slice(0, -1);
  data = data + '\n';

  routes.forEach(route => {
    headers.forEach(header => (data = data + route[header] + ','));
    data = data.slice(0, -1);
    data = data + '\n';
  });

  fs.writeFileSync(getFilePath(), data);
};

module.exports = {
  getFilePath,
  readInputFile,
  addNewRow,
};
