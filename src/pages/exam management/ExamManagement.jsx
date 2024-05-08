import React from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Row1 from "../../components/pages/exam management/Row1";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "./../../Redux/actions/Actions";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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
        return (
          <Box
            className="user-select-none"
            sx={{
              color: "#000",
              background: theme.palette.success.light,
              padding: "5px 10px",
              borderRadius: 0.6 + "rem",
            }}
          >
            <span>نشط ..</span>
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

  const [alignment, setAlignment] = React.useState("management");
  const [rows, setRows] = React.useState([]);
  const dataExams = useSelector((state) => state.GETALLEXAMS.exams);
  const dispatch = useDispatch();

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
    let newArr = [];
    for (let i = 0; i < dataExams.length; i++) {
      newArr.push({
        id: i + 1,
        examTitle: dataExams[i].title,
        examDuration: dataExams[i].duration,
        score: dataExams[i].score,
        date: dataExams[i].createdAt,
        action: dataExams[i].id,
        type: {
          name: dataExams[i].questionType,
          file: dataExams[i].file,
        },
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
        {alignment === "management" ? (
          <DataGrid
            rows={rows}
            columns={column}
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
        ) : null}
      </Box>
    </div>
  );
}
