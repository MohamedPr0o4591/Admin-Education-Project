import React, { useState } from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  useTheme,
} from "@mui/material";
import { DeleteRounded, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents, getGroups } from "../../Redux/actions/Actions";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function StudentManagementPage() {
  const theme = useTheme();

  const [rows, setRows] = useState([]);

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
          <span
            style={{
              background:
                params?.row?.educationLevel?.name?.includes("الاول") ||
                params?.row?.educationLevel?.name?.includes("الأول")
                  ? theme.palette.primary.main
                  : params?.row?.educationLevel?.name?.includes("الثانى") ||
                    params?.row?.educationLevel?.name?.includes("الثاني")
                  ? theme.palette.warning.main
                  : theme.palette.success.main,
              color: theme.palette.background.default,
              padding: "7px 10px",
              borderRadius: 0.6 + "rem",
              pointerEvents: "none",
            }}
          >
            {params.row.educationLevel?.name}
          </span>
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
      headerName: "اسم المجموعة",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button
            title="اضغط لتغيير المجموعة"
            sx={{
              border: "1px groove " + theme.palette.primary.main,
              p: "8px 30px",
              borderRadius: 2 + "rem",
              cursor: "pointer",
            }}
            onClick={(e) =>
              handleClick(
                e,
                params.row.accountManagement,
                params.row.educationLevel.id
              )
            }
          >
            <span>{params.row.groupNumber.name}</span>
          </Button>
        );
      },
    },
    {
      field: "points",
      headerName: "عدد النقاط",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <span>{(+params.row.points).toLocaleString()}</span>;
      },
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
            className="user-select-none"
            sx={{
              p: "8px 10px",
              background: params.row.accountStatus
                ? theme.palette.success.dark
                : theme.palette.error.dark,
              borderRadius: 0.6 + "rem",
              color: "#efef",
              pointerEvents: "none",
            }}
          >
            {!params.row.accountStatus ? "غير مفعل" : "مفعل"}
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
            color={params.row.accountStatus ? "error" : "success"}
            onClick={(_) =>
              handleChangeAccountStatus(
                params.row.accountStatus,
                params.row.accountManagement
              )
            }
          >
            {params.row.accountStatus ? "تعطيل الحساب" : "تفعيل الحساب"}
          </Button>
        );
      },
    },
    {
      field: "deleteAction",
      headerName: "حذف",
      width: 44,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <IconButton color="error" title="حذف الطالب">
            <DeleteRounded />
          </IconButton>
        );
      },
    },
  ];

  const dataStudents = useSelector((state) => state.STUDENTS.studentsData);
  const dataGroups = useSelector((state) => state.GROUPS.groups);
  const dispatch = useDispatch();

  const [studentDetails, setStudentDetails] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, studentId, classId) => {
    setStudentDetails({
      studentId,
      classId,
    });
    dispatch(getGroups(classId));
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (id) => {
    if (id) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_API}teacher/changeStudentGroup/${
            studentDetails.studentId
          }`,
          { groupId: id }
        );

        dispatch(getAllStudents());
        toast.success(`تم تغيير المجموعة بنجاح`);
      } catch (err) {
        console.error(err);
      }
    }

    setAnchorEl(null);
  };

  const handleChangeAccountStatus = async (status, id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API}teacher/verifyStudent/${id}`,
        { verified: !status }
      );

      dispatch(getAllStudents());
      toast.success(`تم تغيير حالة الحساب بنجاح`);
    } catch (err) {
      toast.error(`حدث خطأ اثناء تغيير حالة الحساب`);
    }
  };

  React.useEffect(() => {
    dispatch(getAllStudents());
  }, []);

  React.useEffect(() => {
    if (dataStudents.length > 0) {
      let allStudents = dataStudents.map((student, index) => {
        return {
          id: index + 1,
          studentName: student.userName,
          phoneNumber: student.phone,
          educationLevel: {
            name: student.ClassSchema,
            id: student.classId,
          },
          groupNumber: {
            name: student.GroupSchema,
            id: student.groupId,
          },
          points: student.totalPoints,
          parentPhoneNumber: student.parentPhoneNumber,
          address: student.address,
          accountStatus: student.verified,
          accountManagement: student.id,
        };
      });

      setRows(allStudents);
    }
  }, [dataStudents]);

  React.useEffect(() => {
    setGroupsData(dataGroups);
  }, [dataGroups]);

  return (
    <div className="students-management-page ">
      <HeaderLine title="إدارة الطلاب" />

      <ToastContainer position="top-right" />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {groupsData.map((group, index) => (
          <MenuItem key={index} onClick={(_) => handleClose(group.id)}>
            {group.name}
          </MenuItem>
        ))}
      </Menu>

      <Box sx={{ height: 75 + "vh", minWidth: "1200px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
        />
      </Box>
    </div>
  );
}

export default StudentManagementPage;
