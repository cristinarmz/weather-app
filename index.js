//Hora de arriba
let currentDate = document.querySelector("#date");

let now = new Date();
let day = now.getDay();
let hour = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[day];

currentDate.innerHTML = `${currentDay}, ${hour}:${minutes}`;

//

function displayWeatherCondition(response) {
  let city = document.querySelector("#the-city");
  let temperature = document.querySelector("#temperature");
  let description = document.querySelector("#status");
  let icon = document.querySelector("#icon");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");


  humidity.innerHTML = response.data.main.humidity + "%";
  wind.innerHTML = response.data.wind.speed + "km/h";
  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp) + "°C";
  description.innerHTML = response.data.weather[0].main;
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);
  console.log(response.data.weather);
}

function searchCity(city) {
  let apiKey = "3d60678186f78799cefdbe86f446fd00";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-value").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "3d60678186f78799cefdbe86f446fd00";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayConditions(){



}

  
 


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
