package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
	"weather-app/utils"
)

// Struct API Response
type WeatherApiResponse struct {
	Daily struct {
		TemperatureMax   []float64 `json:"temperature_2m_max"`
		TemperatureMin   []float64 `json:"temperature_2m_min"`
		DaylightDuration []float64 `json:"daylight_duration"`
		RainSum          []float64 `json:"rain_sum"`
		WindSpeed10mMax  []float64 `json:"wind_speed_10m_max"`
		WindGusts10mMax  []float64 `json:"wind_gusts_10m_max"`
	} `json:"daily"`
}

// Get Data from API
func getAllWeatherData(lat, lon, days string) (WeatherApiResponse, error) {
	url := fmt.Sprintf("https://api.open-meteo.com/v1/forecast?latitude=%s&longitude=%s&daily=temperature_2m_max,temperature_2m_min,daylight_duration,rain_sum,wind_speed_10m_max,wind_gusts_10m_max&forecast_days=%s", lat, lon, days)

	resp, err := http.Get(url)
	if err != nil {
		return WeatherApiResponse{}, err
	}
	defer resp.Body.Close()

	var weatherData WeatherApiResponse
	err = json.NewDecoder(resp.Body).Decode(&weatherData)
	if err != nil {
		return WeatherApiResponse{}, err
	}

	return weatherData, nil
}

// Preparing request for Endpoint "/weather"
func weatherHandler(w http.ResponseWriter, r *http.Request) {
	lat := r.URL.Query().Get("lat")
	lon := r.URL.Query().Get("lon")
	days := r.URL.Query().Get("days")

	if lat == "" || lon == "" {
		http.Error(w, "Missing lat or lon parameters", http.StatusBadRequest)
		return
	}

	weather, err := getAllWeatherData(lat, lon, days)
	if err != nil {
		http.Error(w, "Error fetching weather data", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(weather.Daily)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/weather", weatherHandler)

	// CORS middleware
	handler := utils.EnableCORS(mux)

	s := &http.Server{
		Addr:         ":8080",
		Handler:      handler,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	fmt.Println("API Service running on :8080")
	log.Fatal(s.ListenAndServe())
}
