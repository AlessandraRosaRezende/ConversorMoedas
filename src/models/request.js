const axios = require("axios");

const fetchCurrencyData = async () => {
	try {
		const response = await axios.get(
			"https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,INR-BRL"
		);
		const currencyData = response.data;

		return currencyData;
	} catch (error) {
		console.error("Erro ao obter cotações da fonte original:", error);
		throw error;
	}
};

module.exports = { fetchCurrencyData };