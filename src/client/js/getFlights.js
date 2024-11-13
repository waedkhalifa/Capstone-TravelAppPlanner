export const getFlights = async () => {
    const res = await fetch("http://localhost:8001/flights");
    const flights = await res.json();
    if(flights.length >0){
        document.getElementById("all-flights").style.display ='block';
        document.getElementById("no-flights").style.display ='none';
    }
    else{
        document.getElementById("all-flights").style.display ='none';
        document.getElementById("no-flights").style.display ='block';
    }
    const flightsContainer = document.getElementById("flights");
    flightsContainer.innerHTML = "";
   
    flights.forEach(flight => {
        const departure = new Date(flight.departure);
        const div = document.createElement("div");
        div.className = "flight";
        const isPastFlight = departure < new Date();
        div.innerHTML = `
            <p class= "flight-card">Flight No.: <span>${flight.id}</span></p>
            <p class= "flight-card">Destination: <span>${flight.destination}</span></p>
            <p class= "flight-card">Departure: <span class="${isPastFlight ? 'line-through' : ''}">${departure.toLocaleDateString()}</span></p>
            
        `;
        flightsContainer.appendChild(div);
        if (isPastFlight) {
            div.classList.add('pastFlight');
            div.innerHTML += `<p class= "expired-date">EXPIRED DATE!</p>`
            
        } 
        div.innerHTML += `<button class="btn delete-trip" onclick="deleteFlight('${flight.id}')">Delete</button>`
    });
};