const apiKey = "5365f00bbbfa53ed46b0fbcec3551212";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const airQualityApiUrl = "https://api.openweathermap.org/data/2.5/air_pollution?";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const unitToggle = document.getElementById("unit-toggle");

let selectedUnit = "metric";


async function checkWeather(city) {
    const url = `${apiUrl}q=${city}&units=${selectedUnit}&appid=${apiKey}`;
  const response = await fetch(url);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else if(response.status == 502){
        document.querySelector(".error").innerHTML = "The Server API is not working currently please try again later..."
    }
    else{
        let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;

    document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + (selectedUnit === "metric" ? "°C" : "°F");

    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";


    var lat = data.coord.lat;
    var lon = data.coord.lon;

    document.querySelector(".lat").innerHTML = lat;
    document.querySelector(".lon").innerHTML = lon;
    document.querySelector(".temphigh").innerHTML =
    Math.round(data.main.temp_max) + (selectedUnit === "metric" ? "°C" : "°F");
  document.querySelector(".templow").innerHTML =
    Math.round(data.main.temp_min) + (selectedUnit === "metric" ? "°C" : "°F");


unitToggle.addEventListener("change", () => {
    selectedUnit = unitToggle.value;
    const cityName = searchBox.value;
    checkWeather(cityName);
  });

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
    s
    aqiparam(lat,lon);
}

async function aqiparam(lat, lon) {
    const apiUrl2 = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response2 = await fetch(apiUrl2);
    let data2 = await response2.json();
  
    let airq = data2.list[0].main.aqi;
    if(airq == 1) var res = " (Good)";
    else if(airq == 2) var res = " (Fair)";
    else if(airq == 3) var res = " (Moderate)";
    else if(airq == 4) var res = " (Poor)";
    else if(airq == 5) var res = " (Very Poor)";

    // Display AQI and PM2.5 values
    document.querySelector(".air").innerHTML = data2.list[0].main.aqi +res;
    document.querySelector(".pm2").innerHTML = data2.list[0].components.pm2_5;
  }

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      checkWeather(searchBox.value);
    }
  });

checkWeather();

