import { Grid, Card, Typography, Box} from '@mui/material';
import { Thermostat, Air, Opacity, Speed, DeviceThermostat, WbSunny } from '@mui/icons-material';

export const DataCardItem = ({ forecast }: any) => {
	if (!forecast) {
		return null;
	}

	const inforCardsItem = [
		{
			icon: <Thermostat sx={{ fontSize: 40, marginRight: 2, color: '#ff5722' }} />,
			label: "Max Temperature",
			value: `${forecast['temperature_2m_max'][0]}°C`,
		},
		{
			icon: <DeviceThermostat sx={{ fontSize: 40, marginRight: 2, color: '#03a9f4' }} />,
			label: "Min Temperature",
			value: `${forecast['temperature_2m_min'][0]}°C`,
		},
		{
			icon: <Opacity sx={{ fontSize: 40, marginRight: 2, color: '#03a9f4' }} />,
			label: "Precipitation",
			value: `${forecast['rain_sum'][0]}%`,
		},
		{
			icon: <Air sx={{ fontSize: 40, marginRight: 2, color: '#4caf50' }} />,
			label: "Wind Speed",
			value: `${forecast['wind_speed_10m_max'][0]}m/s`,
		},
		{
			icon: <Speed sx={{ fontSize: 40, marginRight: 2, color: '#4caf50' }} />,
			label: "Wind Gust",
			value: `${forecast['wind_gusts_10m_max'][0]}m/s`,
		},
		{
			icon: <WbSunny sx={{ fontSize: 40, marginRight: 2, color: '#FFFF00' }} />,
			label: "Daylight Duration",
			value: `${forecast['daylight_duration'][0]}%`,
		},
	]

	return (
		<>
			{inforCardsItem.map((item: any, index: number) => (
				<Grid key={`${item.label}-${index}`} item xs={12} sm={4} md={4}>
					<Card 
						sx={{ padding: 2, backgroundColor: '#1e1e1e', color: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
						{item.icon}
						<Box>
							<Typography variant="subtitle1">{item.label}</Typography>
							<Typography variant="h4">{item.value}</Typography>
						</Box>
					</Card>
				</Grid>
			))}
		</>
	)
}

export default DataCardItem;
