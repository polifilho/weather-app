import { useCallback } from "react";
import { Box, TextField, Autocomplete } from '@mui/material';
import { TSearchLocations, TCities } from '../types';
import {debounce} from 'lodash';

import { fetchCities } from '../services/weather-api';

export const SearchLocations = ({
	selectedCity,
	cities,
	setSelectedCity,
	setCities,
	handleCityChange
}: TSearchLocations) => {
  const debouncedFetchData = useCallback(
    debounce((selectedCity: string) => {
			fetchCities(selectedCity).then(({ results }: TCities) => setCities(results))
	    return fetchCities(selectedCity);
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
    setSelectedCity(value);
		debouncedFetchData(value)
  };

	return (
		<Box mb={4}>
			<Autocomplete
				value={selectedCity}
				disablePortal
				options={[
					{ label: 'The Shawshank Redemption', year: 1994 },
  				{ label: 'The Godfather', year: 1972 },
				] as any[]}
				id='auto-complete'
				onChange={handleCityChange}
				sx={{ backgroundColor: '#1e1e1e', color: 'blue' }}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search Cities"
						variant="outlined"
						sx={{ color: 'white' }}
						onChange={handleChange}
						id='fieldSearch'
					/>
				)}
			/>
		</Box>
	)
}

export default SearchLocations;
