import React from 'react';
import {
	Box,
	Grid,
	Typography,
	Card,
	CardContent,
	CardActionArea,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useRouter} from 'next/router';

const CardComponentNoPadding = styled(CardContent)(`
padding: 0;
&:last-child {
	padding-bottom: 0;
}
`);

const menu = [
	{
		name: '外装エクステリア',
		url: '/exterior/list',
		key: 'exterior',
	},
	{
		name: '部屋・スペース',
		url: '/room/list',
		key: 'room',
	},
	{
		name: '家具・インテリア',
		url: '/furniture/list',
		key: 'furniture',
	},
	{
		name: '家電',
		url: '/appliances/list',
		key: 'appliances',
	},
	{
		name: '設備・建材',
		url: '/facility/list',
		key: 'facility',
	},
	{
		name: 'その他',
		url: '/other/list',
		key: 'other',
	},
];

export const ManagementList = () => {
	const router = useRouter();
	const path = router.asPath;

	return (
		<>
			<Typography variant="h6">他の情報を管理</Typography>
			<Box sx={{mt: 3}}>
				<Grid container spacing={3}>
					{menu.map((menu_) => (
						<Grid item key={menu_.name} sm={4} xs={6}>
							<CardActionArea href={menu_.url}>
								<Card
									elevation={0}
									variant="outlined"
									sx={{
										cursor: 'pointer',
										...(path.includes(menu_.key) && {
											borderColor: 'primary.main',
											borderWidth: 2,
											m: '-1px',
										}),
									}}
								>
									<CardComponentNoPadding>
										<Typography
											component="div"
											variant="overline"
											align="center"
										>
											{menu_.name}
										</Typography>
									</CardComponentNoPadding>
								</Card>
							</CardActionArea>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
};
