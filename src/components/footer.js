import { Box, Container, Typography } from '@mui/material';

export const Footer = (props) => (
	<Box
		sx={{
			backgroundColor: 'background.default',
			borderTopColor: 'divider',
			borderTopStyle: 'solid',
			borderTopWidth: 1,
			py: 6,
		}}
		{...props}
	>
		<Container maxWidth="lg">
			<Typography color="textSecondary" variant="caption">
				© 2022 株式会社grands
				<br />
				All Rights Reserved.
			</Typography>
		</Container>
	</Box>
);
