import React from 'react';
import {
	Box,
	Grid,
	Typography,
	Card,
	CardContent,
	CardActionArea,
} from '@mui/material';

const menu = [
	{
		name: '外装エクステリア',
		url: '/exterior/list',
	},
	{
		name: '部屋スペース',
		url: '/room/list',
	},
	{
		name: '家具',
		url: '/furniture/list',
	},
	{
		name: '家電',
		url: '/electronics/list',
	},
	{
		name: '設備',
		url: '/equipment/list',
	},
	{
		name: 'その他',
		url: '/other/list',
	},
];

export const ManagementList = () => {
	return (
		<>
			<Typography variant="h6">他の情報を管理</Typography>
			<Box sx={{ mt: 3 }}>
				<Grid container spacing={3}>
					{menu.map((menu_) => (
						<Grid item key={menu_.name} sm={4} xs={12}>
							<CardActionArea href={menu_.url}>
								<Card
									elevation={0}
									variant="outlined"
									sx={{
										cursor: 'pointer',
										borderColor: 'primary.main',
										borderWidth: 2,
									}}
								>
									<CardContent>
										<Box
											sx={{
												alignItems: 'center',
												display: 'flex',
												justifyContent: 'center',
											}}
										>
											<Typography variant="overline">{menu_.name}</Typography>
										</Box>
									</CardContent>
								</Card>
							</CardActionArea>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
};
