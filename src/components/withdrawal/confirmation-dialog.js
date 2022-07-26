import {
	Avatar,
	Box,
	Button,
	Typography,
	Dialog,
	CircularProgress,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/WarningOutlined';

export const ConfirmationDialog = (props) => {
	const { onClose, onSubmit, open, isRequesting } = props;
	return (
		<Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					pb: 2,
					pt: 3,
					px: 3,
				}}
			>
				<Avatar
					sx={{
						backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
						color: 'error.main',
						mr: 2,
					}}
				>
					<WarningIcon fontSize="small" />
				</Avatar>
				<div>
					<Typography variant="h6">退会しますか？</Typography>
				</div>
			</Box>
			<Box
				sx={{
					display: 'flex',
					px: 3,
					py: 1.5,
				}}
			>
				<Button sx={{ mr: 2 }} variant="outlined" onClick={onClose}>
					Cancel
				</Button>
				{isRequesting ? (
					<CircularProgress />
				) : (
					<Button
						sx={{
							backgroundColor: 'error.main',
							'&:hover': {
								backgroundColor: 'error.dark',
							},
						}}
						variant="contained"
						onClick={onSubmit}
					>
						OK
					</Button>
				)}
			</Box>
		</Dialog>
	);
};
