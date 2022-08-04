import React from "react";
import PropTypes from "prop-types";
import { confirmable, createConfirmation } from "react-confirm";
import {Dialog, DialogContent, DialogActions, Button, DialogContentText} from "@mui/material";

const ConfirmDialog = ({show, proceed, confirmation, okLabel, cancelLabel}) => (
    <Dialog
        open={show}
        onClose={() => proceed(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {confirmation}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => proceed(false)}>{cancelLabel}</Button>
            <Button onClick={() => proceed(true)} autoFocus>
                {okLabel}
            </Button>
        </DialogActions>
    </Dialog>
);

ConfirmDialog.propTypes = {
    show: PropTypes.bool, // from confirmable. indicates if the dialog is shown or not.
    proceed: PropTypes.func, // from confirmable. call to close the dialog with promise resolved.
    confirmation: PropTypes.string, // arguments of your confirm function
    okLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
};

// confirmable HOC pass props `show`, `dismiss`, `cancel` and `proceed` to your component.
// export default confirmable(ConfirmDialog);

export function confirm(
    confirmation,
    okLabel = "はい",
    cancelLabel = "いいえ"
) {
    return createConfirmation(confirmable(ConfirmDialog))({
        confirmation,
        okLabel,
        cancelLabel,
    });
}
