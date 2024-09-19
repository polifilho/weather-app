import React, { useState } from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import { TCity, TDataOption } from '../types';
import SearchLocations from '../components/searchLocations';
import DataCardItem from '../components/dataCards';
import { getWeatherData } from  '../services/weather-api';
import LineComponent from '../components/Charts/line';
import BarsComponent from  '../components/Charts/bars';
import SelectDaysComponent from '../components/selectDays';
import { CONTENT } from '../commons/content';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WeatherApp: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string>('7');
  const [cities, setCities] = useState<TCity[]|any>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [locationInfo, setLocationInfo] = useState<TDataOption|null>(null);

  const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>|any, value: TDataOption|any) => {
    if (!value || value === null) {
      setCities([]);
      setForecast([]);
      setSelectedOptions('7');
      setLocationInfo(null);
      return;
    }
    setSelectedCity(value!.label);
    setLocationInfo(value)
    getWeatherData(value!.lat.toString(), value!.lon.toString()).then((data: TCity[]) => {
      if (!data) {
        setForecast([]);
        return;
      }
      setForecast(data);
    })
  };

  const handleOptionsChange = (event: React.ChangeEvent<{ value: unknown }>|any) => {
    if (!selectedCity) {
      return;
    }
    const days = event.target.value;
    getWeatherData(locationInfo!.lat.toString(), locationInfo!.lon.toString(), days).then((data: TCity[]) => {
      if (!data) {
        setForecast([]);
        return;
      }
      setForecast(data);
    })
    setSelectedOptions(event.target.value as string);
  };

  return (
    <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', padding: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" color="white" gutterBottom>
          {CONTENT.searchSelect.title}
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <SearchLocations
              selectedCity={selectedCity}
              handleCityChange={handleCityChange}
              setCities={setCities}
              cities={cities}
              setSelectedCity={setSelectedCity}
            />
          </Grid>

          {Object.keys(forecast).length > 0 &&
            <Grid item xs={6}>
              <SelectDaysComponent
                selectedOptions={selectedOptions}
                handleOptionsChange={handleOptionsChange}
              />           
            </Grid>
          }
        </Grid>

        {/* CARDS */}
        <Grid container spacing={2}>
          {Object.keys(forecast).length > 0 && <DataCardItem forecast={forecast} /> }
        </Grid>

        {/* CHARTS */}
        {Object.keys(forecast).length > 0 && <LineComponent forecast={forecast} /> }
        {Object.keys(forecast).length > 0 && <BarsComponent forecast={forecast} /> }
      </Container>
    </Box>
  );
};

export default WeatherApp;
