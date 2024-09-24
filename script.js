 //this is just a free api key that I created, you must create your own api key from the timezonedb site and replace it here.
 
 let intervalId;

 document.getElementById('getTimeBtn').addEventListener('click', function() {
     const location = document.getElementById('location').value.trim();
     
     if (!location) {
         document.getElementById('result').innerHTML = 'Please enter a valid city or country!';
         return;
     }
 
     // Get the coordinates of the city/country using OpenWeatherMap Geocoding API
     const geoApiKey = '4525a9ec3053fd7b173e9195f33778f1';  // Replace with your own OpenWeatherMap API Key, This is mine :)
     const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${geoApiKey}`;
 
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
     const timeApiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeApiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
 
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
 
 // Function to display the time
 function displayTime(location, time) {
     const formattedTime = time.toLocaleTimeString();  // Get time in HH:MM:SS format
     document.getElementById('result').innerHTML = `Current time in ${location}: ${formattedTime}`;
 }
 