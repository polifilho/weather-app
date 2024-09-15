package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"weather-app/utils"
)

// Struct API Response
type WeatherApiResponse struct {
	TemperatureMax           []float64 `json:"temperature_2m_max"`
	TemperatureMin           []float64 `json:"temperature_2m_min"`
	Sunrise                  []string  `json:"sunrise"`
	Sunset                   []string  `json:"sunset"`
	SunshineDuration         []float64 `json:"sunshine_duration"`
	UvIndexClearSkyMax       []float64 `json:"uv_index_clear_sky_max"`
	RainSum                  []float64 `json:"rain_sum"`
	SnowfallSum              []float64 `json:"snowfall_sum"`
	WindSpeed10mMax          []float64 `json:"wind_speed_10m_max"`
	WindGusts10mMax          []float64 `json:"wind_gusts_10m_max"`
	WindDirection10mDominant []int     `json:"wind_direction_10m_dominant"`
	Et0FaoEvapotranspiration []float64 `json:"et0_fao_evapotranspiration"`
}

// Get data from API
func getAllWeatherData(lat, lon string) (WeatherApiResponse, error) {
	url := fmt.Sprintf("https://api.open-meteo.com/v1/forecast?latitude=%s&longitude=%s&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,sunshine_duration,uv_index_clear_sky_max,rain_sum,snowfall_sum,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,et0_fao_evapotranspiration", lat, lon)

	resp, err := http.Get(url)
	if err != nil {
		return WeatherApiResponse{}, err
	}
	defer resp.Body.Close()

	var weatherData map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&weatherData)
	if err != nil {
		return WeatherApiResponse{}, err
	}

	// Check Data
	dailyData, ok := weatherData["daily"].(map[string]interface{})
	if !ok {
		return WeatherApiResponse{}, fmt.Errorf("unexpected api response: something is missing or it is not a map")
	}

	weather := WeatherApiResponse{
		TemperatureMax:           utils.ConvertToFloat64Slice(utils.GetField(dailyData, "temperature_2m_max")),
		TemperatureMin:           utils.ConvertToFloat64Slice(utils.GetField(dailyData, "temperature_2m_min")),
		Sunrise:                  utils.ConvertToStringSlice(utils.GetField(dailyData, "sunrise")),
		Sunset:                   utils.ConvertToStringSlice(utils.GetField(dailyData, "sunset")),
		SunshineDuration:         utils.ConvertToFloat64Slice(utils.GetField(dailyData, "sunshine_duration")),
		UvIndexClearSkyMax:       utils.ConvertToFloat64Slice(utils.GetField(dailyData, "uv_index_clear_sky_max")),
		RainSum:                  utils.ConvertToFloat64Slice(utils.GetField(dailyData, "rain_sum")),
		SnowfallSum:              utils.ConvertToFloat64Slice(utils.GetField(dailyData, "snowfall_sum")),
		WindSpeed10mMax:          utils.ConvertToFloat64Slice(utils.GetField(dailyData, "wind_speed_10m_max")),
		WindGusts10mMax:          utils.ConvertToFloat64Slice(utils.GetField(dailyData, "wind_gusts_10m_max")),
		WindDirection10mDominant: utils.ConvertToIntSlice(utils.GetField(dailyData, "wind_direction_10m_dominant")),
		Et0FaoEvapotranspiration: utils.ConvertToFloat64Slice(utils.GetField(dailyData, "et0_fao_evapotranspiration")),
	}

	return weather, nil
}

// Preparing request for Endpoint "/weather"
func weatherHandler(w http.ResponseWriter, r *http.Request) {
	lat := r.URL.Query().Get("lat")
	lon := r.URL.Query().Get("lon")

	if lat == "" || lon == "" {
		http.Error(w, "Missing lat or lon parameters", http.StatusBadRequest)
		return
	}

	weather, err := getAllWeatherData(lat, lon)
	if err != nil {
		http.Error(w, "Error fetching weather data", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(weather)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/weather", weatherHandler)

	// CORS middleware
	handler := utils.EnableCORS(mux)

	fmt.Println("Backend server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
