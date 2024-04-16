import React from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Col, Container, Row } from "react-bootstrap";
import "./CoursePage.css";
import { Box, Button, Paper, Stack, useTheme } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FileUploader from "./FileUploader";
import { OndemandVideoRounded } from "@mui/icons-material";

function CoursePage() {
  const theme = useTheme();

  const [alignment, setAlignment] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [lessonTitle, setLessonTitle] = React.useState("");
  const [lessonDesc, setLessonDesc] = React.useState("");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="course-page">
      <HeaderLine title="شرح المنهج" />

      <Row>
        <Col sm={12} lg={6} className="col-1">
          <Stack gap={2}>
            <Stack gap={1}>
              <span style={{ color: theme.palette.primary.dark }}>
                اولا حدد المستوى التعليمي
              </span>

              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{
                  border: "1px solid rgba(255, 255, 255, 0.12);",
                }}
              >
                <ToggleButton
                  className="flex-grow-1"
                  value="الصف الاول الثانوى"
                >
                  الصف الاول الثانوى
                </ToggleButton>
                <ToggleButton
                  className="flex-grow-1"
                  value="الصف الثانى الثانوى"
                >
                  الصف الثانى الثانوى
                </ToggleButton>
                <ToggleButton
                  className="flex-grow-1"
                  value="الصف الثالث الثانوى"
                >
                  الصف الثالث الثانوى
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <input
                className="flex-grow-1"
                type="text"
                placeholder="عنوان الفصل"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  background:
                    theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                  color: theme.palette.text.primary,
                }}
              />
              <input
                className="flex-grow-1"
                type="text"
                placeholder="عنوان الدرس"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                style={{
                  background:
                    theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                  color: theme.palette.text.primary,
                }}
              />
            </Stack>

            <textarea
              className="flex-grow-1"
              placeholder="وصف الدرس"
              value={lessonDesc}
              onChange={(e) => setLessonDesc(e.target.value)}
              rows={"4"}
              style={{
                background:
                  theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                color: theme.palette.text.primary,
              }}
            />

            <Stack>
              <span style={{ color: theme.palette.primary.dark }}>
                ارفاق فيديو شرح او صورة
              </span>
              <span style={{ color: theme.palette.error.dark }}>
                تنبيه: الفيديو المرفق يجب ان لا يتجاوز 600 ميجا بايت !!
              </span>

              <FileUploader />
            </Stack>

            <Stack>
              <span style={{ color: theme.palette.primary.dark }}>
                رفع مرفق لملف الشرح اذا تواجد مثل مذكرة الشرح PDF (اختياري)
              </span>

              <FileUploader />
            </Stack>

            <Stack direction={"row"} gap={2} mt={2}>
              <Box flexGrow={1} />

              <Button variant="contained" color="primary">
                رفع الدرس
              </Button>
            </Stack>
          </Stack>
        </Col>

        {/* Col 2 */}

        <Col sm={12} lg={6}>
          <Container className="d-flex justify-content-center align-items-center">
            <Paper sx={{ height: 75 + "vh", width: "70%", px: 2, py: 5 }}>
              <Stack gap={2} height={"100%"}>
                <Box
                  className="paper-box h-100 "
                  sx={{
                    border: `1px solid ${theme.palette.primary.dark}`,
                  }}
                >
                  <span
                    className="title"
                    style={{
                      background:
                        theme.palette.mode === "dark" ? "#242424" : "#ffff",
                    }}
                  >
                    {title}
                  </span>
                  <span
                    style={{
                      background:
                        theme.palette.mode === "dark" ? "#242424" : "#ffff",
                    }}
                    className="level"
                  >
                    {alignment}
                  </span>
                  <p className="lessonTitle fs-4 fw-bold mt-3">{lessonTitle}</p>

                  <div className="content d-flex justify-content-center">
                    <OndemandVideoRounded
                      sx={{
                        fontSize: 20 + "vw",
                        color: theme.palette.primary.main,
                      }}
                    />
                  </div>
                  <span className="lessonDesc">{lessonDesc}</span>
                </Box>
              </Stack>
            </Paper>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default CoursePage;
