export const refreshData = (country, img, countryInfo, weather, days) => {
    document.getElementById("capital-name").innerHTML=`<strong>Capital:</strong> ${countryInfo}`;
    document.getElementById("card").style.display = "block";
    document.getElementById("period").innerHTML = `${days} days left until your flight`;
    document.getElementById("period").style.fontWeight = "bold";
    document.getElementById("period").style.color = "red";
    document.getElementById("country-name").innerHTML = `<strong>Destination:</strong> ${country}`;
    document.getElementById("weather").innerHTML = `<strong>Forcast:</strong> ${weather.description}`;
    document.getElementById("temp").innerHTML = `<strong>Temperature:</strong> ${weather.temp} °C`;
    document.getElementsByClassName("card-image")[0].innerHTML = `<img src="${img}" class="card-img" id="country-img" alt="country img">`;
    document.getElementsByClassName("flight-info")[0].style.display = "block";
    document.getElementsByClassName("weather-info")[0].style.display = "block";
    document.getElementById("card").style.display = "block";
    if (days <= 7) {
        document.getElementById("high-low").innerHTML = "";
    }
    else {
        document.getElementById("high-low").innerHTML = `<strong>High:</strong> ${weather.high_temp} °C<strong>, Low:</strong>  ${weather.low_temp} °C`;
    }
};
