# Weather API Service

This is a simple app to display some relevant weather data from OpenMeteo.

## Requirements
Below you find the all you need to run this app locally.

- `Docker`
- `Docker Compose`

## Steps before run the project

1. Clone the repository: ```git clone git@github.com:polifilho/weather-app.git```
2. Access the project ```cd weather-app```
3. Use Make command to run both apps: ```make```

## Info
This app use environments variable so please create a file `.env` in the project root and set up the variables below:

- `REACT_APP_BASE_URL=http://localhost:8080`
- `REACT_APP_ICONS_LOCATIONS=https://open-meteo.com/images`
- `WEATHER_API=https://api.open-meteo.com/v1`
- `WEATHER_API_SEARCH_CITIES=https://geocoding-api.open-meteo.com/v1`

## Running

The app will run using port 3000.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Scripts

### `npm test`

Go to frontend project to run the test.\
Launches the test runner in the interactive watch mode.
