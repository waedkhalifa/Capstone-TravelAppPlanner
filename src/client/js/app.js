import moment from 'moment';
import { refreshData } from './refreshData';
import { getFlights } from './getFlights';
import { deleteFlight } from './deleteFlight';
import { addFlight } from './addFlight';
import { getCountry } from './getCountry';
import { getWeather } from './getWeather';
import { getImg } from './getImg';
import { getCountryInfo } from './getCountryInfo';

export const dateFromInput = document.getElementById('date');
export const countryFromInput = document.getElementById('country');
const invalidDate = document.getElementById('invalid-date');
const invalidName = document.getElementById('invalid-name');
export const notAvailableImage = '../client/media/images/notavailable.png';
document.getElementById('card').style.display = 'none';
document.getElementById("all-flights").style.display ='none';
invalidDate.style.display = 'none';
invalidName.style.display = 'none';
let dateSentence= invalidDate.textContent;
let nameSentence= invalidName.textContent;

const handleSubmit = async (e) => {
    e.preventDefault();
    invalidDate.style.display = 'none';
    invalidName.style.display = 'none';
    document.getElementById("existed").style.display = 'none';
    let invalidInput = false;

    const days= untilDeparture(dateFromInput.value);
    const destination = await getCountry(countryFromInput.value);
    invalidInput = checkValidation(destination);

    switch (!invalidInput) {
        case true:
            break;
        default:
            return;
    }

    const image = await getImg(destination.name);
    const countryInfo = await getCountryInfo(destination.name);
    const weather = await getWeather(destination,days);
    
    refreshData(destination.name, image['countryImage'], countryInfo['capital'] , weather, days);
};


const untilDeparture = (date) => {
    const todayDate = moment();
    const depDate = moment(date);
    const period = depDate.diff(todayDate, 'days');
    return period;
}

function checkValidation(destination) {
    let invalidInputs = false;
    let firstInput = false;
    let secondInput = false;
    
    if (dateFromInput.value == "" || new Date(dateFromInput.value) <= new Date()) {
        invalidDate.innerHTML = dateSentence;
        invalidDate.style.display = 'block';
        invalidName.innerHTML = "&nbsp;";
        invalidName.style.display = 'block';
        invalidInputs = true;
        firstInput = true;
    }


    if (!destination || destination.error || destination.status == 400) {
        invalidName.innerHTML = nameSentence;
        invalidName.style.display = 'block';
        invalidDate.innerHTML = "&nbsp;";
        invalidDate.style.display = 'block';
        invalidInputs = true;
        secondInput = true;
    }

    if (firstInput && secondInput){
        invalidName.innerHTML = nameSentence;
        invalidDate.innerHTML = dateSentence;
    }
    return invalidInputs;
}


window.onload = getFlights;
window.deleteFlight = deleteFlight;
window.addFlight = addFlight;
export { handleSubmit }

