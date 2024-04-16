import { Stack, useTheme } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./FileUploader.css";

const FileUploader = () => {
  const maxSize = 600 * 1024 * 1024; // 600 ميجابايت

  const [files, setFiles] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const oversizedFiles = acceptedFiles.some((file) => file.size > maxSize);
      if (oversizedFiles) {
        setErrorMessage(
          "حجم الفيديو أكبر من 600 ميجابايت. يرجى اختيار فيديو بحجم أقل من 600 ميجابايت."
        );
        setFiles([]);
      } else {
        setErrorMessage("");
        setFiles(acceptedFiles);
      }
    },
    [maxSize]
  );

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: "image/*, video/*",
  });

  const bytesToMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2); // تحويل البايت إلى ميجابايت مع تحديد عدد الأرقام البعدين
  };

  const theme = useTheme();

  return (
    <div {...getRootProps()}>
      <div
        className="file-uploader mb-3"
        style={{ border: `2px dashed ${theme.palette.text.primary}` }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>اسحب وافلت الملفات هنا...</p>
        ) : (
          <p>اسحب وافلت الملفات هنا أو انقر لاختيارها</p>
        )}
      </div>

      {files
        ? files.map((file, index) => (
            <div key={index}>
              <Stack gap={1} sx={{ color: theme.palette.warning.dark }}>
                <span>اسم الملف : {file.name}</span>
                <span> حجم الملف : {bytesToMB(file.size)} ميجابايت</span>
              </Stack>
            </div>
          ))
        : null}

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};

export default FileUploader;
