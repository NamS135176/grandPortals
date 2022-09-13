import {useCallback, useEffect, useMemo, useState} from 'react';
import Head from 'next/head';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardActions,
	Container,
	Divider,
	Grid,
	Typography,
	TextField,
	InputLabel,
	Select,
	FormControl,
	MenuItem,
	Skeleton,
	FormHelperText,
} from '@mui/material';
import {DashboardLayout} from '../dashboard/dashboard-layout';
import {BukkenRelatedDocsListTable} from '../bukken/bukken-related-docs-list-table';
import {BukkenHistoryListTable} from '../bukken/bukken-history-list-table';
import {ManagementList} from '../management-menu';
import {ArrowLeft as ArrowLeftIcon} from '../../icons/arrow-left';
import {ArrowRight as ArrowRightIcon} from '../../icons/arrow-right';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {HistoryDialog} from '../history/history-dialog';
import {useRouter} from 'next/router';
import {FileUpload} from '../widgets/file-upload';
import {AddDocumentDialog} from '../bukken/add-document-dialog';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import {
	getKindCaption,
	getOtherObjectListUrl,
	getOtherObjectSelectKind,
} from '../../utils/bukken';
import {gtm} from '../../lib/gtm';
import {useOtherObjectDetail} from '../../hooks/use-other-object-detail';
import {useBukkenDefault} from '../../hooks/use-bukken-default';
import {useAuth} from '../../hooks/use-auth';
import {UserGroup} from '../../utils/global-data';

