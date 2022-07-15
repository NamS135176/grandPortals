import {
	Box,
	Card,
	Button,
	IconButton,
	InputAdornment,
	Link,
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
import { PencilAlt as PencilAltIcon } from '../../icons/pencil-alt';
import { Upload as UploadIcon } from '../../icons/upload';
import { Search as SearchIcon } from '../../icons/search';
import { Scrollbar } from '../scrollbar';
import { useState } from 'react';

const bukkenList = [
	{
		id: 'HONR000001',
		type: '戸建',
		location: '神奈川県横浜市小机1-XX',
	},
];

export const BukkenRegistInfoTable = () => {
	const [bukkenId, setBukkenId] = useState('HONR000001');

	return (
		<Box
			sx={{
				backgroundColor: 'background.default',
				p: 3,
			}}
		>
			<Card>
				<CardHeader title="物件情報登録" />
				<CardContent>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							flexWrap: 'wrap',
							pb: 2,
						}}
					>
						<TextField
							sx={{ pr: 2 }}
							name="bukkenId"
							value={bukkenId}
							onChange={(event) => setBukkenId(event.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon fontSize="small" />
									</InputAdornment>
								),
							}}
						/>
						<Button type="submit" variant="contained">
							検索
						</Button>
					</Box>
					<Scrollbar>
						<Table sx={{ minWidth: 1200 }}>
							<TableHead>
								<TableRow>
									<TableCell>物件番号</TableCell>
									<TableCell>物件種別</TableCell>
									<TableCell>所在地</TableCell>
									<TableCell>データ一括登録</TableCell>
									<TableCell>物件情報編集</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{bukkenList.map((bukken) => (
									<TableRow hover key={bukken.id}>
										<TableCell>
											<Link
												color="textPrimary"
												underline="none"
												variant="subtitle2"
											>
												{bukken.id}
											</Link>
										</TableCell>
										<TableCell>{bukken.type}</TableCell>
										<TableCell>{bukken.location}</TableCell>
										<TableCell>
											<Button
												startIcon={<UploadIcon fontSize="small" />}
												sx={{ m: 1 }}
											>
												Import
											</Button>
										</TableCell>
										<TableCell>
											<IconButton color="primary">
												<PencilAltIcon fontSize="small" />
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
