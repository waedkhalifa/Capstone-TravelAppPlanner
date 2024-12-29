
const { predictedForecast } = require("../src/server/predictedForecast.js");
const dotenv = require('dotenv');
dotenv.config();
describe('predictedForecast function', () => {
    test('should return predicted forecast for Canada', async () => {

        const forecast = await predictedForecast(process.env.WEATHERBITKEY, 23, 43.651070, -79.347015);
        expect(forecast.description.length).toBeGreaterThan(0);

    });
});