const fetch = require('node-fetch');
const withinWeekWeather = async (WeatherbitKey, lat, lng) => {
    const response = await fetch(`http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${WeatherbitKey}`);
    const data = await response.json();
    return {
        temp: data.data[0].temp,
        description: data.data[0].weather.description
    };
};
exports.withinWeekWeather = withinWeekWeather;
