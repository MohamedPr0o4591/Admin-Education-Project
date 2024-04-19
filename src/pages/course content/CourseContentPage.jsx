import React from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Box, IconButton, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { rows } from "./Data";
import { Button, useTheme } from "@mui/material";
import { DeleteRounded, EditRounded } from "@mui/icons-material";

function CourseContentPage() {
  const theme = useTheme();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
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
              p: "7px 10px",
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
      field: "chapterTitle",
      headerName: "عنوان الفصل",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lessonTitle",
      headerName: "عنوان الدرس",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lessonDesc",
      headerName: "وصف الدرس",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lessonDate",
      headerName: "تاريخ الحصة",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "حذف وتعديل",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <IconButton color="inherit">
              <EditRounded sx={{ color: theme.palette.success.main }} />
            </IconButton>

            <IconButton color="inherit">
              <DeleteRounded sx={{ color: theme.palette.error.main }} />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <div className="course-content-page">
      <HeaderLine title="فهرس المشروحات" />

      <Box sx={{ height: 75 + "vh", width: "100%" }}>
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
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default CourseContentPage;
