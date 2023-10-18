const app = require("./app");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const PORT = 3001;

const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "API de Conversão de Moedas",
		version: "1.0.0",
		description: "Uma API para conversão de moedas.",
	},
};

const options = {
	swaggerDefinition,
	servers: [
		{
			url: "http://localhost:3001",
		},
	],
	apis: ["src/app.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const server = app.listen(PORT, () =>
	console.log(`API de Conversão de Moedas rodando em http://localhost:${PORT}`)
);

module.exports = server;