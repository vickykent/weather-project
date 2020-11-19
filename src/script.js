function updateTime(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dateAbbreviation = "";
  if (now.getDate() === 1) {
    dateAbbreviation = "st";
  } else if (now.getDate() === 2) {
    dateAbbreviation = "nd";
  } else if (now.getDate() === 3) {
    dateAbbreviation = "rd";
  } else {
    dateAbbreviation = "th";
  }

  let currentDate = `${days[now.getDay()]}`;
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = `${hours}:${minutes}`;

  let date = document.querySelector(".date");
  let time = document.querySelector(".time");

  lastupdate.innerHTML = `${currentDate} ${currentTime}`;
  // time.innerHTML = currentTime;
}

let now = new Date();
updateTime(now);

function makeUpdates(response) {
  let currentCity = response.data.name;
  let city = document.querySelector(".city");
  city.innerHTML = currentCity;
  let currentTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector(".temp-today");
  temp.innerHTML = `${currentTemp} °C `;
  let currentLow = Math.round(response.data.main.temp_min);
  let currentHigh = Math.round(response.data.main.temp_max);
  let tempHighLow = document.querySelector(".temp-high-low-today");
  tempHighLow.innerHTML = `${currentLow}° / ${currentHigh}°`;
  let currentFeel = Math.round(response.data.main.feels_like);
  let feel = document.querySelector("#feels");
  feel.innerHTML = `${currentFeel}°`;
  let currentHumidity = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}%`;

  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${currentWind} km/hr`;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  lastupdateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  // iconElement.setAttribute("alt", response.data.weather[0].description);
}

function updateInputTemp(event) {
  event.preventDefault();
  let apiStart = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "bd6aacf7ef984a2ebc6230bca8482f4a";
  let cityInput = document.querySelector("#city-input").value;
  let unit = "metric";
  let apiURL = `${apiStart}?q=${cityInput}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(makeUpdates);
}

function updateLocationTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiStart = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "bd6aacf7ef984a2ebc6230bca8482f4a";
  let unit = "metric";
  let apiURL = `${apiStart}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(makeUpdates);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(updateLocationTemp);
}

let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", updateInputTemp);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getPosition);
