import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {
	AppBar,
	Box,
	Container,
	IconButton,
	Link,
	Toolbar,
} from '@mui/material';
import { Menu as MenuIcon } from '../icons/menu';
import { Logo } from './logo';
import { useAuth } from 'hooks/use-auth';

export const MainNavbar = (props) => {
	const { onOpenSidebar } = props;
	const { user } = useAuth();

	return (
		<AppBar
			elevation={0}
			sx={{
				backgroundColor: 'background.paper',
				borderBottomColor: 'divider',
				borderBottomStyle: 'solid',
				borderBottomWidth: 1,
				color: 'text.secondary',
			}}
		>
			<Container maxWidth="lg">
				<Toolbar disableGutters sx={{ minHeight: 64 }}>
					Grands
					<NextLink href="/" passHref>
						<a>
							<Logo
								sx={{
									ml: 2,
									display: {
										md: 'inline',
										xs: 'none',
									},
									height: 40,
									width: 40,
								}}
							/>
						</a>
					</NextLink>
					<Box sx={{ flexGrow: 1 }} />
					<Box
						sx={{
							alignItems: 'center',
							display: {
								md: 'flex',
								xs: 'none',
							},
						}}
					>
						<NextLink href="" passHref>
							<Link
								color="textSecondary"
								underline="none"
								variant="subtitle2"
								mr={2}
							>
								{user?.name}
							</Link>
						</NextLink>
					</Box>
					<IconButton color="inherit" onClick={onOpenSidebar}>
						<MenuIcon fontSize="small" />
					</IconButton>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

MainNavbar.propTypes = {
	onOpenSidebar: PropTypes.func,
};
