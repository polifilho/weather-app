import moment from 'moment';
import { TDataOption } from '../types';

export const handleLocationOption = (city: any): TDataOption => {
	return {
		label: city.name,
		country_code: city.country_code,
		lat: city.latitude,
		lon: city.longitude,
	}
}

export const getWeekdaysArray = (days: number) => {
	let weekdays = [];
	let today = moment();

	for (let i = 0; i < days; i++) {
		weekdays.push(today.format('DD/MM'));
		today.add(1, 'days');
	}

	return weekdays;
}

export const getDaylight = (seconds: number) => {
	let duration = moment.duration(seconds, 'seconds');
	let hours = Math.floor(duration.asHours());
	let minutes = Math.floor(duration.asMinutes() % 60);

	return `${hours}h ${minutes}m`;
}
