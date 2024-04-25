import { Stack, useTheme } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./FileUploader.css";

const FileUploader = (props) => {
  const maxSize = 600 * 1024 * 1024; // 600 ميجابايت
  const [errorMessage, setErrorMessage] = React.useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const oversizedFiles = acceptedFiles.some((file) => file.size > maxSize);
      if (oversizedFiles) {
        setErrorMessage(
          "حجم الفيديو أكبر من 600 ميجابايت. يرجى اختيار فيديو بحجم أقل من 600 ميجابايت."
        );
        props.setFiles([]);
      } else {
        setErrorMessage("");
        const newFilePaths = acceptedFiles.map((file) =>
          URL.createObjectURL(file)
        );

        props.setFiles([...props.files, ...newFilePaths]);
      }
    },
    [props.files, maxSize]
  );

  const handleRemoveFile = (indexToRemove) => {
    const updatedFilePaths = props.files.filter(
      (_, index) => index !== indexToRemove
    );

    props.setFiles(updatedFilePaths);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: "image/*, video/*, pdf/*",
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

      {props.files
        ? props.files.map((filePath, index) => (
            <div key={index}>
              <Stack gap={1} sx={{ color: theme.palette.success.main }}>
                <i className="user-select-none">
                  <u>تم حديد الملف</u>
                </i>
              </Stack>
            </div>
          ))
        : null}

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};

export default FileUploader;
