import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Col } from "react-bootstrap";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import FileUploader from "./../../../pages/course/FileUploader";
import HeaderLine from "../../headerLine/HeaderLine";
import { AddRounded } from "@mui/icons-material";

function Col1(props) {
  const theme = useTheme();

  const answers = [
    {
      value: "الوحدة الاولى",
    },
    {
      value: "الوحدة الثانية",
    },
    {
      value: "الوحدة الثالثة",
    },
    {
      value: "الوحدة الرابعة",
    },
  ];

  return (
    <Col xs={12} lg={6} className="col-1">
      <Stack gap={2}>
        <Stack gap={1}>
          <span style={{ color: theme.palette.primary.dark }}>
            <strong className="text-danger fs-4">*</strong>اولا حدد المستوى
            التعليمي
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

        <Stack
          direction={"row"}
          gap={2}
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          <span style={{ color: theme.palette.primary.dark }}>
            <strong className="text-danger fs-4">*</strong> اختر عنوان الفصل
          </span>

          <TextField
            id="standard-select-currency"
            select
            defaultValue=""
            label="عنوان الفصل"
            variant="filled"
            className="flex-grow-1 "
            onChange={(e) => props.setTitle(e.target.value)}
          >
            {answers.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>

          <IconButton color="success">
            <AddRounded />
          </IconButton>
        </Stack>

        <input
          className="flex-grow-1"
          type="text"
          placeholder="عنوان الدرس"
          value={props.lessonTitle}
          onChange={(e) => props.setLessonTitle(e.target.value)}
          style={{
            background: theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
            color: theme.palette.text.primary,
          }}
        />

        <textarea
          className="flex-grow-1"
          placeholder="وصف الدرس"
          value={props.lessonDesc}
          onChange={(e) => props.setLessonDesc(e.target.value)}
          rows={"4"}
          style={{
            background: theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
            color: theme.palette.text.primary,
          }}
        />

        <Stack gap={2}>
          <span style={{ color: theme.palette.primary.dark }}>
            <strong className="text-danger fs-4">*</strong> ضع رابط فيديو الشرح:
          </span>

          <input
            className="flex-grow-1"
            type="text"
            placeholder="رابط الفيديو"
            value={props.videoLink}
            onChange={(e) => props.setVideoLink(e.target.value)}
            style={{
              background: theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
              color: theme.palette.text.primary,
              direction: "ltr",
            }}
          />
        </Stack>

        <Stack>
          <span style={{ color: theme.palette.primary.dark }}>
            رفع مرفق لملف الشرح اذا تواجد مثل مذكرة الشرح PDF (اختياري)
          </span>

          <FileUploader
            files={props.lessonFile}
            setFiles={props.setLessonFile}
          />
        </Stack>

        <HeaderLine title="الواجب المنزلى" />

        <Stack>
          <span style={{ color: theme.palette.primary.dark }}>
            رفع ملف PDF / صورة لواجب منزلى اذا تواجد عن الدرس المذكور في الشرح
            (اختيارى)
          </span>

          <FileUploader files={props.hWFile} setFiles={props.setHWFile} />
        </Stack>

        <Stack direction={"row"} gap={2} mt={2}>
          <Box flexGrow={1} />

          <Button variant="contained" color="primary">
            رفع الدرس
          </Button>
        </Stack>
      </Stack>
    </Col>
  );
}

export default Col1;
