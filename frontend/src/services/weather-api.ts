const base_url = process.env.REACT_APP_BASE_URL;

export const getWeatherData = async (lat: string, lon: string, days: string = '7') => {
	const response = await fetch(`${base_url}/weather?lat=${lat}&lon=${lon}&` + new URLSearchParams(`days=${days}`).toString());
	const data = await response.json();
	return data;
};

export const fetchCities = async (query: string) => {
	if (!query) {
		return;
	}

  try {
		const customQuery = query.replaceAll(' ', '+');
    const response = await fetch(`${base_url}/weather/locations?` + new URLSearchParams(`city=${customQuery}`).toString());
    const data = await response.json();
    return data

  } catch (error) {
      console.error('Error fetching cities:', error);
  }
};
