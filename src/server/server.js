var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const cors = require('cors');
const { withinWeekWeather } = require('./withinWeekWeather');
const { predictedForecast } = require('./predictedForecast');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));
console.log(__dirname);


const geoKey = process.env.GEOKEY;
const WeatherbitKey = process.env.WEATHERBITKEY;
const pixabayKey = process.env.PIXABAYKEY;
const countryLayer = process.env.COUNTRYLAYER;
const notAvailableImage = '../client/media/images/notavailable.png';
let flights = [];
let ID = 0;

app.get('/', function (req, res) {
    res.send("This is the server API page, you may access its services via the client app.");
});


// POST Route
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

app.get('/flights', (req, res) => {
    if (flights.length === 0) {
        console.log("No flights available.");
    } else {
        console.log("Flights Array: ", flights);
    }
    res.json(flights);
});

app.post("/getLocation", async (req,res) => {
 
    try {
        const { countryName } = req.body;
        const dest = await getLocation(countryName, geoKey);
        if (dest.error) {
            return res.status(400).json(dest);
        }
        const response = {
            name: dest.name
        };
        return res.json(dest);
                
    } catch (error) {
        console.error("Error in getting location", error);
        res.sendStatus(500);
        }

});
const getLocation = async(country, geoKey) =>{
    try{
        const res = await fetch(`http://api.geonames.org/searchJSON?username=${geoKey}&q=${country}`);

        const data = await res.json();
        
        if (data.geonames.length > 0) {
            return data.geonames[0];
        }
    }
    catch(error){
        console.error("Error", error);
        return res.sendStatus(500);
    }
}

app.post('/flights', (req, res) => {
    const { destination, departure } = req.body;
    const sameFlight = flights.find(flight => 
        flight.destination === destination && flight.departure === departure
    );
    if (sameFlight) {
        return res.status(409).json({ message: 'You have already reserved this flight!' });
    }
    const past = false;
    ID++;
    const flightRecord = { id: ID.toString(), destination, departure, past: false };
    flights.push(flightRecord);
    res.status(200).json(flightRecord);
});


app.post("/getWeather", async (req,res) => {
    const { destination, days } = req.body; 

    if(days < 0) {
        return res.status(400).json({ error: true, message: "Please choose a valid date." });
    }
    try {
        let resWeather;
        if (days < 8) {
            resWeather= await withinWeekWeather(WeatherbitKey, destination.lat, destination.lng);
        } else {
            resWeather= await predictedForecast(WeatherbitKey, days, destination.lat, destination.lng);
        }
        res.send(resWeather);
    } catch (error) {
        console.log("Error",error);
        return res.sendStatus(500);
    }

});

app.post("/getImg", async (req,res) => {
    
    const { countryName } = req.body;
    try{
        const response = await fetch(`http://pixabay.com/api/?key=${pixabayKey}&q=${countryName}&image_type=photo`);
        const data = await response.json();
        if(data.hits){
            res.json({ countryImage : data.hits[0]["webformatURL"]});
        }
        else {
            res.json({ countryImage: notAvailableImage });
        }
    }
    catch(error){
        res.json({ countryImage: notAvailableImage });
    }
});

app.post("/info", async (req,res) => {
    
    const { name } = req.body;
    try{
        const response = await fetch(`http://api.countrylayer.com/v2/name/${name}?access_key=${countryLayer}`);
        const data = await response.json();
        const capital = data[0].capital; 
        return res.json({capital:capital});
    }
    catch(error){
        console.error("Error", error);
        res.sendStatus(500);
    }
});

app.delete('/flights/:id', (req, res) => {
    const FlightNo = req.params.id;
    flights = flights.filter(flight => {return flight.id != FlightNo;});
    res.end();
});


app.listen(8001, function () {
    console.log('Example app listening on port 8001!');
});


