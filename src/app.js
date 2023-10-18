const express = require("express");

const request = require("./models/request");
const currencyConverterController = require("./controllers/currencyConverterController");

const pino = require("pino");
const pinoPretty = require("pino-pretty");
const expressPinoLogger = require("pino-http");

pino.pretty = pinoPretty();

const app = express();

const logger = pino();

app.use(express.json());

app.use(expressPinoLogger({ logger }));

request.fetchCurrencyData();

/**
 * @swagger
 * /converter/BRL/{amount}:
 *   get:
 *     summary: Obtém informações sobre a API de conversão de moedas.
 *     parameters:
 *       - in: path
 *         name: amount
 *         required: true
 *         description: O valor em BRL a ser convertido.
 *         schema:
 *            type: number
 *     responses:
 *       200:
 *         description: Retorna o valor informado convertido para USD, EUR e INR.
 */
app.get("/converter/BRL/:amount", currencyConverterController.convert);

module.exports = app;
