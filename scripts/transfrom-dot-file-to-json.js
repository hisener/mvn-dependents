const fs = require('fs');
const util = require('util');
const parse = require('dotparser');
const uuid = require('uuid');

const whiteList = require('./whitelist.json');
let rawData = parse(fs.readFileSync('/tmp/mvn-dependents-workspace/output.dot', 'UTF-8'));

const modules = {};

for (const node of rawData) {
  for (const edge of node.children) {
    if (edge["edge_list"] && edge["edge_list"].length > 0) {
      fillModules(edge["edge_list"][0].id, edge["edge_list"][1].id)
    }
  }
}

const result = [];

for (const module of getProperWhiteList(whiteList)) {
  result.push({
    "title": module,
    "key": module + uuid(),
    "children": getChildren(module)
  });
}

fs.writeFileSync('./data.json', JSON.stringify(result));

// Helper functions

function getProperWhiteList(whiteList) {
  let result = [];

  for (const module of whiteList) {
    for (fullName in modules) {
      if (fullName.includes(`:${module}:`)) {
        result.push(fullName);
      }
    }
  }

  return result;
}

function getChildren(module) {
  if (!modules[module] || modules[module].length === 0) {
    return null;
  }

  let result = [];
  for (let dependent of modules[module]) {
    result.push({
      "title": dependent,
      "key": dependent + uuid(),
      "children": getChildren(dependent)
    });
  }
  
  return result;
}

function fillModules (module, dependency) {
  addModuleIfAbsent(module);
  addModuleIfAbsent(dependency);

  if (modules[dependency].includes(module)) {
    return;
  }

  modules[dependency].push(module);
}

function addModuleIfAbsent(module) {
  if (!modules.hasOwnProperty(module)) {
    modules[module] = [];
  }
}