const OtherObjectNormalDetails = ({id, otherObjectKind}) => {
	const {user} = useAuth();
	const router = useRouter();
	const {
		loading,
		otherObject,
		coverImageUrl,
		histories: bukkenHistory,
		documents: bukkenDocs,
		uploadingCoverImage,
		uploadOtherObjectCover,
		deleteHistory,
		deleteDocument,
		updateOtherObjectFieldList,
		reloadHistory,
		reloadDocument,
	} = useOtherObjectDetail(id, otherObjectKind);
	const {bukken} = useBukkenDefault();

	const formik = useFormik({
		initialValues: {
			kind: '',
			name: '',
			location: null,
			maker: null,
			number: null,
			height: null,
			width: null,
			depth: null,
			date: null,
			quantity: null,
			remarks: null,
			last_construction_date: null,
		},
		validationSchema: Yup.object({
			kind: Yup.string().required('種別は必須です。'),
			name: Yup.string().required('名称は必須です。'),
		}),
		onSubmit: async (values, helpers) => {
			// console.log("formik... onSubmit", { values, helpers });
			const errors = await helpers.validateForm();
			console.log('formik... onSubmit', {
				values,
				helpers,
				errors,
				errorsEmpty: R.isEmpty(errors),
			});
			if (R.isEmpty(errors)) {
				handleSubmit(values);
			}
		},
	});

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	useEffect(() => {
		if (!otherObject?.field_list) return;
		console.log('otherObject... ', {otherObject});
		const {
			kind,
			name,
			location,
			maker,
			number,
			height,
			width,
			depth,
			date,
			quantity,
			remarks,
			last_construction_date,
		} = otherObject.field_list;
		formik.setValues({
			kind,
			name,
			location,
			maker,
			number,
			height,
			width,
			depth,
			date,
			quantity,
			remarks,
			last_construction_date,
		});
	}, [otherObject]);

	const handleSubmit = (values) => {
		console.log('handleSubmit... ', {values});
		//update other object for update field_list
		const fieldList = otherObject?.field_list ?? {};
		fieldList['kind'] = values.kind;
		fieldList['name'] = values.name;
		fieldList['location'] = values.location;
		fieldList['maker'] = values.maker;
		fieldList['number'] = values.number;
		fieldList['height'] = values.height;
		fieldList['width'] = values.width;
		fieldList['depth'] = values.depth;
		fieldList['date'] = values.date;
		fieldList['quantity'] = values.quantity;
		fieldList['remarks'] = values.remarks;
		fieldList['last_construction_date'] = values.last_construction_date;

		console.log('handleSubmit... ', {fieldList});
		updateOtherObjectFieldList(fieldList);
	};

	// dialog
	const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
	const handleOpenHistoryDialog = () => {
		setOpenHistoryDialog(true);
	};
	const handleCloseHistoryDialog = () => {
		setOpenHistoryDialog(false);
	};

	const [openDocumentDialog, setOpenDocumentDialog] = useState(false);
	const handleOpenDocumentDialog = () => {
		setOpenDocumentDialog(true);
	};
	const handleCloseDocumentDialog = () => {
		setOpenDocumentDialog(false);
	};
	// end dialog

	const handleDateChange = (date) => {
		formik.setFieldValue('date', date);
	};

	const kindCaption = useMemo(() => {
		return getKindCaption(otherObjectKind);
	}, [otherObjectKind]);

	const backUrl = useMemo(() => {
		return getOtherObjectListUrl(otherObjectKind);
	}, [otherObjectKind]);

	const otherObjectSelect = useMemo(() => {
		return getOtherObjectSelectKind(otherObjectKind);
	}, [otherObjectKind]);

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜{kindCaption}情報</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: {xs: 4, md: 8},
				}}
			>
				<Container maxWidth="xl">
					<Box
						sx={{
							mb: 4,
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<Typography variant="subtitle2">
							お問い合わせ：050-5443-5974
						</Typography>
					</Box>
					<Card>
						<CardContent>
							<ManagementList />
						</CardContent>
					</Card>
					<Card sx={{mt: 4}}>
						<CardContent>
							<Box
								sx={{
									mb: 4,
									display: 'flex',
									justifyContent: 'flex-end',
								}}
							>
								<Typography variant="subtitle2">
									{bukken
										? `物件番号：${bukken.bukken_no}`
										: ''}
								</Typography>
							</Box>
							<Box sx={{mb: 4}}>
								<Grid
									container
									justifyContent="space-between"
									spacing={3}
								>
									<Grid item>
										<Typography variant="h6" mb={3}>
											{kindCaption}情報（既製品）
										</Typography>
									</Grid>
									<Grid item>
										<Button
											variant="contained"
											component="label"
										>
											画像追加
											<FileUpload
												accept={'image/*'}
												onChange={
													uploadOtherObjectCover
												}
												prefix="image"
											>
												<></>
											</FileUpload>
										</Button>
									</Grid>
								</Grid>
							</Box>
							{uploadingCoverImage ? (
								<Skeleton
									animation="wave"
									variant="rectangular"
									width={'100%'}
									height={450}
									sx={{marginTop: '24px'}}
								/>
							) : (
								<Box
									sx={{
										backgroundImage: `url(${coverImageUrl})`,
										backgroundColor: '#D0D0D0',
										backgroundPosition: 'center',
										backgroundSize: 'cover',
										borderRadius: 1,
										height: 450,
										mt: 3,
									}}
								/>
							)}
							<Grid container spacing={3} mt={3}>
								<Grid item md={8} xs={12}>
									<FormControl
										fullWidth
										error={Boolean(
											formik.touched.kind &&
												formik.errors.kind
										)}
									>
										<InputLabel
											id="select-lable-kind"
											required
										>
											種別
										</InputLabel>
										<Select
											labelId="select-kind"
											id="select-kind"
											name="kind"
											label="種別"
											required
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.kind}
										>
											{otherObjectSelect.map(
												(item, idx) => (
													<MenuItem
														value={item}
														key={item}
													>
														{item}
													</MenuItem>
												)
											)}
										</Select>
										<FormHelperText>
											{formik.touched.kind &&
												formik.errors.kind}
										</FormHelperText>
									</FormControl>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										label="名称"
										name="name"
										InputLabelProps={{shrink: true}}
										error={Boolean(
											formik.touched.name &&
												formik.errors.name
										)}
										helperText={
											formik.touched.name &&
											formik.errors.name
										}
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.name}
										required
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										label="設置場所"
										name="location"
										onChange={formik.handleChange}
										value={formik.values.location}
										InputLabelProps={{shrink: true}}
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										label="メーカー"
										name="maker"
										onChange={formik.handleChange}
										value={formik.values.maker}
										InputLabelProps={{shrink: true}}
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										label="型番"
										name="number"
										onChange={formik.handleChange}
										value={formik.values.number}
										InputLabelProps={{shrink: true}}
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
										}}
									>
										<TextField
											type="number"
											label="高さ(cm)"
											name="height"
											onChange={formik.handleChange}
											value={formik.values.height}
											InputLabelProps={{shrink: true}}
										/>
										<TextField
											type="number"
											label="幅(cm)"
											name="width"
											onChange={formik.handleChange}
											value={formik.values.width}
											InputLabelProps={{shrink: true}}
										/>
										<TextField
											type="number"
											label="奥行(cm)"
											name="depth"
											onChange={formik.handleChange}
											value={formik.values.depth}
											InputLabelProps={{shrink: true}}
										/>
									</Box>
								</Grid>
								<Grid item md={8} xs={12}>
									<DesktopDatePicker
										label="購入日"
										inputFormat="yyyy/MM/dd"
										value={formik.values.date}
										onChange={handleDateChange}
										renderInput={(inputProps) => (
											<TextField {...inputProps} />
										)}
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										type="number"
										label="個数"
										name="quantity"
										onChange={formik.handleChange}
										value={formik.values.quantity}
										InputLabelProps={{shrink: true}}
									/>
								</Grid>
								<Grid item md={8} xs={12}>
									<TextField
										fullWidth
										multiline
										minRows={4}
										label="備考"
										name="remarks"
										onChange={formik.handleChange}
										value={formik.values.remarks}
										InputLabelProps={{shrink: true}}
									/>
								</Grid>
								{user.group === UserGroup.support && (
									<Grid item md={8} xs={12}>
										<DesktopDatePicker
											label="最終施工日"
											inputFormat="yyyy/MM/dd"
											value={
												formik.values
													.last_construction_date
											}
											onChange={(date) =>
												formik.setFieldValue(
													'last_construction_date',
													date
												)
											}
											renderInput={(inputProps) => (
												<TextField {...inputProps} />
											)}
										/>
									</Grid>
								)}
								<Box
									sx={{
										justifyContent: 'flex-end',
										width: '100%',
										display: 'flex',
										mt: 2,
									}}
								>
									<Button
										endIcon={
											<ArrowLeftIcon fontSize="small" />
										}
										onClick={() => router.push(backUrl)}
										sx={{m: 1}}
										variant="outlined"
									>
										戻る
									</Button>
									<Button
										sx={{m: 1}}
										variant="contained"
										disabled={loading}
										onClick={formik.handleSubmit}
									>
										登録
									</Button>
								</Box>
							</Grid>
						</CardContent>
					</Card>
					<Card sx={{mt: 4}}>
						<CardContent>
							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'space-between',
									my: 3,
								}}
							>
								<Typography variant="h6">関連資料</Typography>
								<Button
									variant="contained"
									onClick={handleOpenDocumentDialog}
									disabled={!otherObject?.bukken}
								>
									資料追加
								</Button>
								<AddDocumentDialog
									onClose={handleCloseDocumentDialog}
									open={openDocumentDialog}
									mode="edit"
									bukken={otherObject?.bukken}
									loadData={() => reloadDocument(otherObject)}
									otherObjectId={otherObject?.id}
									objectKind={otherObject?.object_kind}
								/>
							</Box>
							<BukkenRelatedDocsListTable
								bukken={otherObject?.bukken}
								bukkenDocs={bukkenDocs}
								deleteDocument={deleteDocument}
							/>
						</CardContent>
					</Card>
					<Card sx={{mt: 4}}>
						<CardContent>
							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'space-between',
									my: 3,
								}}
							>
								<Typography variant="h6">最新履歴</Typography>
								<Button
									variant="contained"
									onClick={handleOpenHistoryDialog}
									disabled={!otherObject?.bukken}
								>
									履歴追加
								</Button>
								<HistoryDialog
									onClose={handleCloseHistoryDialog}
									open={openHistoryDialog}
									mode="edit"
									bukken={otherObject?.bukken}
									loadData={() => reloadHistory(otherObject)}
									otherObjectId={otherObject?.id}
									objectKind={otherObject?.object_kind}
								/>
							</Box>
							<BukkenHistoryListTable
								bukken={otherObject?.bukken}
								bukkenHistory={bukkenHistory}
								deleteHistory={deleteHistory}
							/>
						</CardContent>
						<CardActions>
							<Button
								href="/history"
								endIcon={<ArrowRightIcon fontSize="small" />}
							>
								全ての履歴を見る
							</Button>
						</CardActions>
					</Card>
				</Container>
			</Box>
		</>
	);
};
OtherObjectNormalDetails.getLayout = (page) => (
	<DashboardLayout>{page}</DashboardLayout>
);

OtherObjectNormalDetails.propTypes = {
	id: PropTypes.string,
	otherObjectKind: PropTypes.string,
};

export default OtherObjectNormalDetails;
