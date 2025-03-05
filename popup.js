const LATITUDE = -37.8764; // Location: Wantirna South
const LONGITUDE = 145.2309;
const TIE_REMOVAL_TEMP = 25;
const PE_UNIFORM_TEMP = 35;

// Fetch weather data for tomorrow and current temperature
async function fetchWeather() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&daily=temperature_2m_max&current_weather=true&timezone=Australia/Melbourne`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const tomorrowMaxTemp = data.daily.temperature_2m_max[1]; // Tomorrow's max temperature
        const currentTemp = data.current_weather.temperature; // Current temperature

        // Update UI with weather info for tomorrow
        document.getElementById("weather-info").innerText = `Max Temp: ${tomorrowMaxTemp}°C`;

        // Display the current temperature
        document.getElementById("current-temp").innerText = `Current Temp: ${currentTemp}°C`;

        // Dress code advice based on temperature
        const dressCode = document.getElementById("dress-code");
        if (tomorrowMaxTemp >= PE_UNIFORM_TEMP) {
            dressCode.innerText = "You can wear your PE uniform.";
            dressCode.style.backgroundColor = "#3B82F6"; // Blue color for PE uniform
        } else if (tomorrowMaxTemp >= TIE_REMOVAL_TEMP) {
            dressCode.innerText = "You can take off your tie.";
            dressCode.style.backgroundColor = "#3B82F6"; // Blue color for tie removal
        } else {
            dressCode.innerText = "Standard uniform with tie is required.";
            dressCode.style.backgroundColor = "red"; // Red color for standard uniform
        }
    } catch (error) {
        document.getElementById("weather-info").innerText = "Error fetching data.";
    }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", function () {
    // Ensure the button exists before attaching the event listener
    const refreshBtn = document.getElementById("refresh-btn");
    if (refreshBtn) {
        refreshBtn.addEventListener("click", function () {
            fetchWeather();
        });
    }

    // Fetch weather initially
    fetchWeather();
});
