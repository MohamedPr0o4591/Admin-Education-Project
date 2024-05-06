import React, { useRef } from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { rows } from "./Data";
import { Button, IconButton, Typography, useTheme } from "@mui/material";
import { Visibility } from "@mui/icons-material";

function StudentManagementPage() {
  const theme = useTheme();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
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
      field: "phoneNumber",
      headerName: "رقم الطالب",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "parentPhoneNumber",
      headerName: "رقم ولي الأمر",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "educationLevel",
      headerName: "المستوى التعليمي",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              background: params.row.educationLevel.includes("الاول")
                ? theme.palette.primary.main
                : params.row.educationLevel.includes("الثانى")
                ? theme.palette.warning.main
                : theme.palette.success.main,
              p: "7px 2px",
              borderRadius: 0.6 + "rem",
              color: theme.palette.background.default,
              pointerEvents: "none",
            }}
          >
            {params.row.educationLevel}
          </Box>
        );
      },
    },
    {
      field: "address",
      headerName: "عنوان الطالب",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "groupNumber",
      headerName: "رقم المجموعة",
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
              cursor: "pointer",
            }}
          >
            {params.row.groupNumber}
          </Box>
        );
      },
    },
    {
      field: "points",
      headerName: "عدد النقاط",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "accountStatus",
      headerName: "حالة الحساب",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              p: "8px 10px",
              background: theme.palette.success.main,
              borderRadius: 0.6 + "rem",
              color: theme.palette.background.default,
              pointerEvents: "none",
            }}
          >
            مفعل
          </Box>
        );
      },
    },
    {
      field: "accountManagement",
      headerName: "ادارة الحساب",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button
            sx={{
              px: 10 + "px",
              borderRadius: 0.6 + "rem",
              color: "#efef",
              cursor: "pointer",
            }}
            variant="contained"
            color="error"
          >
            الغاء التفعيل
          </Button>
        );
      },
    },
    {
      field: "activities",
      headerName: "النشاطات",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <IconButton color="primary">
            <Visibility />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div className="students-management-page ">
      <HeaderLine title="إدارة الطلاب" />

      <Box sx={{ height: 75 + "vh", minWidth: "1200px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
    </div>
  );
}

export default StudentManagementPage;
