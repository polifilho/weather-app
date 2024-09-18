import React, { useEffect, useState } from 'react';
import { Grid, Container, Card, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Thermostat, Air, Opacity, Speed, DeviceThermostat, WbSunny } from '@mui/icons-material';
import { TCity, TDataOption } from './types';
import SearchLocations from './components/searchLocations';
import DataCardItem from './components/dataCards';
import { getWeatherData } from  './services/weather-api';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherApp: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string>('7');
  const [cities, setCities] = useState<TCity[]|any>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);

  // useEffect(() => {
  //   getWeatherData('51.22172', '6.77616', '7').then((data: any) => {
  //     const currentForecast = [
  //       data['temperature_2m_max'].at(0),
  //       data['temperature_2m_max'].at(0),
  //       data['temperature_2m_min'].at(0),
  //       data['daylight_duration'].at(0),
  //       data['rain_sum'].at(0),
  //       data['wind_speed_10m_max'].at(0),
  //       data['wind_gusts_10m_max'].at(0),
  //     ]
  //     console.log('DATA >>>', currentForecast);
  //   });
  // }, [])

  const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>|any, value: TDataOption|any) => {
    if (!value) {
      setCities([]);
    }
    setSelectedCity(value!.label);
    getWeatherData(value!.lat.toString(), value!.lon.toString()).then((data: TCity[]) => {
      if (!data) {
        setForecast([]);
        return;
      }
      setForecast(data);
    })
  };

  const handleOptionsChange = (event: React.ChangeEvent<{ value: unknown }>|any) => {
    setSelectedOptions(event.target.value as string);
  };

  // Dados de exemplo para os gráficos
  const tempData = {
    labels: ['9/09', '10/09', '11/09', '12/09', '13/09', '14/09', '15/09'],
    datasets: [
      {
        label: 'Temperatura do ar, °C',
        data: [16, 17, 14, 15, 18, 20, 19],
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
      },
    ],
  };

  const optionsChart = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const dataBar = {
    labels: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7'], // Nomes dos dias (podem ser datas também)
    datasets: [
      {
        label: 'Temperatura diária, °C', // Legenda do gráfico
        data: [16, 18, 15, 20, 17, 19, 21], // Temperaturas para cada dia
        backgroundColor: '#42a5f5', // Cor das barras
        borderRadius: 5, // Borda arredondada nas barras
      },
    ],
  };

  // Configurações adicionais (opcionais)
  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Posição da legenda
        labels: {
          color: 'white', // Cor do texto da legenda
        },
      },
      title: {
        display: true,
        text: 'Temperatura dos últimos 7 dias',
        color: 'white', // Cor do título
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Cor das labels no eixo X
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Grid do eixo X com opacidade
        },
      },
      y: {
        ticks: {
          color: 'white', // Cor das labels no eixo Y
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Grid do eixo Y com opacidade
        },
        beginAtZero: true, // Iniciar o eixo Y a partir de 0
      },
    },
  };
 
  return (
    <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', padding: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" color="white" gutterBottom>
          Weather forecast data
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

          <Grid item xs={6}>
            <Box>
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'white' }}>Forecast days</InputLabel>
                <Select
                  id="demo-simple-select"
                  label="Forecast days"
                  value={selectedOptions}
                  onChange={handleOptionsChange}
                  sx={{ backgroundColor: '#1e1e1e', color: 'white' }}
                >
                  <MenuItem value='1'>1 day</MenuItem>
                  <MenuItem value='3'>3 days</MenuItem>
                  <MenuItem value='7'>7 days</MenuItem>
                  <MenuItem value='14'>14 days</MenuItem>
                </Select>
              </FormControl>
            </Box>              
          </Grid>
        </Grid>
        
        {/* CARDS */}
        <Grid container spacing={2}>
          {Object.keys(forecast).length > 0 && <DataCardItem forecast={forecast} /> }
        </Grid>

        <Box mt={4}>
          <Typography variant="h5" color="white">Previsão do Tempo</Typography>
          <Card sx={{ backgroundColor: '#1e1e1e', padding: 2, marginTop: 2 }}>
            <Line data={tempData} options={optionsChart} />
          </Card>
        </Box>

        <Box mt={4}>
          <Typography variant="h5" color="white">Dados Climáticos e Meteorológicos</Typography>
          <Card sx={{ backgroundColor: '#1e1e1e', padding: 2, marginTop: 2 }}>
            <Bar data={dataBar} options={optionsBar} />;
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default WeatherApp;
