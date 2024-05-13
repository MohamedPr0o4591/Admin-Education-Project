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
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentResult } from "../../Redux/actions/Actions";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

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
  const [studentData, setStudentData] = React.useState([]);
  const [rows1, setRows1] = React.useState([]);
  const [rows2, setRows2] = React.useState([]);

  const [alignment, setAlignment] = React.useState("pending-hw");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [addPoints, setAddPoints] = React.useState("");

  const pendingStudentData = useSelector(
    (state) => state.GETPENDINGSTUDENTRESULT.pendingResult
  );
  const dispatch = useDispatch();

  const theme = useTheme();

  React.useEffect(() => {
    dispatch(getAllStudentResult());
  }, []);

  React.useEffect(() => {
    let newArr = pendingStudentData?.filter((item) => item?.Exam);
    let newArr2 = pendingStudentData?.filter((item) => item?.Lesson);

    setStudentData({
      examData: newArr,
      hwData: newArr2,
    });
  }, [pendingStudentData]);

  React.useEffect(() => {
    dispatch(getAllStudentResult());
  }, []);

  React.useEffect(() => {
    let newArr = [];
    let newArr2 = [];

    if (studentData?.hwData?.length > 0) {
      for (let i = 0; i < studentData?.hwData?.length; i++) {
        newArr.push({
          id: i + 1,
          studentDetails: {
            name: studentData?.hwData[i]?.student?.userName,
            id: studentData?.hwData[i]?.id,
            examScore: studentData?.hwData[i]?.Lesson?.score,
            length: Array.from(studentData.hwData).length,
          },
          level: studentData?.hwData[i]?.student?.class?.name,
          groupName: studentData?.hwData[i]?.student?.group?.name,
          phoneNumber: studentData?.hwData[i]?.student?.phone,
          parentPhoneNumber: studentData?.hwData[i]?.student?.parentPhoneNumber,
          file: studentData?.hwData[i]?.Lesson?.homeworkFile,
        });
      }
    } else if (studentData?.examData?.length > 0) {
      for (let i = 0; i < studentData?.examData?.length; i++) {
        newArr2.push({
          id: i + 1,
          studentDetails: {
            name: studentData?.examData[i]?.student?.userName,
            id: studentData?.examData[i]?.id,
            examScore: studentData?.examData[i]?.Exam?.score,
            length: Array.from(studentData.examData).length,
          },
          level: studentData?.examData[i]?.student?.class?.name,
          groupName: studentData?.examData[i]?.student?.group?.name,
          phoneNumber: studentData?.examData[i]?.student?.phone,
          parentPhoneNumber:
            studentData?.examData[i]?.student?.parentPhoneNumber,
          file: studentData?.examData[i]?.Exam?.file,
        });
      }
    }

    setRows1(newArr);
    setRows2(newArr2);
  }, [studentData]);

  const handleAddPoints = (studentName, examScore, id, level, length) => {
    setStudentArr({
      name: studentName,
      level,
      examScore,
      id,
      arrayLength: length,
    });

    handleOpen();
  };

  const handleSendPoints = async (_) => {
    if (+addPoints <= +studentArr.examScore) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_API}teacher/updateStudentResult/${
            studentArr.id
          }`,
          {
            score: +addPoints,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("تمت العملية بنجاح");
        handleClose();
        setAddPoints("");
        if (studentArr.arrayLength === 1) {
          location.reload();
        } else {
          dispatch(getAllStudentResult());
        }
      } catch (err) {
        toast.error("حدث خطأ");
      }
    } else {
      toast.error("النقاط المدخلة اكبر من المجموع");
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 70,
    },
    {
      field: "studentDetails",
      headerName: "اسم الطالب",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return <span>{params.row.studentDetails.name}</span>;
      },
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
      field: "groupName",
      headerName: "اسم المجموعة",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              border: "1px groove " + theme.palette.primary.main,
              p: "8px 30px",
              borderRadius: 2 + "rem",
              pointerEvents: "none",
            }}
          >
            <span>{params.row.groupName}</span>
          </Box>
        );
      },
    },
    {
      field: "phoneNumber",
      headerName: "رقم الهاتف",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "parentPhoneNumber",
      headerName: "رقم ولي الامر",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "file",
      headerName: "الملف",
      headerAlign: "center",
      align: "center",
      width: 65,
      renderCell: (params) => {
        return (
          <Button
            color="error"
            variant="contained"
            onClick={(_) =>
              window.open(`${import.meta.env.VITE_API}${params.row.file}`)
            }
          >
            PDF
          </Button>
        );
      },
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
              handleAddPoints(
                params.row.studentDetails.name,
                params.row.studentDetails.examScore,
                params.row.studentDetails.id,
                params.row.level,
                params.row.studentDetails.length
              )
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

      <ToastContainer position="top-right" />

      <Row1 alignment={alignment} setAlignment={setAlignment} />

      <Box sx={{ height: 75 + "vh", width: "100%", mt: 2 }}>
        <DataGrid
          rows={alignment === "pending-hw" ? rows1 : rows2}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          rowsPerPageOptions={[10]}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
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
                <div className="d-flex gap-1 align-items-center flex-grow-1">
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

                  <p className="m-0 text-danger">/ {studentArr.examScore}</p>
                </div>

                <Button
                  sx={{ p: "10px 20px" }}
                  className="flex-grow-1"
                  variant="contained"
                  onClick={handleSendPoints}
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
