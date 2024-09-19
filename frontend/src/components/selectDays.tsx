import { Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { TSelectDays } from '../types';
import { CONTENT } from '../commons/content';

export const SelectDaysComponent = ({ selectedOptions, handleOptionsChange }: TSelectDays) => {
	return (
		<Box>
			<FormControl fullWidth>
				<InputLabel sx={{ color: 'white' }}>{CONTENT.daysSelect.label}</InputLabel>
				<Select
					id="demo-simple-select"
					label={CONTENT.daysSelect.label}
					value={selectedOptions}
					onChange={handleOptionsChange}
					sx={{ backgroundColor: '#1e1e1e', color: 'white' }}
				>
					<MenuItem value='3'>3 days</MenuItem>
					<MenuItem value='7'>7 days</MenuItem>
					<MenuItem value='14'>14 days</MenuItem>
				</Select>
			</FormControl>
		</Box>   
  )
}

export default SelectDaysComponent;
