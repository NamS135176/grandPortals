import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Drawer, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const MainSidebarLink = styled(Link)(({ theme }) => ({
	borderRadius: theme.shape.borderRadius,
	display: 'block',
	padding: theme.spacing(1.5),
	'&:hover': {
		backgroundColor: theme.palette.action.hover,
	},
}));

export const MainSidebar = (props) => {
	const { onClose, open } = props;
	const router = useRouter();
	const handlePathChange = () => {
		if (open) {
			onClose?.();
		}
	};

	useEffect(
		handlePathChange,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[router.asPath]
	);

	return (
		<Drawer
			anchor="right"
			onClose={onClose}
			open={open}
			PaperProps={{ sx: { width: 256 } }}
			sx={{
				zIndex: (theme) => theme.zIndex.appBar + 100,
			}}
			variant="temporary"
		>
			<Box sx={{ p: 2 }}>
				<NextLink href="/bukken/list" passHref>
					<MainSidebarLink
						color="textSecondary"
						underline="none"
						variant="subtitle2"
					>
						物件TOP
					</MainSidebarLink>
				</NextLink>
				<NextLink href="/browse" passHref>
					<MainSidebarLink
						color="textSecondary"
						underline="none"
						variant="subtitle2"
					>
						物件切り替え
					</MainSidebarLink>
				</NextLink>
				<NextLink href="/docs/welcome" passHref>
					<MainSidebarLink
						color="textSecondary"
						underline="none"
						variant="subtitle2"
					>
						物件管
					</MainSidebarLink>
				</NextLink>
			</Box>
		</Drawer>
	);
};

MainSidebar.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool,
};
