import { Card, Typography, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { getWeekdaysArray } from '../../helpers';
import { TForecastAPIResponse } from '../../types'
import { CONTENT } from '../../commons/content';

export const BarsComponent = ({ forecast }: TForecastAPIResponse) => {
	if (!forecast) {
		return null;
	}

	const days = forecast && (forecast as any)['wind_speed_10m_max'].length;
	const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: `${CONTENT.barCharts.subtitle}`,
        color: 'white',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        beginAtZero: true,
      },
    },
  };

	const dataBar = {
    labels: getWeekdaysArray(days),
    datasets: [
      {
				label: `${CONTENT.common.speed}`,
				data: forecast && (forecast as any)['wind_speed_10m_max'],
				backgroundColor: '#4caf50',
			},
			{
				label: `${CONTENT.common.gust}`,
				data: forecast && (forecast as any)['wind_gusts_10m_max'],
				backgroundColor: '#20B2AA',
			},
    ],
  };

	return (
		<Box mt={4}>
			<Typography variant="h5" color="white">{CONTENT.barCharts.title}</Typography>
			<Card sx={{ backgroundColor: '#1e1e1e', padding: 2, marginTop: 2 }}>
				<Bar data={dataBar} options={optionsBar} />;
			</Card>
		</Box>
	)
}

export default BarsComponent;
