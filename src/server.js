const app = require("./app");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");
require('dotenv').config();

const PORT = process.env.PORT;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const server = app.listen(PORT, () =>
	console.log(`API de Conversão de Moedas rodando em http://localhost:${PORT}`)
);

module.exports = server;