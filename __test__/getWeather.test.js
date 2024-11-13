import { getWeather } from "../js";

describe('getWeather function', () => {
    test('it should return defined weather data when the function takes the destination and number of days', async () => {
        const destination = "Canada";
        const days = 11;
        const weatherData = await getWeather(destination, days);

        expect(weatherData).toBeDefined();
       
    });
});