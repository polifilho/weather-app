import { TDataOption } from '../types';

export const handleLocationOption = (city: any): TDataOption => {
	return {
		label: city.name,
		country_code: city.country_code,
		lat: city.latitude,
		lon: city.longitude,
	}
}