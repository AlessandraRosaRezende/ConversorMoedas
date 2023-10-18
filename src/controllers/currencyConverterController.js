const currencyConverterService = require("../services/currencyConverterServices");

const convert = async (req, res) => {
	const { amount } = req.params;

	const conversionResult = await currencyConverterService.convertCurrency(
		parseFloat(amount)
	);

	return res.status(200).json(conversionResult);
};

module.exports = { convert };
