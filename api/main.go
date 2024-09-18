package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
	"weather-app/utils"

	"github.com/sirupsen/logrus"
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

type LocationApiResponse struct {
	Locations []struct {
		Id          int     `json:"id"`
		Name        string  `json:"name"`
		Latitude    float64 `json:"latitude"`
		Longitude   float64 `json:"longitude"`
		CountryCode string  `json:"country_code"`
		Timezone    string  `json:"timezone"`
	} `json:"results"`
}

type handler struct {
	logger                      *logrus.Logger
	weatherEndpoint             string
	weatherSearchCitiesEndpoint string
}

// Get Data from API
func (h *handler) getLocations(location string) (LocationApiResponse, error) {
	fmt.Print(location)
	url := fmt.Sprintf("%s/search?name=%s", h.weatherSearchCitiesEndpoint, location)
	h.logger.Debug("URL >>>>", url)
	resp, err := http.Get(url)
	if err != nil {
		h.logger.Error("error request >>> ", err)
		return LocationApiResponse{}, err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		h.logger.Error("error acima de 400 ", err)
		return LocationApiResponse{}, err
	}

	var locationData LocationApiResponse
	err = json.NewDecoder(resp.Body).Decode(&locationData)
	if err != nil {
		return LocationApiResponse{}, err
	}

	return locationData, nil
}

func (h *handler) getAllWeatherData(lat, lon, days string) (WeatherApiResponse, error) {
	url := fmt.Sprintf("%s/forecast?latitude=%s&longitude=%s&daily=temperature_2m_max,temperature_2m_min,daylight_duration,rain_sum,wind_speed_10m_max,wind_gusts_10m_max&forecast_days=%s", h.weatherEndpoint, lat, lon, days)

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
func (h *handler) weatherHandler(w http.ResponseWriter, r *http.Request) {
	lat := r.URL.Query().Get("lat")
	lon := r.URL.Query().Get("lon")
	days := r.URL.Query().Get("days")

	if lat == "" || lon == "" {
		http.Error(w, "Missing lat or lon parameters", http.StatusBadRequest)
		return
	}

	weather, err := h.getAllWeatherData(lat, lon, days)
	if err != nil {
		http.Error(w, "Error fetching weather data", http.StatusInternalServerError)
		h.logger.Error(err)
		return
	}

	json.NewEncoder(w).Encode(weather.Daily)
}

func (h *handler) locationsHandler(w http.ResponseWriter, r *http.Request) {
	city := r.URL.Query().Get("city")
	city = strings.ReplaceAll(city, " ", "+")

	if city == "" {
		http.Error(w, "Missing location parameters", http.StatusBadRequest)
		return
	}

	search, err := h.getLocations(city)
	if err != nil {
		http.Error(w, "Error fetching locations", http.StatusInternalServerError)
		h.logger.Error("Error ::", err)
		return
	}

	json.NewEncoder(w).Encode(search)
}

func main() {
	logger := logrus.New()
	logger.SetLevel(logrus.DebugLevel)
	logger.SetFormatter(&logrus.JSONFormatter{})

	h := &handler{
		logger:                      logger,
		weatherEndpoint:             os.Getenv("WEATHER_API"),
		weatherSearchCitiesEndpoint: os.Getenv("WEATHER_API_SEARCH_CITIES"),
	}

	if h.weatherEndpoint == "" || h.weatherSearchCitiesEndpoint == "" {
		logger.Fatal("Endpoint for WEATHER and SEARCH CITIES in .env not founds")
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/weather", h.weatherHandler)
	mux.HandleFunc("/weather/locations", h.locationsHandler)

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
