import React from "react";
import "./HomeWorkMPage.css";
import HeaderLine from "../../components/headerLine/HeaderLine";
import Row1 from "../../components/pages/homework management/Row1";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { rows1, rows2 } from "../../components/pages/homework management/Data";

export default function HomeWorkMPage() {
  const [alignment, setAlignment] = React.useState("pending");

  const theme = useTheme();

  const handleAddPoints = (studentName) => {
    console.log(studentName);
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
            onClick={(_) => handleAddPoints(params.row.studentName)}
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
            }}
          >
            {params.row.level}
          </span>
        );
      },
    },
    {
      field: "points",
      headerName: "عدد النقاط",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "result",
      headerName: "نتيجة الطالب",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
  ];

  return (
    <div className="home-work-management">
      <HeaderLine title="إدارة الواجبات المنزلية" />

      <Row1 alignment={alignment} setAlignment={setAlignment} />

      <Box sx={{ height: 75 + "vh", width: "100%", mt: 2 }}>
        {alignment === "pending" ? (
          <DataGrid
            rows={rows1}
            columns={columns1}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        ) : (
          <DataGrid
            rows={rows2}
            columns={columns2}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        )}
      </Box>
    </div>
  );
}
