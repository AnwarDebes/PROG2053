// Wait for the DOM content to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Get the container element where weather data will be displayed
    const weatherContainer = document.getElementById('weather-container');
    const updateInterval = 10 * 60 * 1000; // Update interval set to every 10 minutes

    // List of locations with their names and geographical coordinates
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
        weatherContainer.innerHTML = ''; // Clear previous weather data

        // Iterate over each location to fetch its weather data
        locations.forEach(location => {
            // Construct the API URL with the location's coordinates
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;

            // Fetch weather data from the API
            fetch(url)
                .then(response => response.json()) // Parse the response as JSON
                .then(data => {
                    // Check if current weather data is available
                    if (data && data.current_weather) {
                        // Display the weather data on the page
                        displayWeatherData(location.name, data.current_weather);
                    } else {
                        console.error(`No weather data found for ${location.name}`);
                    }
                })
                .catch(error => {
                    // Log any errors to the console
                    console.error(`Error fetching weather data for ${location.name}:`, error);
                });
        });
    }

    // Function to display weather data on the page
    function displayWeatherData(locationName, weatherData) {
        // Create a div element for the weather card
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card'); // Add CSS class for styling

        // Set the inner HTML of the weather card with weather details
        weatherCard.innerHTML = `
            <h2>${locationName}</h2>
            <p><strong>Temperature:</strong> ${weatherData.temperature} °C</p>
            <p><strong>Wind Speed:</strong> ${weatherData.windspeed} km/h</p>
            <p><strong>Wind Direction:</strong> ${weatherData.winddirection}°</p>
            <p><strong>Weather Code:</strong> ${weatherData.weathercode}</p>
            <p><strong>Time:</strong> ${weatherData.time}</p>
        `;

        // Append the weather card to the weather container
        weatherContainer.appendChild(weatherCard);
    }

    // Initial fetch of weather data when the page loads
    fetchWeatherData();

    // Set an interval to update weather data at regular intervals
    setInterval(fetchWeatherData, updateInterval);
});
