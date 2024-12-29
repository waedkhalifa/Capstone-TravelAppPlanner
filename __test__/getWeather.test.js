import { getWeather } from "../src/client/js/getWeather.js";
global.fetch = jest.fn();
describe('getWeather function', () => {
    test('it should return defined weather data when the function takes the destination and number of days', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ weather: 'cloudy', temperature: 20 })
        });
        const destination = "Canada";
        const days = 11;
        const weatherData = await getWeather(destination, days);

        expect(weatherData).toBeDefined();
       
    });
    
});