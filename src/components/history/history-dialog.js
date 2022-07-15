import { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Dialog,
	DialogContent,
	DialogActions,
	IconButton,
	TextField,
	Typography,
	Button,
} from '@mui/material';
import { X as XIcon } from '../../icons/x';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

export const HistoryDialog = (props) => {
	const { onClose, open, mode = 'edit', ...other } = props;
	const [form, setForm] = useState({
		date: new Date(),
		outline: 'XXXの修繕',
		details: 'テキストサンプルテキストサンプルテキストサンプル',
	});

	const handleDateChange = (date) => {
		setForm({ ...form, date: date });
	};

	const handleChange = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<Dialog fullWidth maxWidth="sm" onClose={onClose} open={!!open} {...other}>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'space-between',
					px: 3,
					py: 2,
				}}
			>
				<Typography variant="h6">履歴情報</Typography>
				<IconButton color="inherit" onClick={onClose}>
					<XIcon fontSize="small" />
				</IconButton>
			</Box>
			<DialogContent>
				<form>
					<MobileDatePicker
						disabled={mode === 'reference'}
						label="履歴"
						inputFormat="MM/dd/yyyy"
						value={form.date}
						onChange={handleDateChange}
						renderInput={(inputProps) => <TextField {...inputProps} />}
					/>
					<TextField
						disabled={mode === 'reference'}
						sx={{ mt: 3 }}
						fullWidth
						label="概要"
						name="outline"
						onChange={handleChange}
						value={form.outline}
					/>
					<TextField
						disabled={mode === 'reference'}
						sx={{ mt: 3 }}
						fullWidth
						multiline
						minRows={4}
						label="詳細内応"
						name="details"
						value={form.details}
						onChange={handleChange}
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={onClose}>
					{mode === 'reference' ? '詳細を参照' : '履歴追加'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

HistoryDialog.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool,
	mode: PropTypes.oneOf(['edit', 'reference']),
};
