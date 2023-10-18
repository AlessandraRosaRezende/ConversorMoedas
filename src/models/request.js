const axios = require("axios");
const NodeCache = require("node-cache");

const myCache = new NodeCache();
const CACHE_TTL = 1800; // 30 minutos em segundos

const fetchCurrencyData = async () => {
	try {
		const response = await axios.get(
			"https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,INR-BRL"
		);
		const currencyData = response.data;

		myCache.set("currencyData", currencyData, CACHE_TTL);

		return currencyData;
	} catch (error) {
		console.error("Erro ao obter cotações da fonte original:", error);
		throw error;
	}
};

const getCachedCurrencyData = async () => {
	let cachedData = myCache.get("currencyData");
	if (!cachedData) {
		cachedData = await fetchCurrencyData();
	}
	return cachedData;
};

module.exports = { fetchCurrencyData, getCachedCurrencyData };