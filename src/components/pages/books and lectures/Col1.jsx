import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import React from "react";
import { Col } from "react-bootstrap";
import FileUploader from "../../../pages/course/FileUploader";

export default function Col1(props) {
  const theme = useTheme();

  return (
    <Col sm={12} lg={6} className="col-1">
      <Stack gap={1}>
        <span style={{ color: theme.palette.primary.dark }}>
          اولا حدد المستوى التعليمي
        </span>

        <ToggleButtonGroup
          color="primary"
          value={props.alignment}
          exclusive
          onChange={props.handleChange}
          aria-label="Platform"
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.12);",
          }}
        >
          <ToggleButton className="flex-grow-1" value="الصف الاول الثانوى">
            الصف الاول الثانوى
          </ToggleButton>
          <ToggleButton className="flex-grow-1" value="الصف الثانى الثانوى">
            الصف الثانى الثانوى
          </ToggleButton>
          <ToggleButton className="flex-grow-1" value="الصف الثالث الثانوى">
            الصف الثالث الثانوى
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack direction={"row"} gap={2} alignItems={"center"} mt={2}>
        <input
          className="flex-grow-1"
          type="text"
          placeholder="عنواع الكتاب"
          value={props.bookTitle}
          onChange={(e) => props.setBookTitle(e.target.value)}
          style={{
            background: theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
            color: theme.palette.text.primary,
          }}
        />

        <Box flexGrow={1} />
      </Stack>

      <Stack direction={"row"} gap={2} alignItems={"center"} mt={2}>
        <textarea
          className="flex-grow-1"
          placeholder="وصف عن الكتاب"
          value={props.bookDesc}
          onChange={(e) => props.setBookDesc(e.target.value)}
          rows={"4"}
          style={{
            background: theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
            color: theme.palette.text.primary,
          }}
        />
      </Stack>

      <Box mt={3}>
        <span style={{ color: theme.palette.primary.dark }}>
          ضع صورة مصغرة للكتاب
        </span>

        <Stack direction={"row"} gap={2} alignItems={"center"} mt={1}>
          <span className="user-select-none">اضغط لاختيار الصورة المصغرة</span>
          <Box flexGrow={1} />
          <input
            type="file"
            className="d-none"
            id="upload-cover"
            onChange={(e) => {
              // تأكد من أن الصورة تم اختيارها وأن حجمها 300x300 بيكسل
              const file = e.target.files[0];
              if (file) {
                const img = new Image();
                img.src = URL.createObjectURL(file);
                img.onload = () => {
                  if (img.width === 300 && img.height === 300) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      props.setImgReader(reader.result);
                    };
                  } else {
                    alert("يجب أن يكون حجم الصورة 300 × 300 بيكسل.");
                  }
                };
              }
            }}
            accept="image/*" // تحديد أنه يمكن قبول ملفات الصور فقط
          />

          <label
            htmlFor="upload-cover"
            style={{
              cursor: "pointer",
              color: theme.palette.primary.dark,
              background: theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
              border: `1px solid ${theme.palette.primary.dark}`,
            }}
            className="upload-cover w-50"
          >
            300 × 300
          </label>
        </Stack>
      </Box>

      <Box mt={3}>
        <span style={{ color: theme.palette.primary.dark }}>
          ارفق كتاب الشرح
        </span>

        <FileUploader files={props.files} setFiles={props.setFiles} />
      </Box>

      <Stack direction={"row"} gap={2} alignItems={"center"} mt={2}>
        <Box flexGrow={1} />

        <Button
          color={"primary"}
          variant="contained"
          sx={{ p: "10px 20px" }}
          className="flex-grow-1"
          onClick={props.handleSave}
        >
          حفظ
        </Button>
      </Stack>

      <Stack direction={"row"} gap={2} alignItems={"center"} mt={3}>
        <span
          className="finished-question"
          onClick={(_) =>
            props.setFinished((prev) => (prev === false ? true : false))
          }
        >
          هل انتهيت ؟؟
        </span>
        <Box flexGrow={1} />

        {props.finished ? (
          <Stack direction={"row"} gap={2}>
            <Button variant="contained" color="success">
              نعم انتهيت
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={(_) => props.setFinished(false)}
            >
              لا, لم انتهي
            </Button>
          </Stack>
        ) : null}
      </Stack>
    </Col>
  );
}
