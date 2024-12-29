const fetch = require('node-fetch');
const predictedForecast = async (WeatherbitKey, days, lat, lng) => {
    const response = await fetch(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WeatherbitKey}&units=M&days=${days}`);
    const data = await response.json();
    const finalDayInfo = data.data[data.data.length - 1];
    return {
        description: finalDayInfo.weather.description,
        temp: finalDayInfo.temp,
        high_temp: finalDayInfo.high_temp,
        low_temp: finalDayInfo.low_temp
    };
};
exports.predictedForecast = predictedForecast;
