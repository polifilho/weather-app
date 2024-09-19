import { useCallback, useState } from "react";
import { Box, TextField, Autocomplete } from '@mui/material';
import {debounce} from 'lodash';
import { TSearchLocations, TCities } from '../types';
import { fetchCities } from '../services/weather-api';
import { handleLocationOption } from '../helpers';
import SearchLocationOption from './sub-components/locationIcons';
import { CONTENT } from '../commons/content';

export const SearchLocations = ({
	selectedCity,
	cities,
	setSelectedCity,
	setCities,
	handleCityChange
}: TSearchLocations) => {
	const [errorLocations, setErrorLocations] = useState<boolean>(false);
  const debouncedFetchData = useCallback(
    debounce((selectedCity: string) => {
			fetchCities(selectedCity).then(({ results }: TCities) => {
				if (!results) {
					setCities([]);
					setErrorLocations(true);
					return;
				}
				setCities(results);
				setErrorLocations(false);
			})
	    return fetchCities(selectedCity);
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value: string = e.target.value;
		if (value.length <= 1) {
			return;
		}

    setSelectedCity(value);
		debouncedFetchData(value)
  };

	return (
		<Box mb={4}>
			<Autocomplete
				value={selectedCity}
				noOptionsText={errorLocations ? `${CONTENT.searchSelect.error}` : `${CONTENT.searchSelect.warning}`}
				id='auto-complete'
				onChange={handleCityChange}
				options={cities && cities.map(city => handleLocationOption(city)) as any[]}
				renderOption={(props, option) => <SearchLocationOption key={`${option.name}-${option.lat}`} props={props} option={option} />}
				sx={{ backgroundColor: '#1e1e1e', color: 'blue' }}
				renderInput={(params) => (
					<TextField
						{...params}
						label={CONTENT.searchSelect.label}
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
