const request = require("../models/request");

const convertCurrency = async (amount) => {
	const currencyData = await request.fetchCurrencyData();
	const conversionResults = {};

	if (currencyData) {
		const currencies = ["USDBRL", "EURBRL", "INRBRL"];

		currencies.forEach((currency) => {
			const rate = parseFloat(currencyData[currency].bid);
			if (isNaN(rate)) {
				return { error: "Invalid currency data" };
			}

			conversionResults[currency] = (amount / rate).toFixed(2);
		});

		return {
			USD: conversionResults.USDBRL,
			EUR: conversionResults.EURBRL,
			INR: conversionResults.INRBRL,
		};
	}
};

module.exports = { convertCurrency };
