import React from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import Row1 from "../../components/pages/homework management/Row1";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { rows1, rows2 } from "../../components/pages/homework management/Data";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { Close } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: "0 0 0.4rem rgb(103 138 201 / 70%)",
  p: "0.4rem 0.8rem",
  borderRadius: "0.4rem",
};

export default function HomeWorkMPage() {
  const initialState = {
    name: "",
    level: "",
  };

  const [studentArr, setStudentArr] = React.useState(initialState);

  const [alignment, setAlignment] = React.useState("pending-hw");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [addPoints, setAddPoints] = React.useState("");

  const theme = useTheme();

  const handleAddPoints = (studentName, level) => {
    setStudentArr({
      name: studentName,
      level: level,
    });

    handleOpen();
  };

  const columns1 = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 70,
    },
    {
      field: "studentName",
      headerName: "اسم الطالب",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "level",
      headerName: "المستوى التعليمى",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <span
            style={{
              background: params.row.level.includes("الاول")
                ? theme.palette.primary.main
                : params.row.level.includes("الثانى")
                ? theme.palette.warning.main
                : theme.palette.success.main,
              color: theme.palette.background.default,
              padding: "7px 10px",
              borderRadius: 0.6 + "rem",
              pointerEvents: "none",
            }}
          >
            {params.row.level}
          </span>
        );
      },
    },
    {
      field: "homework",
      headerName: "الواجب",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "addPoints",
      headerName: "اضافة نقاط",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            color="secondary"
            variant="contained"
            onClick={(_) =>
              handleAddPoints(params.row.studentName, params.row.level)
            }
          >
            أضف النقاط
          </Button>
        );
      },
    },
  ];

  const columns2 = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 70,
    },
    {
      field: "studentName",
      headerName: "اسم الطالب",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "level",
      headerName: "المستوى التعليمى",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <span
            style={{
              background: params.row.level.includes("الاول")
                ? theme.palette.primary.main
                : params.row.level.includes("الثانى")
                ? theme.palette.warning.main
                : theme.palette.success.main,
              color: theme.palette.background.default,
              padding: "7px 10px",
              borderRadius: 0.6 + "rem",
              pointerEvents: "none",
            }}
          >
            {params.row.level}
          </span>
        );
      },
    },
    {
      field: "exam",
      headerName: "الامتحان",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "addPoints",
      headerName: "اضافة نقاط",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            color="secondary"
            variant="contained"
            onClick={(_) =>
              handleAddPoints(params.row.studentName, params.row.level)
            }
          >
            أضف النقاط
          </Button>
        );
      },
    },
  ];

  return (
    <div className="home-work-management">
      <HeaderLine title="إدارة الواجبات المنزلية" />

      <Row1 alignment={alignment} setAlignment={setAlignment} />

      <Box sx={{ height: 75 + "vh", width: "100%", mt: 2 }}>
        {alignment === "pending-hw" ? (
          <DataGrid
            rows={rows1}
            columns={columns1}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            rowsPerPageOptions={[5]}
            disableRowSelectionOnClick
          />
        ) : (
          <DataGrid
            rows={rows2}
            columns={columns2}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            rowsPerPageOptions={[5]}
            disableRowSelectionOnClick
          />
        )}
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <IconButton
              color="inherit"
              aria-label="close"
              onClick={handleClose}
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              <Close />
            </IconButton>

            <Stack gap={2} px={5} py={3}>
              <Stack
                gap={2}
                direction={"row"}
                alignItems={"center"}
                my={3}
                justifyContent={"space-between"}
              >
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  اسم الطالب: {studentArr.name}
                </Typography>

                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{
                    color: theme.palette.secondary.main,
                  }}
                >
                  {studentArr.level}
                </Typography>
              </Stack>

              <Stack direction={"row"} gap={2} alignItems={"center"}>
                <input
                  className="flex-grow-1"
                  type="number"
                  placeholder="أضف النقاط"
                  value={addPoints}
                  onChange={(e) => setAddPoints(e.target.value)}
                  style={{
                    background:
                      theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                    color: theme.palette.text.primary,
                    outline: "none",
                    border: "none",
                    borderBottom: "3px solid #4a4a4a",
                    borderRadius: 0.2 + "rem",
                  }}
                />

                <Button
                  sx={{ p: "10px 20px" }}
                  className="flex-grow-1"
                  variant="contained"
                >
                  إضافة
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
