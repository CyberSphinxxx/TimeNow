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
