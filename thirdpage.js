// Get the HTML element where the weather forecast will be displayed
const weatherForecast = document.getElementById("forcast-container");

// List of locations with name, latitude, and longitude for fetching weather data
const locations = [
  { name: "Oslo", latitude: 59.911491, longitude: 10.757933 },
  { name: "Bergen", latitude: 60.39299, longitude: 5.32415 },
  { name: "London", latitude: 51.50853, longitude: -0.12574 },
  { name: "New York City", latitude: 40.71427, longitude: -74.00597 },
  { name: "Tokyo", latitude: 35.6895, longitude: 139.69171 }
];

// Function to fetch weather data for a given latitude, longitude, and location name
function fetchWeatherData(lat, lon, locationName) {
  // API endpoint for weather data, dynamically including latitude and longitude
  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;

  // Fetch weather data from the API
  fetch(apiURL)
    .then(response => {
      // If the response is not OK, throw an error
      if (!response.ok) {
        throw new Error(`Error with fetching data for ${locationName}: ${response.status}`);
      }
      // Convert response to JSON
      return response.json();
    })
    .then(data => {
      // Extract the current weather data from the response
      const forecast = data.current_weather;

      // Create new HTML elements to display the weather information
      const article = document.createElement("article"); // Main container for the forecast

      const location = document.createElement("h2"); // Heading for the location name
      location.textContent = locationName; // Set the text to the location name

      const time = document.createElement("p"); // Paragraph for the time of the weather data
      time.textContent = `Time: ${new Date(forecast.time).toLocaleString()}`; // Convert time to local format

      const temp = document.createElement("p"); // Paragraph for temperature
      temp.textContent = `Temperature: ${forecast.temperature}°C`; // Set temperature value

      const windDirection = document.createElement("p"); // Paragraph for wind direction
      windDirection.textContent = `Wind direction: ${forecast.winddirection}`; // Set wind direction value

      const wind_speed = document.createElement("p"); // Paragraph for wind speed
      wind_speed.textContent = `Wind Speed: ${forecast.windspeed} m/s`; // Set wind speed value

      // Append all created elements to the article container
      article.appendChild(location);
      article.appendChild(time);
      article.appendChild(temp);
      article.appendChild(windDirection);
      article.appendChild(wind_speed);

      // Append the article with the weather data to the forecast container in the DOM
      weatherForecast.appendChild(article);
    })
    .catch(error => {
      // Log any errors that occur during the fetch process
      console.error(error);
    });
}

// Function to update the weather for all locations
function updateWeather() {
  weatherForecast.innerHTML = "";  // Clear the previous forecast data
  locations.forEach(location => {
    // Fetch weather data for each location in the locations array
    fetchWeatherData(location.latitude, location.longitude, location.name);
  });
}

// Initial call to update the weather when the page loads
updateWeather();

// Set an interval to update the weather every 10 minutes (600,000 milliseconds)
setInterval(updateWeather, 600000);
