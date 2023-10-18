const request = require("supertest");
const app = require("../../app");
const currencyConverterService = require("../../services/currencyConverterServices");

jest.mock("../../services/currencyConverterServices");

describe("Integration Test: /converter/BRL/:amount", () => {
	beforeEach(() => {
		currencyConverterService.convertCurrency = jest.fn().mockResolvedValue({
			USDBRL: { bid: "5.00" },
			EURBRL: { bid: "4.50" },
			INRBRL: { bid: "75.00" },
		});

		currencyConverterService.convertCurrency.mockImplementation((amount) => {
			return {
				USD: (amount / 5.0).toFixed(2),
				EUR: (amount / 4.5).toFixed(2),
				INR: (amount / 75.0).toFixed(2),
			};
		});
	});

	it("should return currency conversion result for valid input", async () => {
		const response = await request(app).get(
			"/converter/BRL/" + parseFloat("100")
		);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("USD");
		expect(response.body).toHaveProperty("EUR");
		expect(response.body).toHaveProperty("INR");
	});

	it("should handle invalid input", async () => {
		const response = await request(app).get("/converter/BRL/5,6");

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("message");
	});
});
