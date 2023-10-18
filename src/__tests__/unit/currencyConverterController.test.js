const currencyConverterController = require("../../controllers/currencyConverterController");
const currencyConverterService = require("../../services/currencyConverterServices");

describe("currencyConverterController", () => {
	it("should convert currency", async () => {
		const req = { params: { amount: "100" } };
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res),
		};

		currencyConverterService.convertCurrency = jest.fn(() => ({
			USD: "50.00",
			EUR: "45.00",
			INR: "5000.00",
		}));

		await currencyConverterController.convert(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			USD: "50.00",
			EUR: "45.00",
			INR: "5000.00",
		});
	});

	it("should handle errors", async () => {
		const req = { params: { amount: "5,6" } };
		const res = {
			json: jest.fn(),
			status: jest.fn(() => res),
		};

		currencyConverterService.convertCurrency = jest.fn(() => ({
			error: "Invalid amount",
		}));

		await currencyConverterController.convert(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: "Amount is required and must be a number",
		});
	});
});
