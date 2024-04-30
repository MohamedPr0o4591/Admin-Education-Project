import React from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Container } from "react-bootstrap";
import {
  Box,
  Button,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import "./PreparationPage.css";
import { InfoRounded } from "@mui/icons-material";

const PreparationPage = () => {
  const [alignment, setAlignment] = React.useState("");
  const theme = useTheme();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="preparation-page">
      <HeaderLine title="الصفوف الدراسية" />
      <Container>
        <Stack gap={4}>
          {/* Row 1 */}
          <Paper sx={{ p: 2 }}>
            <h3 className="text-decoration-underline">أضف الصف الدراسى</h3>

            <span
              style={{ color: theme.palette.primary.main }}
              className="mt-5 d-block"
            >
              (مثال: الصف الاول الثانوى)
            </span>

            <p>ملاحظة: هذا هو مثال لاضافة صف دراسى</p>

            <form>
              <Stack direction="row" spacing={2} gap={2} flexWrap={"wrap"}>
                <div className="input-box flex-grow-1">
                  <input
                    type="text"
                    placeholder="الصف الدراسى"
                    style={{
                      background:
                        theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                      color: theme.palette.text.primary,
                    }}
                    className="w-100"
                  />
                </div>
                <Box flexGrow={1} />

                <Button
                  variant="contained"
                  color="success"
                  className="flex-grow-1"
                  type="submit"
                >
                  إضافة
                </Button>
              </Stack>
            </form>
          </Paper>

          {/* Row 2 */}
          <Paper sx={{ p: 2 }}>
            <h3 className="text-decoration-underline">الصفوف الدراسية</h3>

            <ul className="list-unstyled d-flex gap-2 mt-5 p-0 flex-wrap">
              <li>
                <Box
                  className="class-box"
                  title="حذف"
                  sx={{
                    background:
                      theme.palette.mode === "dark" ? "#2d3437" : "#ccdce1",
                    color: theme.palette.text.primary,
                    ":hover": {
                      background: theme.palette.error.main,
                      boxShadow: `0 0 0.65rem ${theme.palette.error.main}`,
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  الصف الاول الثانوى
                </Box>
              </li>

              <li>
                <Box
                  className="class-box"
                  title="حذف"
                  sx={{
                    background:
                      theme.palette.mode === "dark" ? "#2d3437" : "#ccdce1",
                    color: theme.palette.text.primary,
                    ":hover": {
                      background: theme.palette.error.main,
                      boxShadow: `0 0 0.65rem ${theme.palette.error.main}`,
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  الصف الاول الثانوى
                </Box>
              </li>
            </ul>
          </Paper>

          {/* Row 3 */}
          <Paper sx={{ p: 2 }}>
            <h3 className="text-decoration-underline">
              إعداد المجاميع الدراسية
            </h3>

            <span
              style={{ color: theme.palette.primary.main }}
              className="d-block mt-3 mb-2"
            >
              <InfoRounded /> حدد الصف الدراسى
            </span>

            <ToggleButtonGroup
              className="w-100 d-flex flex-wrap"
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
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

            <ul className="list-unstyled d-flex gap-2 mt-5 p-0 flex-wrap">
              <li>
                <Box
                  className="class-box"
                  title="حذف"
                  sx={{
                    background:
                      theme.palette.mode === "dark" ? "#2d3437" : "#ccdce1",
                    color: theme.palette.text.primary,
                    ":hover": {
                      background: theme.palette.error.main,
                      boxShadow: `0 0 0.65rem ${theme.palette.error.main}`,
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  مجموعة 1
                </Box>
              </li>

              <li>
                <Box
                  className="class-box"
                  title="حذف"
                  sx={{
                    background:
                      theme.palette.mode === "dark" ? "#2d3437" : "#ccdce1",
                    color: theme.palette.text.primary,
                    ":hover": {
                      background: theme.palette.error.main,
                      boxShadow: `0 0 0.65rem ${theme.palette.error.main}`,
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  مجموعة 2
                </Box>
              </li>

              <li>
                <Box
                  className="class-box"
                  title="حذف"
                  sx={{
                    background:
                      theme.palette.mode === "dark" ? "#2d3437" : "#ccdce1",
                    color: theme.palette.text.primary,
                    ":hover": {
                      background: theme.palette.error.main,
                      boxShadow: `0 0 0.65rem ${theme.palette.error.main}`,
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  مجموعة 3
                </Box>
              </li>

              <li>
                <Box
                  className="class-box"
                  title="حذف"
                  sx={{
                    background:
                      theme.palette.mode === "dark" ? "#2d3437" : "#ccdce1",
                    color: theme.palette.text.primary,
                    ":hover": {
                      background: theme.palette.error.main,
                      boxShadow: `0 0 0.65rem ${theme.palette.error.main}`,
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  مجموعة 4
                </Box>
              </li>
            </ul>
          </Paper>
        </Stack>
      </Container>
    </div>
  );
};

export default PreparationPage;
