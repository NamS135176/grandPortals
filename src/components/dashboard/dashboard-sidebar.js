import {useEffect, useMemo, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Box, Divider, Drawer, useMediaQuery, Typography} from '@mui/material';
import {ArrowRight as ArrowRightIcon} from '../../icons/arrow-right';
import {Menu as MenuIcon} from '../../icons/menu';
import {Home as HomeIcon} from '../../icons/home';
import {Lock as LockIcon} from '../../icons/lock';
import {UserCircle as UserCircleIcon} from '../../icons/user-circle';
import {Unsubscribe as UnsubscribeIcon} from '../../icons/unsubscribe';
import LogoutIcon from '@mui/icons-material/Logout';

import {Scrollbar} from '../scrollbar';
import {DashboardSidebarSection} from './dashboard-sidebar-section';
import {OrganizationPopover} from './organization-popover';
import { DashboardSidebarLogout } from './dashboard-sidebar-logout';

const getSections = (t) => [
	{
		items: [
			{
				title: t('物件TOP'),
				path: '/bukken/list',
				icon: <HomeIcon fontSize="small" />,
			},
			{
				title: t('物件切り替え'),
				path: '#',
				icon: <MenuIcon fontSize="small" />,
			},
			{
				title: t('物件管理'),
				path: '/bukken/1',
				icon: <ArrowRightIcon fontSize="small" />,
				children: [
					{
						title: t('外装'),
						path: '/exterior/list',
					},
					{
						title: t('部屋'),
						path: '/room/list',
					},
					{
						title: t('家具'),
						path: '/furniture/list',
					},
					{
						title: t('家電'),
						path: '/appliances/list',
					},
					{
						title: t('設備'),
						path: '/facility/list',
					},
					{
						title: t('その他'),
						path: '/other/list',
					},
				],
			},
			{
				title: t('プロフィール変更'),
				path: '/profile/edit',
				icon: <UserCircleIcon fontSize="small" />,
			},
			{
				title: t('パスワード変更'),
				path: '/profile/passwordresetting',
				icon: <LockIcon fontSize="small" />,
			},
			{
				title: t('退会手続き'),
				path: '/withdrawal',
				icon: <UnsubscribeIcon fontSize="small" />,
			},
		],
	},
];

export const DashboardSidebar = (props) => {
	const {onClose, open} = props;
	const router = useRouter();
	const {t} = useTranslation();
	const sections = useMemo(() => getSections(t), [t]);
	const organizationsRef = useRef(null);
	const [openOrganizationsPopover, setOpenOrganizationsPopover] =
		useState(false);

	const handlePathChange = () => {
		if (!router.isReady) {
			return;
		}

		if (open) {
			onClose?.();
		}
	};

	useEffect(
		handlePathChange,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[router.isReady, router.asPath]
	);

	const handleCloseOrganizationsPopover = () => {
		setOpenOrganizationsPopover(false);
	};

	const content = (
		<>
			<Scrollbar
				sx={{
					height: '100%',
					'& .simplebar-content': {
						height: '100%',
					},
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
					}}
				>
					<div>
						<Box sx={{px: 2, pt: 3}}>
							<Box
								sx={{
									backgroundColor:
										'rgba(255, 255, 255, 0.04)',
									cursor: 'pointer',
									px: 3,
									py: '11px',
									borderRadius: 1,
								}}
							>
								<Typography color="inherit" variant="subtitle1">
									Grands
								</Typography>
							</Box>
						</Box>
					</div>
					<Divider
						sx={{
							borderColor: '#2D3748',
							my: 3,
						}}
					/>
					<Box sx={{flexGrow: 1}}>
						{sections.map((section, index) => (
							<DashboardSidebarSection
								key={index}
								path={router.asPath}
								sx={{
									mt: 2,
									'& + &': {
										mt: 2,
									},
								}}
								{...section}
							/>
						))}
						<DashboardSidebarLogout 
							active={false}
							depth={0}
							icon={<LogoutIcon fontSize="small" />}
							title={t('ログアウト')}
						/>
					</Box>
				</Box>
			</Scrollbar>
			<OrganizationPopover
				anchorEl={organizationsRef.current}
				onClose={handleCloseOrganizationsPopover}
				open={openOrganizationsPopover}
			/>
		</>
	);

	return (
		<Drawer
			anchor="left"
			onClose={onClose}
			open={open}
			PaperProps={{
				sx: {
					backgroundColor: 'neutral.900',
					color: '#FFFFFF',
					width: 280,
				},
			}}
			sx={{zIndex: (theme) => theme.zIndex.appBar + 100}}
			variant="temporary"
		>
			{content}
		</Drawer>
	);
};

DashboardSidebar.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool,
};
