import PropTypes from 'prop-types';
import {
	AppBar,
	Box,
	IconButton,
	Toolbar,
	Typography,
	Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon } from '../../icons/menu';
import NextLink from 'next/link';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	...(theme.palette.mode === 'light'
		? {
				boxShadow: theme.shadows[3],
		  }
		: {
				backgroundColor: theme.palette.background.paper,
				borderBottomColor: theme.palette.divider,
				borderBottomStyle: 'solid',
				borderBottomWidth: 1,
				boxShadow: 'none',
		  }),
}));

export const DashboardNavbar = (props) => {
	const { onOpenSidebar, ...other } = props;

	return (
		<>
			<DashboardNavbarRoot {...other}>
				<Toolbar
					disableGutters
					sx={{
						minHeight: 64,
						left: 0,
						px: 2,
					}}
				>
					<NextLink href="/bukken/list" passHref>
						<Link variant="subtitle1" color="textSecondary" underline="none">
							Grands
						</Link>
					</NextLink>
					<Box sx={{ flexGrow: 1 }} />
					<Typography
						color="textSecondary"
						underline="none"
						variant="subtitle2"
						mr={2}
					>
						Kate Nolast
					</Typography>
					<IconButton
						onClick={onOpenSidebar}
						sx={{
							display: 'inline-flex',
						}}
					>
						<MenuIcon fontSize="small" />
					</IconButton>
				</Toolbar>
			</DashboardNavbarRoot>
		</>
	);
};

DashboardNavbar.propTypes = {
	onOpenSidebar: PropTypes.func,
};
