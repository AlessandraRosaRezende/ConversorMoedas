const swaggerJSDoc = require("swagger-jsdoc");

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

module.exports = swaggerSpec;
