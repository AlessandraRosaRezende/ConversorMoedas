const currencyConverterService = require("../../services/currencyConverterServices");
const request = require("../../models/request");
const { DateTime } = require("luxon");
const { advanceTo, clear } = require("jest-date-mock");

describe("business rules - discounts", () => {
	afterEach(() => {
		clear();
	});

	it("should apply 10% discount on Saturday night", () => {
		advanceTo(
			DateTime.fromObject(
				{ weekday: 6, hour: 23 },
				{ zone: "America/Sao_Paulo" }
			)
		);
		const discountedAmount = currencyConverterService.applyDiscount(2500);
		expect(discountedAmount).toBe(2125);
	});

	it("should apply 10% discount on Sunday morning", () => {
		advanceTo(
			DateTime.fromObject(
				{ weekday: 7, hour: 2 },
				{ zone: "America/Sao_Paulo" }
			)
		);
		const discountedAmount = currencyConverterService.applyDiscount(2500);
		expect(discountedAmount).toBe(2125);
	});

	it("should apply 5% discount on weekdays with amount > 3000", () => {
		advanceTo(
			DateTime.fromObject(
				{ weekday: 1, hour: 20 },
				{ zone: "America/Sao_Paulo" }
			)
		);
		const discountedAmount = currencyConverterService.applyDiscount(3500);
		expect(discountedAmount).toBe(3325);
	});

	it("should not apply discount on weekdays with amount <= 3000", () => {
		advanceTo(
			DateTime.fromObject(
				{ weekday: 1, hour: 20 },
				{ zone: "America/Sao_Paulo" }
			)
		);
		const discountedAmount = currencyConverterService.applyDiscount(2500);
		expect(discountedAmount).toBe(2500);
	});
});

describe("currencyConverterServices", () => {
	it("should convert currency", async () => {
		request.getCachedCurrencyData = jest.fn(() => ({
			USDBRL: { bid: "5.00" },
			EURBRL: { bid: "4.50" },
			INRBRL: { bid: "500.00" },
		}));

		const result = await currencyConverterService.convertCurrency(100);

		expect(result).toEqual({
			USD: "20.00",
			EUR: "22.22",
			INR: "0.20",
		});
	});

	it("should handle invalid currency data", async () => {
		request.getCachedCurrencyData = jest.fn(() => null);

		const result = await currencyConverterService.convertCurrency("abc");

		expect(result).toEqual(undefined);
	});
});
