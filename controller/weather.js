document.addEventListener('DOMContentLoaded', function () {
    const weatherContainer = document.getElementById('weather-container');
    const updateInterval = 10 * 60 * 1000; // Update every 10 minutes

    // List of locations with their names and coordinates
    const locations = [
        { name: 'Tokyo, Japan', latitude: 35.6895, longitude: 139.6917 },
        { name: 'New York, USA', latitude: 40.7128, longitude: -74.0060 },
        { name: 'London, UK', latitude: 51.5074, longitude: -0.1278 },
        { name: 'Sydney, Australia', latitude: -33.8688, longitude: 151.2093 },
        { name: 'Cairo, Egypt', latitude: 30.0444, longitude: 31.2357 },
        // Add more locations as desired
    ];

    // Function to fetch weather data for all locations
    function fetchWeatherData() {
        weatherContainer.innerHTML = ''; // Clear previous data

        locations.forEach(location => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data && data.current_weather) {
                        displayWeatherData(location.name, data.current_weather);
                    } else {
                        console.error(`No weather data found for ${location.name}`);
                    }
                })
                .catch(error => {
                    console.error(`Error fetching weather data for ${location.name}:`, error);
                });
        });
    }

    // Function to display weather data on the page
    function displayWeatherData(locationName, weatherData) {
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card');

        weatherCard.innerHTML = `
            <h2>${locationName}</h2>
            <p><strong>Temperature:</strong> ${weatherData.temperature} °C</p>
            <p><strong>Wind Speed:</strong> ${weatherData.windspeed} km/h</p>
            <p><strong>Wind Direction:</strong> ${weatherData.winddirection}°</p>
            <p><strong>Weather Code:</strong> ${weatherData.weathercode}</p>
            <p><strong>Time:</strong> ${weatherData.time}</p>
        `;

        weatherContainer.appendChild(weatherCard);
    }

    // Initial fetch of weather data
    fetchWeatherData();

    // Update weather data at regular intervals
    setInterval(fetchWeatherData, updateInterval);
});
