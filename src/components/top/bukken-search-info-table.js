import {
	Box,
	Card,
	Button,
	IconButton,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	CardHeader,
	CardContent,
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../icons/arrow-right';
import { Scrollbar } from '../scrollbar';
import { useState } from 'react';

const bukkenList = [
	{
		email: 'aaaaa@gmail.com',
		id: 'HONR000001',
		name: '山田 太郎',
		location: '神奈川県横浜市小机1-XX',
	},
];

export const BukkenSearchInfoTable = () => {
	const [form, setForm] = useState({
		name: '',
		location: '',
		id: '',
		email: '',
	});

	const handleChange = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<Box
			sx={{
				backgroundColor: 'background.default',
				p: 3,
			}}
		>
			<Card>
				<CardHeader title="物件情報検索" />
				<CardContent>
					<Grid container spacing={3} mb={3}>
						<Grid item md={2} xs={12}>
							<TextField
								fullWidth
								label="氏名"
								name="name"
								value={form.name}
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3} mb={3}>
						<Grid item md={7} xs={12}>
							<TextField
								fullWidth
								label="所在地"
								name="location"
								value={form.location}
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3} mb={3} justifyContent="space-between">
						<Grid item>
							<TextField
								label="物件番号"
								name="id"
								value={form.id}
								onChange={handleChange}
								sx={{ mr: 3 }}
							/>
							<TextField
								label="メールアドレス"
								name="email"
								value={form.email}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item>
							<Button variant="contained">検索</Button>
						</Grid>
					</Grid>

					<Scrollbar>
						<Table sx={{ minWidth: 1200 }}>
							<TableHead>
								<TableRow>
									<TableCell>メールアドレス</TableCell>
									<TableCell>物件番号</TableCell>
									<TableCell>氏名</TableCell>
									<TableCell>所在地</TableCell>
									<TableCell>参照/編集</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{bukkenList.map((bukken) => (
									<TableRow hover key={bukken.id}>
										<TableCell>{bukken.email}</TableCell>
										<TableCell>{bukken.id}</TableCell>
										<TableCell>{bukken.name}</TableCell>
										<TableCell>{bukken.location}</TableCell>
										<TableCell>
											<IconButton>
												<ArrowRightIcon fontSize="small" />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Scrollbar>
					<TablePagination
						component="div"
						count={bukkenList.length}
						onPageChange={() => {}}
						onRowsPerPageChange={() => {}}
						page={0}
						rowsPerPage={5}
						rowsPerPageOptions={[5, 10, 25]}
					/>
				</CardContent>
			</Card>
		</Box>
	);
};
