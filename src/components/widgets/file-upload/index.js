import React, {useState} from "react";
import {Box, Typography} from "@mui/material";
import PropTypes from 'prop-types';

export const FileUpload = ({accept, onChange, children}) => {
    const stopDefaults = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };
    const [file, setFile] = useState();

    const dragEvents = {
        onDragOver: stopDefaults,
        onDrop: (e) => {
            stopDefaults(e);
            if (e.dataTransfer.files[0]) {
                handleUploadFile(e.dataTransfer.files[0]);
            }
        },
    };

    const handleChange = (event) => {
        console.log("handleChange... ", event);
        if (event.target.files[0]) {
            handleUploadFile(event.target.files[0]);
        }
    };

    const handleUploadFile = (file) => {
        console.log("handleUploadFile... ", file);
        onChange(file);
        setFile(file);
    };

    return (
        <>
            <input
                onChange={handleChange}
                accept={accept}
                style={{display: "none"}}
                id="file-upload"
                type="file"
            />

            <label
                htmlFor="file-upload"
                {...dragEvents}
                style={{
                    cursor: "pointer",
                    textAlign: "center",
                    display: "flex",
                }}
            >
                {children ? (
                    children
                ) : (
                    <Box
                        border={1}
                        borderRadius={1.3}
                        borderColor={"#DDDDDD"}
                        width="100%"
                        mt={4}
                        p={4}
                    >
                        <img
                            alt="file upload"
                            src="/images/file-upload/file-upload.png"
                        />
                        <Typography variant="subtitle2">
                            {file?.name ?? "ファイル選択"}
                        </Typography>
                    </Box>
                )}
            </label>
        </>
    );
};
