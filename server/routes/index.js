const changeCase = require('change-case');
const express = require('express');
const routes = require('require-dir')();

module.exports = (app) => {
  Object.keys(routes).forEach((routeName) => {
    const router = express.Router();
    // eslint-disable-next-line
    require(`./${routeName}`)(router);
    app.use(`/${changeCase.paramCase(routeName)}`, router);
  });
};