import { Alert, Box, Button, Snackbar, Stack, useTheme } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./FileUploader.css";

const FileUploader = (props) => {
  const getColorForSeverity = (severity) => {
    switch (severity) {
      case "success":
        return "#4caf50"; // green
      case "error":
        return "#f44336"; // red
      case "warning":
        return "#ff9800"; // orange
      case "info":
        return "#2196f3"; // blue
      default:
        return "#000"; // black
    }
  };

  const initialToast = {
    status: "",
    message: "",
    open: false,
  };

  const [toastDetails, setToastDetails] = useState(initialToast);
  const [error, setError] = useState(false);

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [error]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Filter accepted files to only keep PDF files
      const pdfFiles = acceptedFiles.filter(
        (file) => file.type === "application/pdf"
      );
      if (pdfFiles.length === 0) {
        setToastDetails({
          status: "error",
          message: "من فضلك ارفق الكتاب من نوع PDF فقط",
          open: true,
        });
        setError(true);
        return;
      }

      props.setFiles(pdfFiles);
    },
    [props.setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const theme = useTheme();

  return (
    <div {...getRootProps()}>
      {!error ? (
        <div
          className="file-uploader mb-3 opacity-50"
          style={{
            border: `2px dashed ${theme.palette.text.primary}`,
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>اسحب وافلت الملفات هنا...</p>
          ) : (
            <p>اسحب وافلت الملفات هنا أو انقر لاختيارها</p>
          )}
        </div>
      ) : (
        <p className="text-danger p-5 text-center">
          انتظر 5 ثوان قبل المحاولة مرة اخري ...
        </p>
      )}

      {props.files !== undefined ? (
        <Stack gap={1} sx={{ color: theme.palette.success.main }}>
          <i className="user-select-none">
            {props.files.map((file, index) => (
              <div className=" d-flex justify-content-between" key={index}>
                <ul style={{ lineHeight: 2 }}>
                  <li key={file.name}>اسم الملف : {file.name}</li>
                  <li>
                    حجم الملف : {(file.size / 1024 / 1024).toFixed(2)} ميجا بايت
                  </li>
                </ul>
              </div>
            ))}
          </i>
        </Stack>
      ) : null}

      <Snackbar
        open={toastDetails.open}
        autoHideDuration={5000}
        onClose={(_) => setToastDetails({ ...toastDetails, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={(_) => setToastDetails({ ...toastDetails, open: false })}
          severity={toastDetails.status}
          style={{
            backgroundColor: getColorForSeverity(toastDetails.status),
            padding: "10px 50px",
          }}
        >
          {toastDetails.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FileUploader;
