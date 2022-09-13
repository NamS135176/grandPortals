import {useState} from 'react';
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
import {X as XIcon} from '../../icons/x';
import {FileDropzone} from '../file-dropzone';

export const DocsDialog = (props) => {
	const {onClose, open, ...other} = props;
	const [form, setForm] = useState({
		outline: 'XXXのファイル',
		details: 'テキストサンプルテキストサンプルテキストサンプル',
	});
	const [files, setFiles] = useState([]);

	const handleChange = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	const handleDrop = (newFiles) => {
		setFiles((prevFiles) => [...prevFiles, ...newFiles]);
	};

	const handleRemove = (file) => {
		setFiles((prevFiles) =>
			prevFiles.filter((_file) => _file.path !== file.path)
		);
	};

	const handleRemoveAll = () => {
		setFiles([]);
	};

	return (
		<Dialog
			fullWidth
			maxWidth="sm"
			onClose={onClose}
			open={!!open}
			{...other}
		>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'space-between',
					px: 3,
					py: 2,
				}}
			>
				<Typography variant="h6">資料情報</Typography>
				<IconButton color="inherit" onClick={onClose}>
					<XIcon fontSize="small" />
				</IconButton>
			</Box>
			<DialogContent>
				<form>
					<TextField
						fullWidth
						label="資料概要"
						value={form.outline}
						onChange={handleChange}
						required
					/>
					<Box sx={{mt: 3}}>
						<Typography
							color="textSecondary"
							variant="body2"
							sx={{mb: 1}}
						>
							資料追加 *
						</Typography>

						<FileDropzone
							accept={{
								'image/*': [],
							}}
							files={files}
							onDrop={handleDrop}
							onRemove={handleRemove}
							onRemoveAll={handleRemoveAll}
						/>
					</Box>
				</form>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={onClose}>
					追加
				</Button>
			</DialogActions>
		</Dialog>
	);
};

DocsDialog.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool,
};
