// This is just a free API key that I created; you must create your own API key from the TimeZoneDB site and replace it here.

let intervalId;

document.getElementById('getTimeBtn').addEventListener('click', function() {
    const location = document.getElementById('location').value.trim();
    
    if (!location) {
        document.getElementById('result').innerHTML = 'Please enter a valid city or country!';
        return;
    }

    // Get the coordinates of the city/country using OpenWeatherMap Geocoding API
    const geoApiKey = '4525a9ec3053fd7b173e9195f33778f1';  // Replace with your own OpenWeatherMap API Key
    const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${geoApiKey}`;

    fetch(geoApiUrl)
        .then(response => response.json())
        .then(geoData => {
            if (geoData.length > 0) {
                const lat = geoData[0].lat;
                const lon = geoData[0].lon;

                // Use the coordinates to get the timezone using TimeZoneDB API
                getTimezoneAndTime(lat, lon, location);
            } else {
                document.getElementById('result').innerHTML = 'Location not found. Please enter a valid city or country.';
            }
        })
        .catch(error => {
            document.getElementById('result').innerHTML = 'Error fetching location data!';
        });
});

// Function to get timezone and current time based on coordinates
function getTimezoneAndTime(lat, lon, location) {
    const timeApiKey = 'PE5EZ2J8U4H0';  // Replace with your TimeZoneDB API Key
    const timeApiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${timeApiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
    
    // Clear any previous intervals
    clearInterval(intervalId);

    fetch(timeApiUrl)
        .then(response => response.json())
        .then(timeData => {
            if (timeData.status === 'OK') {
                let currentTime = new Date(timeData.formatted.replace(' ', 'T')); // Convert API time to Date object
                displayTime(location, currentTime);  // Display time initially

                // Update time every second
                intervalId = setInterval(() => {
                    currentTime.setSeconds(currentTime.getSeconds() + 1);
                    displayTime(location, currentTime);
                }, 1000);
            } else {
                document.getElementById('result').innerHTML = 'Error fetching time data!';
            }
        })
        .catch(error => {
            document.getElementById('result').innerHTML = 'Error fetching time data!';
        });
}

// Display the time
function displayTime(location, time) {
    const formattedTime = time.toLocaleTimeString();  // Get time in HH:MM:SS format
    document.getElementById('result').innerHTML = `Current time in ${location}: ${formattedTime}`;
}

// Function to change background based on time
function changeBackground() {
    const now = new Date();
    const hour = now.getHours();

    const body = document.body;

    if (hour >= 6 && hour < 18) {
        // Daytime: 6 AM to 6 PM
        body.style.backgroundImage = "url('daytime.jpg')"; // Replace with your daytime image
    } else {
        // Nighttime: 6 PM to 6 AM
        body.style.backgroundImage = "url('nighttime.jpg')"; // Replace with your nighttime image
    }
}

// Call the function when the page loads
changeBackground();

// Optionally, you could check and update the background every hour
setInterval(changeBackground, 3600000); // Update every hour (3600000ms = 1 hour)
