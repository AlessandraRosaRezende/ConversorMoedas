const currencyConverterService = require("../services/currencyConverterServices");

const convert = async (req, res) => {
	const { amount } = req.params;

	if (!amount || isNaN(amount)) {
		return res
			.status(400)
			.json({ message: "Amount is required and must be a number" });
	}

	const conversionResult = await currencyConverterService.convertCurrency(
		parseFloat(amount)
	);

	if (!conversionResult || conversionResult.error) {
		return res.status(400).json({ error: "An error occurred!" });
	} 

	return res.status(200).json(conversionResult);
};

module.exports = { convert };
