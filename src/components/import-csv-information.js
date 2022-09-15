import React, {useCallback} from "react";
import PropTypes from "prop-types";
import {useDropzone} from "react-dropzone";
import {Button, CircularProgress} from "@mui/material";
import {Upload as UploadIcon} from "icons/upload";
import Papa from "papaparse";
import {useImportCSVInformation} from "hooks/use-import-csv-information";
import {confirm} from "./dialog/confirm-dialog";
import {LoadingButton} from "@mui/lab";

export function ImportCSVInformation(props) {
    const {onComplete, informationId} = props;
    const {createInformation, updateInformation, loading} =
        useImportCSVInformation();

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                transformHeader: (header) => {
                    console.log("transformHeader:", header);
                    return "email";
                },
                error: (errors) => {
                    console.log("error:", errors);
                },
                complete: async (results) => {
                    console.log("Finished:", results.data);
                    const accept = await confirm(
                        "選択された送信先情報でデータを登録または更新します。"
                    );
                    if (!accept) return;

                    if (informationId) {
                        //case update
                        const items = await updateInformation({
                            informationId: informationId,
                            data: results.data,
                        });
                        onComplete(items, informationId);
                    } else {
                        //case create new
                        const {data, information} = await createInformation({
                            data: results.data,
                        });
                        onComplete(data, information?.id);
                    }
                },
            });
        });
    }, []);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {
            "text/csv": [".csv"],
        },
    });

    return (
        <LoadingButton
            loading={loading}
            loadingIndicator={<CircularProgress color="primary" size={30} />}
            startIcon={<UploadIcon fontSize="small" />}
            sx={{m: 1}}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            Import
        </LoadingButton>
    );
}

ImportCSVInformation.propTypes = {
    onComplete: PropTypes.func,
    informationId: PropTypes.string,
};
