import {useCallback, useEffect, useState} from "react";
import Head from "next/head";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import {DashboardLayout} from "../../../components/dashboard/dashboard-layout";
import {gtm} from "../../../lib/gtm";
import {ManagementList} from "../../../components/management-menu";
import {ArrowLeft as ArrowLeftIcon} from "../../../icons/arrow-left";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import {OtherObjectFieldKind} from "../../../utils/bukken";
import {InteriorKind} from "../../../utils/global-data";
import {useCreateInterior} from "../../../hooks/use-create-interior";
import {useBukkenDefault} from "../../../hooks/use-bukken-default";
import { FileUpload } from "../../../components/widgets/file-upload";

const CreateInterior = (fieldKind = OtherObjectFieldKind.ReadyMadeProduct) => {
    const {loading, createInterior} = useCreateInterior();
    const {bukken} = useBukkenDefault();

    const [file, setFile] = useState();
    const [coverImage, setCoverImage] = useState();

    const [form, setForm] = useState({
        kind: null,
        name: null,
        location: null,
        maker: null,
        number: null,
        height: null,
        width: null,
        depth: null,
        date: null,
        quantity: null,
        remarks: null,
    });

    const isFormEmpty = () =>
        !form.kind ||
        !form.name ||
        !form.location ||
        !form.maker ||
        !form.number ||
        !form.height ||
        !form.width ||
        !form.depth ||
        !form.date ||
        !form.quantity ||
        !form.remarks;

    useEffect(() => {
        gtm.push({event: "page_view"});
    }, []);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleDateChange = (date) => {
        setForm({...form, date: date});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createInterior(bukken, fieldKind, form, file);
    };

    const handleChangeFile = (file) => {
        setFile(file);
        setCoverImage(URL.createObjectURL(file));
    };

    return (
        <>
            <Head>
                <title>grandsポータルサイト｜建具・インテリア情報</title>
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
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Typography variant="subtitle2">
                            お問い合わせ：0463-79-5564
                        </Typography>
                    </Box>
                    <Card>
                        <CardContent>
                            <ManagementList />
                            <Divider
                                sx={{
                                    mb: 3,
                                    mt: 3,
                                }}
                            />
                            <Box
                                sx={{
                                    mb: 4,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Typography variant="subtitle2">
                                    物件番号：HONR000001
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
                                            建具・インテリア（既製品）
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            disabled={loading}
                                        >
                                            画像追加
                                            <FileUpload
                                                accept={"image/*"}
                                                onChange={handleChangeFile}
                                                prefix="image"
                                            >
                                                <></>
                                            </FileUpload>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box
                                sx={{
                                    backgroundImage: `url(${coverImage})`,
									backgroundColor: '#D0D0D0',
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    borderRadius: 1,
                                    height: 450,
                                    mt: 3,
                                }}
                            />
                            <Grid container spacing={3} mt={3}>
                                <Grid item md={8} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="select-lable-kind">
                                            種別
                                        </InputLabel>
                                        <Select
                                            labelId="select-kind"
                                            id="select-kind"
                                            name="kind"
                                            value={form.kind}
                                            label="種別"
                                            onChange={handleChange}
                                        >
                                            {InteriorKind.map((item, idx) => (
                                                <MenuItem
                                                    value={item}
                                                    key={item}
                                                >
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="品名"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="設置場所"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="メーカー"
                                        name="maker"
                                        value={form.maker}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="型番"
                                        name="number"
                                        value={form.number}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <TextField
                                            type="number"
                                            label="高さ"
                                            name="height"
                                            value={form.height}
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            type="number"
                                            label="幅"
                                            name="width"
                                            value={form.width}
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            type="number"
                                            label="奥行"
                                            name="depth"
                                            value={form.depth}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <MobileDatePicker
                                        label="購入日"
                                        inputFormat="MM/dd/yyyy"
                                        value={form.date}
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
                                        value={form.quantity}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={4}
                                        label="備考"
                                        name="remarks"
                                        value={form.remarks}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Box
                        sx={{
                            justifyContent: "flex-end",
                            width: "100%",
                            display: "flex",
                            mt: 2,
                        }}
                    >
                        <Button
                            endIcon={<ArrowLeftIcon fontSize="small" />}
                            onClick={() => router.push("/interior/list")}
                            sx={{m: 1}}
                            variant="outlined"
                        >
                            戻る
                        </Button>
                        <Button
                            sx={{m: 1}}
                            variant="contained"
                            disabled={loading || isFormEmpty()}
                            onClick={handleSubmit}
                        >
                            登録
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};
CreateInterior.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateInterior;
