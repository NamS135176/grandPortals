import {useCallback, useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	TextField,
	Grid,
	Typography,
	Checkbox,
	FormControlLabel,
	Link,
	CircularProgress,
} from '@mui/material';
import {DashboardLayout} from '../../../../components/dashboard/dashboard-layout';
import {gtm} from '../../../../lib/gtm';
import {ArrowLeft as ArrowLeftIcon} from '../../../../icons/arrow-left';
import {AuthGuard} from '../../../../components/authentication/auth-guard';
import {Upload as UploadIcon} from '../../../../icons/upload';
import {FileDropzone} from '../../../../components/file-dropzone';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import toast from 'react-hot-toast';
import {useInformation} from 'hooks/use-information';
import moment from 'moment';
import {useRouter} from 'next/router';
import {useInformationFile} from 'hooks/use-information-file';
import * as R from 'ramda';
import Papa from 'papaparse';
import {useImportCSVInformation} from 'hooks/use-import-csv-information';
import {LoadingButton, MobileDateTimePicker} from '@mui/lab';
import {confirm} from 'components/dialog/confirm-dialog';
import {useDropzone} from 'react-dropzone';
import {UserGroup} from 'utils/global-data';
import {useAuth} from 'hooks/use-auth';
import {isEmailValid} from 'utils/validator';

