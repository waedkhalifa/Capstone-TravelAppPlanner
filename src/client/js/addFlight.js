import { countryFromInput, dateFromInput } from "./app";
import { getCountry } from './getCountry';
import { getFlights } from "./getFlights";

export const addFlight = async () => {
    const destination = await getCountry(countryFromInput.value);
    if (!destination || destination == "" || !dateFromInput.value || destination.status == 400) {
        return;
    }
    const res = await fetch("http://localhost:8001/flights", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            destination: destination.name,
            departure: dateFromInput.value
        })
    });
    if (res.ok) {
        await getFlights();
    }
     else if(res.status ==409){
        
        const msg = await res.json(); 
        document.getElementById("existed").style.display = 'block';
        document.getElementById("existed").innerHTML = msg.message || res.statusText;
    } 
    else {
        console.error("Error", res.statusText);
    }
};
