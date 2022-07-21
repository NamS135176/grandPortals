import {useState} from "react";
import PropTypes from "prop-types";
import {
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    IconButton,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import {X as XIcon} from "../../icons/x";
import {FileUpload} from "../widgets/file-upload";
import {getBukkenS3FileName} from "../../utils/bukken";
import {createDocument} from "../../graphql/mutations";
import moment from "moment";
import {useAuth} from "../../hooks/use-auth";
import {API, Storage} from "aws-amplify";
import {getNextDocumentId} from "../../utils/id-generator";

export const AddDocumentDialog = (props) => {
    const {user} = useAuth();

    const {onClose, open, mode = "edit", bukken, loadData, ...other} = props;
    const [form, setForm] = useState({
        overview: "",
        file: null,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async () => {
        const {overview, file} = form;
        console.log("handleSubmit... ", {overview, file, bukken});
        if (!file || !overview) return;
        setLoading(true);
        try {
            //upload file
            const originFileName = `${file.name.replace(/ |　/g, "")}`;
            const s3FileNamePrefix = moment().format("YYYYMMDD_HHmmss");
            const s3FileName = getBukkenS3FileName(
                bukken,
                `${s3FileNamePrefix}_${originFileName}`
            );
            await Storage.put(s3FileName, file, {
                level: "public",
                contentType: file.type,
            });

            //fake
            // const originFileName = "test.pdf";
            // const s3FileName = getBukkenS3FileName(bukken, originFileName);

            //create document
            const docId = await getNextDocumentId();
            const object_kind = "0";
            const response = await API.graphql({
                query: createDocument,
                variables: {
                    input: {
                        id: docId,
                        user_id: bukken.user_id,
                        bukken_id: bukken.id,
                        bukkenDocumentsId: bukken.id,//generate by @belongTo
                        delete_flag: 0,
                        object_kind,
                        object_kind_createdAt: `${object_kind}#${moment()
                            .utc()
                            .format("YYYYMMDDTHHmmss")}`,////0#20221201T102309
                        orignal_file_name: originFileName,
                        s3_file_name: s3FileName,
                        overview,
                        sort: 1, //always 1
                        //   other_object_id
                    },
                },
            });
            console.log("response ", response);
            loadData();
        } catch (e) {}
        setLoading(false);
        onClose();
    };

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            s
            onClose={onClose}
            open={!!open}
            {...other}
        >
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
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
                        disabled={mode === "reference"}
                        sx={{mt: 3}}
                        fullWidth
                        label="資料概要"
                        name="overview"
                        onChange={handleChange}
                        value={form.outline}
                    />
                    <FileUpload
                        accept=".pdf"
                        onChange={(file) => setForm({...form, file})}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!form.overview || !form.file || loading}
                >
                    {mode === "reference" ? "詳細を参照" : "追加"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AddDocumentDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    mode: PropTypes.oneOf(["edit", "reference"]),
    bukken: PropTypes.object,
};
