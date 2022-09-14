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
import {DashboardLayout} from 'components/dashboard/dashboard-layout';
import {gtm} from 'lib/gtm';
import {ArrowLeft as ArrowLeftIcon} from 'icons/arrow-left';
import {AuthGuard} from 'components/authentication/auth-guard';
import {FileDropzone} from 'components/file-dropzone';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import toast from 'react-hot-toast';
import * as R from 'ramda';
import {API} from 'aws-amplify';
import {updateInformation} from 'graphql/mutations';
import {useRouter} from 'next/router';
import Papa from 'papaparse';
import {useImportCSVInformation} from 'hooks/use-import-csv-information';
import {LoadingButton, MobileDateTimePicker} from '@mui/lab';
import {confirm} from 'components/dialog/confirm-dialog';
import {useDropzone} from 'react-dropzone';
import {Upload as UploadIcon} from 'icons/upload';
import {useInformationFile} from 'hooks/use-information-file';
import {useAuth} from 'hooks/use-auth';
import {UserGroup} from 'utils/global-data';
import {isEmailValid} from 'utils/validator';
import moment from 'moment';

const CsInformationCreate = () => {
	const {user} = useAuth();
	const router = useRouter();
	const {createInformation, loading: importingCSV} =
		useImportCSVInformation();
	const {uploadFiles} = useInformationFile();

	const [createdInformationId, setCreatedInformationId] = useState();
	const [listInformationSend, setListInformationSend] = useState([]);
	const [files, setFiles] = useState([]);
	const draftFlag = useRef(0);

	useEffect(() => {
		if (user.group != UserGroup.support) {
			router.push('/404');
		}
	}, [user]);

	const handleDrop = (newFiles) => {
		// setFiles((prevFiles) => [...prevFiles, ...newFiles]);
		const allFiles = [...files, ...newFiles];
		//check file size max 30M totally
		var fileSize = 0;
		allFiles.forEach((file) => (fileSize += file.size));
		const mbSize = fileSize / 1024 / 1024;
		console.log('handleDrop...', {allFiles, fileSize, mbSize});
		if (mbSize >= 30) {
			toast.error('添付可能なファイルサイズは合計30M以内までです。');
			return;
		}
		setFiles(allFiles);
	};

	const handleRemove = (file) => {
		setFiles((prevFiles) =>
			prevFiles.filter((_file) => _file.path !== file.path)
		);
	};

	const handleRemoveAll = () => {
		setFiles([]);
	};

	const checkMaxSizeFiles = () => {
		//check file size max 30M totally
		var fileSize = 0;
		files.forEach((file) => (fileSize += file.size));
		const mbSize = fileSize / 1024 / 1024;
		if (mbSize >= 30) {
			toast.error('添付可能なファイルサイズは合計30M以内までです。');
			return false;
		}
		return true;
	};

	const onDrop = useCallback((acceptedFiles) => {
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
					console.log('Finished:', results);
					const csvData = results.data;
					if (isCSVFormatError(csvData)) {
						return;
					}

					const accept = await confirm(
						'選択された送信先情報でデータを登録または更新します。'
					);
					if (!accept) return;

					const {data, information} = await createInformation({
						data: csvData,
					});

					console.log('CsInformationCreate... createInformation: ', {
						data,
						information,
					});
					setListInformationSend(data);
					setCreatedInformationId(information?.id);
					if (information) {
						toast.success('「お知らせ情報を登録しました。」');
					}
				},
			});
		});
	}, []);

	const isCSVFormatError = useCallback((csvData) => {
		if (R.isEmpty(csvData)) {
			//only header
			toast.error('登録対象のデータが存在しません。');
			return true;
		}
		//check format email
		var errors = [];
        // console.log(csvData);
		csvData.forEach((row, idx) => {
			if (!isEmailValid(row.email)) {
				errors.push(
					`${idx + 1}行目：メールアドレス形式に誤りがあります。`
				);
                console.log(idx + " . invalid");
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
				toast.error(err?.message ?? 'Something went wrong!');
				helpers.setStatus({success: false});
				helpers.setErrors({submit: err.message});
				helpers.setSubmitting(false);
			}
		},
	});

	useEffect(() => {
		gtm.push({event: 'page_view'});
	}, []);

	const saveData = async (draftFlag = 0) => {
		console.log('saveData... ', {draftFlag, values: formik.values, createdInformationId});
		if (draftFlag == 1 && formik.values.date) {
			//show confirm
			const accept = await confirm(
				'下書き保存しますか？（下書き保存の場合、通知されません。配信予定日時に通知または即時通知する場合は送信ボタンをクリックしてください。）'
			);
			if (!accept) return;
		}
		try {
			var informationId = createdInformationId;
            
			if (!informationId) {
				//create new information
				const {information} = await createInformation({
					subject: formik.values.subject,
					content: formik.values.content,
					draft_flag: draftFlag,
					important_info_flag: formik.values.importantInfoFlag
						? 1
						: 0,
					scheduled_delivery_date: formik.values.date,
				});
				setCreatedInformationId(information?.id);
                informationId = information?.id
			} else {
				//update exist
				await API.graphql({
					query: updateInformation,
					variables: {
						input: {
							id: informationId,
							subject: formik.values.subject,
							content: formik.values.content,
							draft_flag: draftFlag,
							important_info_flag: formik.values.importantInfoFlag
								? 1
								: 0,
							scheduled_delivery_date: formik.values.date,
							sort: 1, //always 1
						},
					},
				});
			}

			//upload s3 file
			if (!R.isEmpty(files)) {
				await uploadFiles(files, informationId);
			}
			toast.success('保存しました。');
			router.push('/cs/information/list');
		} catch (e) {
			toast.error(e.message);
		}
	};

	const handleClickSaveDraft = async () => {
		var validate = true;
		if (!checkMaxSizeFiles()) {
			validate = false;
		}
        console.log(formik.values.date);
		if (formik.values.date) {
			//show confirm
			const accept = await confirm(
				'下書き保存しますか？（下書き保存の場合、通知されません。配信予定日時に通知または即時通知する場合は送信ボタンをクリックしてください。）'
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
		if (R.isEmpty(listInformationSend) || R.isNil(createdInformationId)) {
			toast.error('送信対象取込を実施してください');
			validate = false;
		}
		if (moment(formik.values.date).isBefore(moment())) {
			toast.error('配信予定日時には現在より後の日時を指定してください');
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

	return (
		<>
			<Head>
				<title>grandsポータルサイト｜お知らせ詳細（CS）</title>
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
									お知らせ詳細
								</Typography>
								<Grid container spacing={3} mt={3}>
									<Grid item md={8} xs={12}>
										<TextField
											fullWidth
											label="件名"
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
										/>
									</Grid>
									<Grid item md={8} xs={12}>
										<TextField
											fullWidth
											multiline
											minRows={4}
											label="本文"
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
										/>
									</Grid>
									<Grid item md={8} xs={12}>
										<Typography
											variant="body2"
											sx={{mb: 1}}
										>
											添付ファイル
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
										/>
									</Grid>
									<Grid item md={8} xs={12}>
										<MobileDateTimePicker
											label="配達予定日"
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
											/>
										}
										label="重要なお知らせのため停止したユーザーにもメール送信"
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
										送信対象取込
										<LoadingButton
											loading={importingCSV}
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
										>
											<input {...getInputProps()} />
											Import
										</LoadingButton>
									</Typography>
									{listInformationSend &&
										listInformationSend.length > 0 && (
											<Typography variant="subtitle1">
												送信先：
												<NextLink
													href={`/cs/destination/${createdInformationId}`}
													passHref
												>
													<Link variant="subtitle2">
														{
															listInformationSend.length
														}
														件
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
										戻る
									</Button>
								</NextLink>
							</Grid>
							<Grid item sx={{m: -1}}>
								<Button
									sx={{m: 1}}
									variant="contained"
									color="success"
									disabled={
										formik.isSubmitting || importingCSV
									}
									onClick={handleClickSaveDraft}
								>
									下書き保存
								</Button>
							</Grid>
							<Grid item sx={{m: -1}}>
								<Button
									sx={{m: 1}}
									variant="contained"
									type="submit"
									disabled={
										formik.isSubmitting || importingCSV
									}
									onClick={handleClickSave}
								>
									送信
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</Box>
		</>
	);
};
CsInformationCreate.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);

export default CsInformationCreate;
