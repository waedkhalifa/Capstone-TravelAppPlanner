
const { withinWeekWeather } = require("../src/server/withinWeekWeather");
const dotenv = require('dotenv');
dotenv.config();
describe('withinWeekWeather function', () => {
    test('should return the weather for Canada if the period is within 7 days', async () => {

        const weather = await withinWeekWeather(process.env.WEATHERBITKEY, 43.651070, -79.347015);
        expect(weather).toBeDefined();

    });
});