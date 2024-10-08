

let intervalId;

document.getElementById('getTimeBtn').addEventListener('click', function() {
    const location = document.getElementById('location').value.trim();
    
    if (!location) {
        document.getElementById('result').innerHTML = 'Please enter a valid city or country!';
        return;
    }

    // This is just a free API key that I created; you must create your own API key from the TimeZoneDB site and replace it here.
    // Get the coordinates of the city/country using OpenWeatherMap Geocoding API
    const geoApiKey = '4525a9ec3053fd7b173e9195f33778f1';  // Replace with your own OpenWeatherMap API Key, This is mine :)
    const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${geoApiKey}`;

    fetch(geoApiUrl)
        .then(response => response.json())
        .then(geoData => {
            if (geoData.length > 0) {
                const lat = geoData[0].lat;
                const lon = geoData[0].lon;

                // Use the coordinates to get the timezone using TimeZoneDB API
                getTimezoneAndTime(lat, lon, location);
            }
            
            else {
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
            }
            
            else {
                document.getElementById('result').innerHTML = 'Error fetching time data!';
            }
        })
        .catch(error => {
            document.getElementById('result').innerHTML = 'Error fetching time data!';
        });
}

// Display the time
function displayTime(location, time) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = daysOfWeek[time.getDay()];  // Get the day of the week
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });  // Get time in HH:MM:SS AM/PM format
    
    // Update the label and result with the city, day of the week, and time
    document.getElementById('locationLabel').innerHTML = `${location}: ${day} ${formattedTime}`;
    document.getElementById('result').innerHTML = `Showing Current Time in ${location}`;
    
    // Change the background based on the time at the user's inputted location
    changeBackground(time);
}

// Function to change background based on time
function changeBackground(time) {
    const hour = time.getHours();  // Use the time from the user's input location
    const body = document.body;

    if (hour >= 6 && hour < 18) {
        // Daytime: 6 AM to 6 PM
        body.style.backgroundImage = "url('daytime.jpg')";  // Replace with your daytime image
        body.style.backgroundSize = "cover";                // Make sure the background covers the whole area properly
        body.style.backgroundPosition = "center";           // Ensure the image is centered
        body.style.animation = "none";                      // Stop gradient animation
    }
    
    else {
        // Nighttime: 6 PM to 6 AM
        body.style.backgroundImage = "url('nighttime.jpg')"; // Replace with your nighttime image
        body.style.backgroundSize = "cover";                 // Ensure the background covers the area properly
        body.style.backgroundPosition = "center";            // Ensure the image is centered
        body.style.animation = "none";                       // Stop gradient animation
    }
}
