import { Box, Button, Stack, useTheme } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./FileUploader.css";

const FileUploader = (props) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      props.setFiles(acceptedFiles);
    },
    [props.setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const theme = useTheme();

  return (
    <div {...getRootProps()}>
      <div
        className="file-uploader mb-3 opacity-50"
        style={{ border: `2px dashed ${theme.palette.text.primary}` }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>اسحب وافلت الملفات هنا...</p>
        ) : (
          <p>اسحب وافلت الملفات هنا أو انقر لاختيارها</p>
        )}
      </div>

      {props.files !== undefined ? (
        <Stack gap={1} sx={{ color: theme.palette.success.main }}>
          <i className="user-select-none">
            {props.files.map((file) => (
              <div className=" d-flex justify-content-between">
                <ul style={{ lineHeight: 2 }}>
                  <li key={file.name}>اسم الملف : {file.name}</li>
                  <li>
                    حجم الملف : {(file.size / 1024 / 1024).toFixed(2)} ميجا بايت
                  </li>
                </ul>

                <Box>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(_) => props.setFiles([])}
                  >
                    حذف الملف
                  </Button>
                </Box>
              </div>
            ))}
          </i>
        </Stack>
      ) : null}
    </div>
  );
};

export default FileUploader;
