const app = require("./app");

const PORT = 3001;

const server = app.listen(PORT, () =>
	console.log(`API de Conversão de Moedas rodando em http://localhost:${PORT}`)
);

module.exports = server;