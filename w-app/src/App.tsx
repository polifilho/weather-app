import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Grid, Container, Card, Typography, Box, TextField, Autocomplete, Select, MenuItem, InputLabel, FormControl, Chip, Grid2 } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Thermostat, Air, Opacity, Speed, WaterDrop, DeviceThermostat, WbSunny } from '@mui/icons-material';
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

import { getWeatherData, fetchCities } from './services/weather-api';
import { TCity } from './types';

import SearchLocations from './components/searchLocations';

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
  
  const [cities, setCities] = useState<TCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleCityChange = (event: any, value: string | null) => {
    console.log('teste aqui 1 >>', event, value);
    setSelectedCity(value);
  };

  useEffect(() => {
    // getWeatherData('22.9064', '-43.1822', '14');
    // fetchCities('rio de janeiro');
  }, [])


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
  console.log('cities >>', cities);
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
        
        <Grid container spacing={2}>
      {/* Cartão para Temperatura do ar */}
      <Grid item xs={12} sm={4} md={4}>
        <Card sx={{ padding: 2, backgroundColor: '#1e1e1e', color: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
          <Thermostat sx={{ fontSize: 40, marginRight: 2, color: '#ff5722' }} />
          <Box>
            <Typography variant="subtitle1">Temperatura do ar</Typography>
            <Typography variant="h4">+17°C</Typography>
            <Typography variant="body2" color="gray">Máx: +20°C | Mín: +14°C</Typography>
          </Box>
        </Card>
      </Grid>

      {/* Cartão para Sensação Térmica */}
      <Grid item xs={12} sm={4} md={4}>
        <Card sx={{ padding: 2, backgroundColor: '#1e1e1e', color: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
          <DeviceThermostat sx={{ fontSize: 40, marginRight: 2, color: '#03a9f4' }} />
          <Box>
            <Typography variant="subtitle1">Sensação de</Typography>
            <Typography variant="h4">+15°C</Typography>
            <Typography variant="body2" color="gray">Máx: +18°C | Mín: +12°C</Typography>
          </Box>
        </Card>
      </Grid>

      {/* Cartão para Probabilidade de Precipitação */}
      <Grid item xs={12} sm={4} md={4}>
        <Card sx={{ padding: 2, backgroundColor: '#1e1e1e', color: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
          <Opacity sx={{ fontSize: 40, marginRight: 2, color: '#03a9f4' }} />
          <Box>
            <Typography variant="subtitle1">Prec. probabilidade</Typography>
            <Typography variant="h4">0%</Typography>
            <Typography variant="body2" color="gray">Nenhuma precipitação esperada</Typography>
          </Box>
        </Card>
      </Grid>

      {/* Cartão para Velocidade do Vento */}
      <Grid item xs={12} sm={4} md={4}>
        <Card sx={{ padding: 2, backgroundColor: '#1e1e1e', color: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
          <Air sx={{ fontSize: 40, marginRight: 2, color: '#4caf50' }} />
          <Box>
            <Typography variant="subtitle1">Velocidade do vento</Typography>
            <Typography variant="h4">4.6 m/s</Typography>
            <Typography variant="body2" color="gray">Ráfaga: 7.6 m/s</Typography>
          </Box>
        </Card>
      </Grid>

      {/* Cartão para Rajada de Vento */}
      <Grid item xs={12} sm={4} md={4}>
        <Card sx={{ padding: 2, backgroundColor: '#1e1e1e', color: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
          <Speed sx={{ fontSize: 40, marginRight: 2, color: '#4caf50' }} />
          <Box>
            <Typography variant="subtitle1">Rajada de vento</Typography>
            <Typography variant="h4">7.6 m/s</Typography>
            <Typography variant="body2" color="gray">Ráfaga máxima esperada</Typography>
          </Box>
        </Card>
      </Grid>

      {/* Cartão para Umidade do Solo */}
      <Grid item xs={12} sm={4} md={4}>
        <Card sx={{ padding: 2, backgroundColor: '#1e1e1e', color: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
          <WbSunny sx={{ fontSize: 40, marginRight: 2, color: '#FFFF00' }} />
          <Box>
            <Typography variant="subtitle1">Umidade do solo</Typography>
            <Typography variant="h4">34%</Typography>
            <Typography variant="body2" color="gray">Solo úmido</Typography>
          </Box>
        </Card>
      </Grid>
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
