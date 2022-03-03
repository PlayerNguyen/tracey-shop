const fs = require("fs");
const express = require("express");
/**
 * Load a static folder before the server starts
 * @param {*} folder  a folder directory to initialize
 */
function loadStaticService(folder) {
  // Not exists, then create folder
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
}
/**
 *  Get the static service of express serve
 * @param {*} folder a folder dir to initialize
 */
function getStaticServe(folder) {
  return express.static(folder);
}


const StaticService = {
  loadStaticService,
  getStaticServe
}

module.exports = StaticService