//Hora de arriba
let currentDate = document.querySelector("#date");

let now = new Date();
let day = now.getDay();
let hour = now.getHours();
if (hour < 10) {
	hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
	minutes = `0${minutes}`;
}

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

function getForecast(coordinates) {
	let apiKey = "3d60678186f78799cefdbe86f446fd00";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(displayForecast);
}

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
	icon.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	icon.setAttribute("alt", response.data.weather[0].description);

	getForecast(response.data.coord);
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

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return days[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");
	let forecastDays = ["Thu", "Fri", "Sat", "Sun", "Mon"];
	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`
      <div class="col-2">
        <div class= "forecast-day">${formatDay(forecastDay.dt)}</div>
            <img
          src="https://openweathermap.org/img/wn/${
				forecastDay.weather[0].icon
			}@2x.png"
          alt=""
          width="42"
        />
            <div class= "forecast-temperatures">
            <span class= "forecast-temperature-min"> ${Math.round(
				forecastDay.temp.min
			)}°</span> 
			<span class ="forecast-temperature-max">${Math.round(
				forecastDay.temp.max
			)}°</span>

            </div>
        </div>
    
  `;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Madrid");
