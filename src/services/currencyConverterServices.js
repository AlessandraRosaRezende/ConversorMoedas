const request = require("../models/request");
const { DateTime } = require("luxon");

const DISCOUNT_PERCENTAGE_10 = 10;
const DISCOUNT_PERCENTAGE_15 = 15;
const DISCOUNT_PERCENTAGE_5 = 5;
const VALUE_DISCOUNT_5 = 3000;
const VALUE_DISCOUNT_15 = 2000;

const applyDiscount = (amount) => {
	let discountPercentage = 0;

	const currentTime = DateTime.now().setZone("America/Sao_Paulo");
	const isSaturdayNight = currentTime.weekday === 6 && currentTime.hour >= 22;
	const isSundayMorning = currentTime.weekday === 7 && currentTime.hour < 5;

	if (isSaturdayNight || isSundayMorning) {
		discountPercentage =
			amount > VALUE_DISCOUNT_15
				? DISCOUNT_PERCENTAGE_15
				: DISCOUNT_PERCENTAGE_10;
	}

	if (isMondayToFriday(currentTime) && amount > VALUE_DISCOUNT_5) {
		discountPercentage = DISCOUNT_PERCENTAGE_5;
	}

	const calcFinal = calFinal(discountPercentage, amount);

	return calcFinal;
};

const isMondayToFriday = (currentTime) => {
	return (
		currentTime.weekday >= 1 &&
		currentTime.weekday <= 5 &&
		currentTime.hour >= 19 &&
		currentTime.hour <= 23
	);
};

const calFinal = (discountPercentage, amount) => {
	return (1 - discountPercentage / 100) * amount;
};

const convertCurrency = async (amount) => {
	const currencyData = await request.getCachedCurrencyData();
	const conversionResults = {};

	if (currencyData) {
		const currencies = ["USDBRL", "EURBRL", "INRBRL"];

		currencies.forEach((currency) => {
			const rate = parseFloat(currencyData[currency].bid);
			if (isNaN(rate)) {
				return { error: "Invalid currency data" };
			}

			const convertedAmount = (applyDiscount(amount) / rate).toFixed(2);
			conversionResults[currency] = convertedAmount;
		});

		return {
			USD: conversionResults.USDBRL,
			EUR: conversionResults.EURBRL,
			INR: conversionResults.INRBRL,
		};
	}
};

module.exports = { convertCurrency };
