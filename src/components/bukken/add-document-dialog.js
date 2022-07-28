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
import {getBukkenS3FileName} from "../../utils/bukken";
import * as mutations from "../../graphql/mutations";
import moment from "moment";
import {API, Storage} from "aws-amplify";
import {getNextDocumentId} from "../../utils/id-generator";
import {FileDropzone} from "../file-dropzone";
import * as R from "ramda";

export const AddDocumentDialog = (props) => {
    const {
        onClose,
        open,
        mode = "edit",
        bukken,
        otherObjectId,
        loadData,
        ...other
    } = props;
    const [form, setForm] = useState({
        overview: "",
    });
    const [files, setFiles] = useState([]);

    const handleDrop = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleRemove = (file) => {
        setFiles((prevFiles) =>
            prevFiles.filter((_file) => _file.path !== file.path)
        );
    };

    const handleRemoveAll = () => {
        setFiles([]);
    };

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const createDocument = async (file, overview) => {
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

            //create document
            const docId = await getNextDocumentId();
            const object_kind = "0";
            const response = await API.graphql({
                query: mutations.createDocument,
                variables: {
                    input: {
                        id: docId,
                        user_id: bukken.user_id,
                        bukken_id: bukken.id,
                        delete_flag: 0,
                        object_kind,
                        object_kind_createdAt: `${object_kind}#${moment()
                            .utc()
                            .format("YYYYMMDDTHHmmss")}`, ////0#20221201T102309
                        orignal_file_name: originFileName,
                        s3_file_name: s3FileName,
                        overview,
                        sort: 1, //always 1
                        other_object_id: otherObjectId,
                    },
                },
            });
            console.log("response ", response);
        } catch (e) {
            console.error(e);
        }
    };

    const handleSubmit = async () => {
        const {overview} = form;
        if (!files?.length || !overview) return;
        setLoading(true);
        try {
            var promises = files.map((file) => createDocument(file, overview));
            await Promise.all(promises);
        } catch (e) {}
        setLoading(false);
        loadData();
        setForm({
            overview: "",
        });
        setFiles([]);
        onClose();
    };

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
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
                        label="資料概要"
                        name="overview"
                        value={form.overview}
                        onChange={handleChange}
                    />
                    <Box sx={{mt: 3}}>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                            sx={{mb: 1}}
                        >
                            資料追加（pdf）
                        </Typography>

                        <FileDropzone
                            accept={{
                                "application/pdf": [],
                            }}
                            // accept={{"pdf":[".pdf"]}}
                            files={files}
                            onDrop={handleDrop}
                            onRemove={handleRemove}
                            onRemoveAll={handleRemoveAll}
                        />
                    </Box>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!form.overview || R.isEmpty(files) || loading}
                >
                    追加
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
    otherObjectId: PropTypes.string,
};
