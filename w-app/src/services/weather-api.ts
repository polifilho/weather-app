const base_url = 'http://localhost:8080';

export const getWeatherData = async (lat: string, lon: string, days: string = '14') => {
	const response = await fetch(`${base_url}/weather?lat=${lat}&lon=${lon}&` + new URLSearchParams(`days=${days}`).toString());
	const data = await response.json();
	return data;
};