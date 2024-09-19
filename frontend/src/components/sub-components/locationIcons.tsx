import { Box, Typography } from '@mui/material';
import { TLocaionOption } from '../../types';
import Icon from '@mui/material/Icon';

export const SearchLocationOption = ({ props, option }: TLocaionOption) => {
	return (
		<Box
			component="li"
			sx={{ "& > span": { mr: 2, flexShrink: 0 } }}
			{...props}
			key={`${option.name}-${option.lat}`}
		>
			<Icon
				component="img"
				sx={{
						height: 16,
						width: 16,
						maxHeight: { xs: 16, md: 16 },
						maxWidth: { xs: 16, md: 16 },
				}}
				alt="The house from the offer."
				src={`${process.env.REACT_APP_ICONS_LOCATIONS}/country-flags/${option.country_code}.svg`}
			/>
			<Typography variant="body1" component="p" sx={{ marginLeft: 1 }}>
				{option.label}
			</Typography>
		</Box>
	)
}

export default SearchLocationOption;
