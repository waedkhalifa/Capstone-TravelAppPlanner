export const getWeather = async (destination, days) => {
    const res = await fetch("http://localhost:8001/getWeather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            destination: destination,
            days: days }),
    });
    const data = await res.json();
    return data;
};
