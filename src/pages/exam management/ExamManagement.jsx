import React from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Row1 from "../../components/pages/exam management/Row1";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams, getExamResult } from "./../../Redux/actions/Actions";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

export default function ExamManagement() {
  const theme = useTheme();

  const column = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "level",
      headerName: "المستوى التعليمى",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <span
            style={{
              background:
                params.row.level.includes("الاول") ||
                params.row.level.includes("الأول")
                  ? theme.palette.primary.main
                  : params.row.level.includes("الثانى") ||
                    params.row.level.includes("الثاني")
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
    ,
    {
      field: "examTitle",
      headerName: "عنوان الامتحان",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "examDuration",
      headerName: "مدة الامتحان",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <span>
            {+params.row.examDuration === 30
              ? "نصف ساعة"
              : +params.row.examDuration === 60
              ? "ساعة"
              : +params.row.examDuration === 90
              ? "ساعة ونص"
              : "ساعتان"}
          </span>
        );
      },
    },
    {
      field: "score",
      headerName: "مجموع درجات الامتحان",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Box className="d-flex gap-2 align-items-center ">
            <p className="text-danger m-0">
              {(+params.row.score).toLocaleString()}
            </p>
            <span> درجة</span>
          </Box>
        );
      },
    },
    {
      field: "date",
      headerName: "تاريخ الانشاء",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <span>{params.row.date.split("T")[0]}</span>;
      },
    },
    {
      field: "type",
      headerName: "نوع الامتحان",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Box>
            {params.row.type.name === "PDF" ? (
              <Button variant="contained" color="error">
                <a
                  href={`${import.meta.env.VITE_API}${params.row.type.file}`}
                  target="_blank"
                  className="text-white text-decoration-none"
                >
                  {params.row.type.name}
                </a>
              </Button>
            ) : (
              <span>{params.row.type.name}</span>
            )}
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "حالة الامتحان",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const currentDate = new Date();
        let inactiveDate = new Date(
          params.row.status.startTime.toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short",
            timeZone: "Europe/Istanbul", // تغيير المنطقة الزمنية حسب الحاجة
          })
        );

        let afterDate = new Date(inactiveDate);
        afterDate.setMinutes(
          afterDate.getMinutes() + +params.row.status.duration
        );

        return (
          <Box
            className="user-select-none"
            sx={{
              color: theme.palette.primary.contrastText,
              background:
                currentDate > inactiveDate && currentDate < afterDate
                  ? theme.palette.success.main
                  : currentDate < inactiveDate
                  ? theme.palette.warning.main
                  : "none",
              padding: "5px 10px",
              borderRadius: 0.6 + "rem",
            }}
            title={`موعد عرض الامتحان ${inactiveDate.toLocaleString()} ... موعد الانتهاء ${afterDate.toLocaleString()}`}
          >
            {currentDate > afterDate ? (
              params.row.type.name === "MCQ" ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(_) => showResults(params.row.action)}
                >
                  عرض النتائج
                </Button>
              ) : (
                <span
                  style={{
                    background: theme.palette.error.main,
                  }}
                  className="p-2 rounded"
                >
                  تم انتهاء مدة الامتحان
                </span>
              )
            ) : currentDate < inactiveDate ? (
              <span>لم يتم عرض الامتحان</span>
            ) : currentDate > inactiveDate && currentDate < afterDate ? (
              <span>نشط ..</span>
            ) : null}
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "حذف",
      renderCell: (params) => {
        return (
          <IconButton
            sx={{ color: theme.palette.error.main }}
            onClick={(_) => handleDelete(params.row.action)}
          >
            <Delete />
          </IconButton>
        );
      },
      width: 70,
      headerAlign: "center",
      align: "center",
    },
  ];

  const column2 = [
    {
      field: "id",
      headerName: "ID",
      width: 44,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "studentName",
      headerName: "اسم الطالب",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "levelEducation",
      headerName: "المستوى التعليمى",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <span
            style={{
              background:
                params?.row?.levelEducation?.includes("الاول") ||
                params?.row?.levelEducation?.includes("الأول")
                  ? theme.palette.primary.main
                  : params?.row?.levelEducation?.includes("الثانى") ||
                    params?.row?.levelEducation?.includes("الثاني")
                  ? theme.palette.warning.main
                  : theme.palette.success.main,
              color: theme.palette.background.default,
              padding: "7px 10px",
              borderRadius: 0.6 + "rem",
              pointerEvents: "none",
            }}
          >
            {params.row.levelEducation}
          </span>
        );
      },
    },
    {
      field: "groupName",
      headerName: "اسم المجموعة",
      flex: 1,
      headerAlign: "center",
      align: "center",
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
      field: "phoneNum",
      headerName: "رقم الهاتف",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "parentPhoneNum",
      headerName: "رقم ولي الامر",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "studentPoints",
      headerName: "نتيجة الطالب",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <p
            className={`m-0 fs-5 ${
              +params.row.studentPoints === +params.row.allResult
                ? "text-success"
                : "text-danger"
            }`}
          >
            {params.row.studentPoints}
          </p>
        );
      },
    },
    {
      field: "allResult",
      headerName: "النتيجة الكلية",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <span className="fs-5 d-flex gap-2">
            <p
              className={`m-0 ${
                +params.row.studentPoints === +params.row.allResult
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {params.row.studentPoints}
            </p>{" "}
            / {params.row.allResult}
          </span>
        );
      },
    },
  ];

  const [alignment, setAlignment] = React.useState("management");
  const [examsData, setExamsData] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [rows2, setRows2] = React.useState([]);
  const dataExams = useSelector((state) => state.GETALLEXAMS.exams);
  const examResultData = useSelector((state) => state.GETEXAMRESULT.examResult);
  const dispatch = useDispatch();

  const showResults = (id) => {
    setAlignment("results");

    dispatch(getExamResult(id));
  };

  React.useEffect(() => {
    let newArr = [];

    for (let i = 0; i < examResultData.length; i++) {
      newArr.push({
        id: i + 1,
        studentName: examResultData[i].student.userName,
        levelEducation: examResultData[i].student.class.name,
        groupName: examResultData[i].student.group.name,
        phoneNum: examResultData[i].student.phone,
        parentPhoneNum: examResultData[i].student.parentPhoneNumber,
        studentPoints: examResultData[i].exam.questions[0].questionScore,
        allResult: examResultData[i].exam.score,
      });
    }

    setRows2(newArr);
  }, [examResultData]);

  React.useEffect(() => {
    dispatch(getAllExams());
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}exam/${id}`);

      toast.success("تم حذف الامتحان بنجاح");
      dispatch(getAllExams());
    } catch (err) {
      toast.error("حدث خطأ");
    }
  };

  React.useEffect(() => {
    let examArr = [];
    let newArr = [];

    if (dataExams?.length > 1) {
      examArr = dataExams.filter((exam) => exam.examType === "EXAM");
    }

    for (let i = 0; i < examArr.length; i++) {
      newArr.push({
        id: i + 1,
        examTitle: examArr[i].title,
        examDuration: examArr[i].duration,
        score: examArr[i].score,
        date: examArr[i].createdAt,
        action: examArr[i].id,
        type: {
          name: examArr[i].questionType,
          file: examArr[i].file,
        },
        status: {
          startTime: examArr[i].startTime,
          duration: examArr[i].duration,
        },
        level: examArr[i].class.name,
      });
    }

    setRows(newArr);
  }, [dataExams]);

  return (
    <div className="ExamManagement-page">
      <HeaderLine title="ادارة الامتحانات" />
      <ToastContainer position="top-right" />

      <Row1 alignment={alignment} setAlignment={setAlignment} />

      <Box sx={{ height: 75 + "vh", width: "100%", mt: 2 }}>
        <DataGrid
          rows={alignment === "results" ? rows2 : rows}
          columns={alignment === "results" ? column2 : column}
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
    </div>
  );
}
