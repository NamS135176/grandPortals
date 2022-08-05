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
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import {useAuth} from "../../hooks/use-auth";
import {createHistory} from "../../graphql/mutations";
import moment from "moment";
import {API} from "aws-amplify";
import {getNextHistoryId} from "../../utils/id-generator";

export const HistoryDialog = (props) => {
    const {
        onClose,
        open,
        mode = "edit",
        bukken,
        otherObjectId,
        objectKind,
        loadData,
        ...other
    } = props;
    const [form, setForm] = useState({
        date: new Date(),
        overview: "",
        remarks: "",
    });

    const [loading, setLoading] = useState(false);

    const handleDateChange = (date) => {
        setForm({...form, date: date});
    };

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async () => {
        const {overview, date, remarks} = form;
        console.log("handleSubmit... ", {overview, date, remarks});
        if (!date || !overview || !remarks) return;
        setLoading(true);
        try {
            const historyId = await getNextHistoryId();
            const response = await API.graphql({
                query: createHistory,
                variables: {
                    input: {
                        id: historyId,
                        user_id: bukken.user_id,
                        bukken_id: bukken.id,
                        delete_flag: 0,
                        object_kind: objectKind,
                        overview,
                        remarks,
                        sort: 1, //always 1
                        other_object_id: otherObjectId,
                    },
                },
            });
            console.log("response ", response);
            loadData();
            //reset form
            setForm({
                date: new Date(),
                overview: "",
                remarks: "",
            });
        } catch (e) {}
        setLoading(false);
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
                <Typography variant="h6">履歴情報</Typography>
                <IconButton color="inherit" onClick={onClose}>
                    <XIcon fontSize="small" />
                </IconButton>
            </Box>
            <DialogContent>
                <form>
                    <MobileDatePicker
                        disabled={mode === "reference"}
                        label="履歴"
                        inputFormat="MM/dd/yyyy"
                        value={form.date}
                        onChange={handleDateChange}
                        renderInput={(inputProps) => (
                            <TextField {...inputProps} />
                        )}
                    />
                    <TextField
                        disabled={mode === "reference"}
                        sx={{mt: 3}}
                        fullWidth
                        label="概要"
                        name="overview"
                        onChange={handleChange}
                        value={form.overview}
                    />
                    <TextField
                        disabled={mode === "reference"}
                        sx={{mt: 3}}
                        fullWidth
                        multiline
                        minRows={4}
                        label="詳細内応"
                        name="remarks"
                        value={form.remarks}
                        onChange={handleChange}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={
                        !form.date || !form.overview || !form.remarks || loading
                    }
                >
                    {mode === "reference" ? "詳細を参照" : "履歴追加"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

HistoryDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    mode: PropTypes.oneOf(["edit", "reference"]),
    bukken: PropTypes.object,
    otherObjectId: PropTypes.string,
    objectKind: PropTypes.string,
};
