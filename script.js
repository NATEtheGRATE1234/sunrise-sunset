let request = new XMLHttpRequest();

let url = "https://api.sunrise-sunset.org/json?lat=40.829756&lng=-73.926121";

request.open("GET", url, true);

request.onload = function() {
    //Begin accessing JSON data here. Data stored in request.response
    //Give the response a JSON format
    let data = JSON.parse(this.response);
    
    let sunrise = document.getElementById('sunrise');
    let sunset = document.getElementById('sunset');
    
    if (request.status >= 200 && request.status < 400) {
        sunrise.textContent = convertToEst(data.results.sunrise);
        sunset.textContent = convertToEst(data.results.sunset);
    } else {
        console.log("Error");
    }
}

request.send();

function convertToEst(utc) {
    let utcHours = utc.substr(0, utc.indexOf(":"));
    let utcMinSec = utc.substr(utc.indexOf(":") + 1);
    
    let est = parseInt(utc, 10) - 5;
    est += ":" + utcMinSec;
    return est;
}