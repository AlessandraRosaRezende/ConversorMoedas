const express = require("express");

const currencyConverterController = require("./controllers/currencyConverterController");

const app = express();

app.use(express.json());

app.get("/converter/BRL/:amount", currencyConverterController.convert);

module.exports = app;
