import { Stack, useTheme } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./FileUploader.css";

const FileUploader = (props) => {
  const maxSize = 600 * 1024 * 1024; // 600 ميجابايت

  const onDrop = useCallback(
    (acceptedFiles) => {
      props.setFiles(acceptedFiles);
    },
    [props.setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
  });

  const bytesToMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2); // تحويل البايت إلى ميجابايت مع تحديد عدد الأرقام البعدين
  };

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
            <u>تم حديد الملف</u>
          </i>
        </Stack>
      ) : null}
    </div>
  );
};

export default FileUploader;
