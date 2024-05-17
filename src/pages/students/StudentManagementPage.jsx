import React, { useState } from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  Alert,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Snackbar,
  Stack,
  useTheme,
} from "@mui/material";
import { CloseRounded, DeleteRounded, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents, getGroups } from "../../Redux/actions/Actions";
import axios from "axios";

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
function StudentManagementPage() {
  const getColorForSeverity = (severity) => {
    switch (severity) {
      case "success":
        return "#4caf50"; // green
      case "error":
        return "#f44336"; // red
      case "warning":
        return "#ff9800"; // orange
      case "info":
        return "#2196f3"; // blue
      default:
        return "#000"; // black
    }
  };

  const initialToast = {
    status: "",
    message: "",
    open: false,
  };

  const [toastDetails, setToastDetails] = useState(initialToast);
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
          <IconButton
            color="error"
            title="حذف الطالب"
            onClick={(_) =>
              handleOpenModal(
                params.row.accountManagement,
                params.row.studentName
              )
            }
          >
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
  const [openModal, setOpenModal] = React.useState(false);
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

        setToastDetails({
          status: "success",
          message: "تم تغيير المجموعة بنجاح",
          open: true,
        });
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
      setToastDetails({
        status: "success",
        message: "تم تغيير حالة الحساب بنجاح",
        open: true,
      });
    } catch (err) {
      setToastDetails({
        status: "error",
        message: "حدث خطأ اثناء تغيير حالة الحساب",
        open: true,
      });
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}student/${id}`);

      setToastDetails({
        status: "success",
        message: "تم حذف الطالب بنجاح",
        open: true,
      });
      dispatch(getAllStudents());
    } catch (err) {
      setToastDetails({
        status: "error",
        message: "حدث خطأ اثناء حذف الطالب",
        open: true,
      });
    }

    setOpenModal(false);
  };

  const handleOpenModal = (studentId, studentName) => {
    setStudentDetails({
      ...studentDetails,
      studentId,
      studentName,
    });

    setOpenModal(true);
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
    } else {
      setRows([]);
    }
  }, [dataStudents]);

  React.useEffect(() => {
    setGroupsData(dataGroups);
  }, [dataGroups]);

  return (
    <div className="students-management-page ">
      <HeaderLine title="إدارة الطلاب" />

      <Snackbar
        open={toastDetails.open}
        autoHideDuration={5000}
        onClose={(_) => setToastDetails({ ...toastDetails, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={(_) => setToastDetails({ ...toastDetails, open: false })}
          severity={toastDetails.status}
          style={{
            backgroundColor: getColorForSeverity(toastDetails.status),
            padding: "10px 50px",
          }}
        >
          {toastDetails.message}
        </Alert>
      </Snackbar>

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

      <Modal
        open={openModal}
        onClose={(_) => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction={"row"} gap={2}>
            <Box flexGrow={1} />

            <IconButton
              color="inherit"
              onClick={(_) => setOpenModal(false)}
              aria-label="close"
            >
              <CloseRounded />
            </IconButton>
          </Stack>
          <span className="d-flex gap-2">
            هل انت متأكد من حذف{" "}
            <p className="fw-bold text-danger">{studentDetails.studentName}</p>؟
          </span>
          <Stack direction={"row"} gap={2}>
            <Box flexGrow={1} />

            <Button
              variant="contained"
              color="error"
              onClick={(_) => deleteStudent(studentDetails.studentId)}
            >
              حذف
            </Button>
          </Stack>
        </Box>
      </Modal>

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
