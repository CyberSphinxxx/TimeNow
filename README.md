# TimeNow

TimeNow is a simple web application that allows users to input a city or country and retrieve the current time for that location. The app uses the OpenWeatherMap Geocoding API to fetch geographical coordinates and TimeZoneDB API to fetch the corresponding time based on those coordinates.

## Features

- Input any city or country to get the current local time.
- Dynamically updates the displayed time every second.
- Changes the background based on the time of day (daytime or nighttime).
- Provides a visually appealing interface with smooth transitions.

## Screenshots
![Opera Snapshot_2024-09-25_001258_127 0 0 1](https://github.com/user-attachments/assets/127a4322-6d24-4059-9f23-01bc30ae6299)

## How It Works

1. User inputs a city or country name.
2. The app retrieves the geographic coordinates using the **OpenWeatherMap Geocoding API**.
3. Using the geographic coordinates, the app calls the **TimeZoneDB API** to retrieve the current time.
4. The time is displayed and updated every second.
5. The background image changes based on the current time (daytime or nighttime).

## APIs Used

1. **OpenWeatherMap Geocoding API**  
   Used to convert the city or country input into geographical coordinates (latitude and longitude).
   
   - API Documentation: [https://openweathermap.org/api/geocoding-api](https://openweathermap.org/api/geocoding-api)
   
2. **TimeZoneDB API**  
   Used to get the time and timezone information based on geographic coordinates.
   
   - API Documentation: [https://timezonedb.com/api](https://timezonedb.com/api)

## Project Setup

### Prerequisites

- A basic understanding of HTML, CSS, and JavaScript.
- An active API key for both **OpenWeatherMap** and **TimeZoneDB**.

## Contributing
If you would like to contribute to this project, feel free to fork the repository and submit a pull request!

1. Fork it!
2. Create your feature branch: ```git checkout -b my-new-feature```
3. Commit your changes: ```git commit -am 'Add some feature'```
4. Push to the branch: ```git push origin my-new-feature```
5. Submit a pull request.
