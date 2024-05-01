import React from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Container } from "react-bootstrap";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import "./PreparationPage.css";
import { CloseRounded, InfoRounded } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  bgcolor: "background.paper",
  border: "2px solid rgba(0 ,0 ,0 ,.2)",
  boxShadow: "0 0 0.4rem rgb(103 138 201 / 70%)",
  p: "0.4rem 0.8rem",
  borderRadius: "0.4rem",
};

const PreparationPage = () => {
  const [open, setOpen] = React.useState(false);

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
              <li onClick={(_) => setOpen(true)}>
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
            </ul>
          </Paper>
        </Stack>

        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <Box flexGrow={1} />

              <IconButton color="inherit" onClick={(_) => setOpen(false)}>
                <CloseRounded />
              </IconButton>
            </Stack>

            <p>
              هل متأكد من حذف{" "}
              <i style={{ color: theme.palette.primary.main }}>
                الصف الاول الثانوى
              </i>
              ؟
            </p>

            <Stack direction={"row"} gap={2} mt={2}>
              <Box flexGrow={1} />

              <Button variant="contained" color="error">
                حذف
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default PreparationPage;
