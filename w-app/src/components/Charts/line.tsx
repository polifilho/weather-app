import { Card, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { getWeekdaysArray } from '../../helpers';
import { TForecastAPIResponse } from '../../types'
import { CONTENT } from '../../commons/content';

export const LineComponent = ({ forecast }: TForecastAPIResponse) => {
	if (!forecast) {
		return null;
	}
	const days = forecast && (forecast as any)['temperature_2m_max'].length;
	const tempData = {
    labels: getWeekdaysArray(days),
    datasets: [
      {
        label: `${CONTENT.lineCharts.label1}, +°C`,
        data: forecast && (forecast as any)['temperature_2m_max'],
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: false,
      },
      {
        label: `${CONTENT.lineCharts.label2}, -°C`,
        data: forecast && (forecast as any)['temperature_2m_min'],
        borderColor: '#ff5722',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: false,
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

	return (
		<Box mt={4}>
			<Typography variant="h5" color="white">{CONTENT.lineCharts.title}</Typography>
			<Card sx={{ backgroundColor: '#1e1e1e', padding: 2, marginTop: 2 }}>
				<Line data={tempData} options={optionsChart} />
			</Card>
		</Box>
	)
}

export default LineComponent;
