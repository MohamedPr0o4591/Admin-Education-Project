import React from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Box, IconButton, useTheme } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { rows1 } from "../../components/pages/exam management/Data";
import Row1 from "../../components/pages/exam management/Row1";

export default function ExamManagement() {
  const theme = useTheme();

  const column1 = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "examName",
      headerName: "اسم المادة",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "level",
      headerName: "المستوى التعليمي",
      flex: 1,
      headerAlign: "center",
      align: "center",
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
      field: "examDate",
      headerName: "تاريخ الامتحان",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "examTime",
      headerName: "وقت الامتحان",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "statusExam",
      headerName: "حالة الامتحان",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <span
            style={{
              color: "#efef",
              background: theme.palette.success.dark,
              padding: "7px 10px",
              borderRadius: 0.6 + "rem",
              pointerEvents: "none",
            }}
          >
            نشط ...
          </span>
        );
      },
    },
    {
      field: "delete",
      headerName: "حذف",
      renderCell: (params) => {
        return (
          <IconButton sx={{ color: theme.palette.error.main }}>
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

  return (
    <div className="ExamManagement-page">
      <HeaderLine title="ادارة الامتحانات" />

      <Row1 alignment={alignment} setAlignment={setAlignment} />

      <Box sx={{ height: 75 + "vh", width: "100%", mt: 2 }}>
        {alignment === "management" ? (
          <DataGrid
            rows={rows1}
            columns={column1}
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
        ) : null}
      </Box>
    </div>
  );
}