const CsInformationDetails = () => {
	const {user} = useAuth();
	const router = useRouter();
	const {id} = router.query;
	const {updateInformationListSend, loading: importCSVLoading} =
		useImportCSVInformation();
	const {loading, information, updateInformation} = useInformation(id);
	const {getFilesFromS3, deleteFileFromS3, deleteFilesFromS3, uploadFiles} =
		useInformationFile();

	const [listInformationSend, setListInformationSend] = useState([]);
	const [files, setFiles] = useState([]);
	const canEdit = information?.processed_date
		? false
		: true
	const draftFlag = useRef(0);

	// const canEdit = false;

	useEffect(() => {
		if (user?.group != UserGroup.support) {
			router.push('/404');
		}
	}, [user]);

	useEffect(() => {
		//update value to formik
		if (!information) return;
		formik.setValues({
			subject: information.subject ?? '',
			content: information.content ?? '',
			date: information.scheduled_delivery_date
				? moment(information.scheduled_delivery_date).toDate()
				: null,
			importantInfoFlag: information.important_info_flag,
			submit: null,
		});
		setListInformationSend(information.informaionListSends?.items ?? []);
	}, [information]);

	useEffect(async () => {
		if (!id) return;
		const files = await getFilesFromS3(id);
		if (!R.isNil(files) && !R.isEmpty(files)) {
			setFiles(files);
		}
	}, [id]);

	const handleDrop = (newFiles) => {
		// setFiles((prevFiles) => [...prevFiles, ...newFiles]);
		const allFiles = [...files, ...newFiles];
		//check file size max 30M totally
		var fileSize = 0;
		allFiles.forEach((file) => (fileSize += file.size));
		const mbSize = fileSize / 1024 / 1024;
		console.log('handleDrop...', {allFiles, fileSize, mbSize});
		if (mbSize >= 30) {
			toast.error('?????????????????????????????????????????????30M?????????????????????');
			return;
		}
		setFiles(allFiles);
	};

	const handleRemove = async (file) => {
		setFiles((prevFiles) =>
			prevFiles.filter((_file) => _file.path !== file.path)
		);
		await deleteFileFromS3(file);
	};

	const handleRemoveAll = async () => {
		setFiles([]);
		await deleteFilesFromS3(files);
	};

	const checkMaxSizeFiles = () => {
		//check file size max 30M totally
		var fileSize = 0;
		files.forEach((file) => (fileSize += file.size));
		const mbSize = fileSize / 1024 / 1024;
		if (mbSize >= 30) {
			toast.error('?????????????????????????????????????????????30M?????????????????????');
			return false;
		}
		return true;
	};

	const saveData = async (draftFlag = 0) => {
		console.log(formik.values);
		await updateInformation({...formik.values, id, draftFlag});
		//upload s3 file if
		const uploads = files.filter((file) => !file.uploaded);
		if (!R.isEmpty(uploads)) {
			await uploadFiles(uploads, id);
		}
		toast.success('?????????????????????');
		router.push('/cs/information/list');
	};

	const onDrop = useCallback(
		(acceptedFiles) => {
			acceptedFiles.forEach((file) => {
				Papa.parse(file, {
					header: true,
					skipEmptyLines: true,
					transformHeader: (header) => {
						console.log('transformHeader:', header);
						return 'email';
					},
					error: (errors) => {
						console.log('error:', errors);
					},
					complete: async (results) => {
						console.log('Finished:', results.data);
						const csvData = results.data;
						if (isCSVFormatError(csvData)) {
							return;
						}
						const accept = await confirm(
							'??????????????????????????????????????????????????????????????????????????????'
						);
						if (!accept) return;

						const items = await updateInformationListSend({
							informationId: id,
							data: csvData,
						});
						setListInformationSend(items);
						if (!R.isNil(items) && !R.isEmpty(items)) {
							toast.success('????????????????????????????????????????????????');
						}
					},
				});
			});
		},
		[id]
	);

	const isCSVFormatError = useCallback((csvData) => {
		if (R.isEmpty(csvData)) {
			//only header
			toast.error('????????????????????????????????????????????????');
			return true;
		}
		//check format email
		var errors = [];
		csvData.forEach((row, idx) => {
			if (!isEmailValid(row.email)) {
				errors.push(
					`${idx + 1}???????????????????????????????????????????????????????????????`
				);
				console.log(`${row.email} not valid`);
			}
		});
		if (!R.isEmpty(errors)) {
			toast.error(errors.join('\n'));
			return true;
		}
		return false;
	}, []);

	const {getRootProps, getInputProps} = useDropzone({
		onDrop,
		accept: {
			'text/csv': ['.csv'],
		},
	});

	const formik = useFormik({
		initialValues: {
			subject: '',
			content: '',
			files: files,
			date: null,
			importantInfoFlag: false,
			submit: null,
		},
		validationSchema: Yup.object({
			subject: Yup.string(),
			content: Yup.string(),
			files: Yup.array(),
			date: Yup.date().nullable().default(null),
			importantInfoFlag: Yup.bool(),
		}),
		onSubmit: async (values, helpers) => {
			try {
				await saveData(draftFlag.current);
				helpers.setStatus({success: true});
				helpers.setSubmitting(false);
			} catch (err) {
				console.error(err);
				toast.error('Something went wrong!');
				helpers.setStatus({success: false});
				helpers.setErrors({submit: err.message});
				helpers.setSubmitting(false);
			}
		},
	});

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	const handleClickSaveDraft = async () => {
		var validate = true;
		if (!checkMaxSizeFiles()) {
			validate = false;
		}
		if (formik.values.date) {
			//show confirm
			const accept = await confirm(
				'?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
			);
			if (!accept) return;
		}
		if (validate) {
			draftFlag.current = 1;
			formik.handleSubmit();
		}
	};

	const handleClickSave = () => {
		console.log('formik', formik);
		var validate = true;
		if (R.isEmpty(listInformationSend)) {
			toast.error('?????????????????????????????????????????????');
			validate = false;
		}
		if (moment(formik.values.date).isBefore(moment())) {
			toast.error('???????????????????????????????????????????????????????????????????????????');
			validate = false;
		}
		if (!checkMaxSizeFiles()) {
			validate = false;
		}
		if (validate) {
			draftFlag.current = 0;
			formik.handleSubmit();
		}
	};

	console.log('formik', formik);

	return (
		<>
			<Head>
				<title>grands?????????????????????????????????????????????CS???</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth="xl">
					<Card>
						<CardContent>
							<Box sx={{mb: 4}}>
								<Typography variant="h6" mb={3}>
									??????????????????
								</Typography>
								<Grid container spacing={3} mt={3}>
									<Grid item md={8} xs={12}>
										<TextField
											fullWidth
											label="??????"
											name="subject"
											required
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											error={Boolean(
												formik.touched.subject &&
													formik.errors.subject
											)}
											helperText={
												formik.touched.subject &&
												formik.errors.subject
											}
											value={formik.values.subject}
											disabled={!canEdit}
										/>
									</Grid>
									<Grid item md={8} xs={12}>
										<TextField
											fullWidth
											multiline
											minRows={4}
											label="??????"
											name="content"
											required
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											error={Boolean(
												formik.touched.content &&
													formik.errors.content
											)}
											helperText={
												formik.touched.content &&
												formik.errors.content
											}
											value={formik.values.content}
											disabled={!canEdit}
										/>
									</Grid>
									<Grid item md={8} xs={12}>
										<Typography
											variant="body2"
											sx={{mb: 1}}
										>
											??????????????????
										</Typography>
										<FileDropzone
											accept={{
												'application/pdf': ['.pdf'],
												'image/png': ['.png'],
												'image/peg': ['.peg'],
												'image/jpeg': ['.jpeg'],
											}}
											files={files}
											onDrop={handleDrop}
											onRemove={handleRemove}
											onRemoveAll={handleRemoveAll}
											disabled={!canEdit}
										/>
									</Grid>
									<Grid item md={8} xs={12}>
										<MobileDateTimePicker
											label="???????????????"
											inputFormat="yyyy/MM/dd HH:mm"
											minDate={moment().toDate()}
											minutesStep={5}
											value={formik.values.date}
											onChange={(date) =>
												formik.setFieldValue(
													'date',
													date
												)
											}
											renderInput={(inputProps) => (
												<TextField {...inputProps} />
											)}
											disabled={!canEdit}
										/>
									</Grid>
								</Grid>
								<Box sx={{mt: 2}}>
									<FormControlLabel
										control={
											<Checkbox
												name="emailAlerts"
												checked={
													formik.values
														.importantInfoFlag
												}
												onChange={() =>
													formik.setFieldValue(
														'importantInfoFlag',
														!formik.values
															.importantInfoFlag
													)
												}
												disabled={!canEdit}
											/>
										}
										label="???????????????????????????????????????????????????????????????????????????"
									/>
								</Box>
								<Box
									sx={{
										display: 'flex',
										flexDirection: {
											xs: 'column',
											md: 'row',
										},
										alignItems: {
											xs: 'start',
											md: 'center',
										},
									}}
								>
									<Typography variant="subtitle1">
										??????????????????
										<LoadingButton
											loading={importCSVLoading}
											loadingIndicator={
												<CircularProgress
													color="primary"
													size={30}
												/>
											}
											startIcon={
												<UploadIcon fontSize="small" />
											}
											sx={{m: 1}}
											{...getRootProps()}
											disabled={!canEdit}
										>
											<input {...getInputProps()} />
											Import
										</LoadingButton>
									</Typography>
									{!importCSVLoading &&
										listInformationSend &&
										listInformationSend.length > 0 && (
											<Typography variant="subtitle1">
												????????????
												<NextLink
													href={`/cs/destination/${id}`}
													passHref
												>
													<Link variant="subtitle2">
														{
															listInformationSend.length
														}
														???
													</Link>
												</NextLink>
											</Typography>
										)}
								</Box>
							</Box>
						</CardContent>
					</Card>
					<Box
						sx={{
							mx: -1,
							mb: -1,
							mt: 3,
						}}
					>
						<Grid container spacing={3}>
							<Grid item>
								<NextLink href="/cs/information/list" passHref>
									<Button
										endIcon={
											<ArrowLeftIcon fontSize="small" />
										}
										variant="outlined"
									>
										??????
									</Button>
								</NextLink>
							</Grid>
							<Grid item sx={{m: -1}}>
								<Button
									sx={{m: 1}}
									variant="contained"
									color="success"
									onClick={handleClickSaveDraft}
									disabled={
										!canEdit ||
										formik.isSubmitting ||
										importCSVLoading
									}
								>
									???????????????
								</Button>
							</Grid>
							<Grid item sx={{m: -1}}>
								<Button
									sx={{m: 1}}
									variant="contained"
									type="submit"
									onClick={handleClickSave}
									disabled={
										!canEdit ||
										formik.isSubmitting ||
										importCSVLoading
									}
								>
									??????
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</Box>
		</>
	);
};
CsInformationDetails.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);

export default CsInformationDetails;
