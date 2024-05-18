import React, { useState } from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Box, IconButton, Modal, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Button, useTheme } from "@mui/material";
import { CloseRounded, DeleteRounded, EditRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllLessons } from "../../Redux/actions/Actions";
import "./CourseContentPage.css";
import FileUploader from "../course/FileUploader";
import axios from "axios";
import { toast } from "react-toastify";

function CourseContentPage() {
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

  const theme = useTheme();
  const [rows, setRows] = useState([]);

  const dataLessons = useSelector((state) => state.GETALLLESSONS.lessons);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [loadingFetchData, setLoadingFetchData] = useState(false);
  const [lessonDetails, setLessonDetails] = useState([]);
  const [file, setFile] = useState();
  const [mood, setMood] = useState("");

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
          <span
            style={{
              background:
                params.row.educationLevel.includes("الاول") ||
                params.row.educationLevel.includes("الأول")
                  ? theme.palette.primary.main
                  : params.row.educationLevel.includes("الثانى") ||
                    params.row.educationLevel.includes("الثاني")
                  ? theme.palette.warning.main
                  : theme.palette.success.main,
              color: theme.palette.background.default,
              padding: "7px 10px",
              borderRadius: 0.6 + "rem",
              pointerEvents: "none",
            }}
          >
            {params.row.educationLevel}
          </span>
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
      headerName: "اسم الدرس",
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
      field: "homeWork",
      headerName: "الواجب",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Box className="d-flex gap-2 align-items-center">
            {params.row.homeWork.type === "PDF" ? (
              <Button variant="contained" color="error">
                <a
                  href={`${import.meta.env.VITE_API}${
                    params.row.homeWork.file
                  }`}
                  target="_blank"
                  className="text-decoration-none text-white"
                >
                  {params.row.homeWork.type}
                </a>
              </Button>
            ) : (
              <span>{params.row.homeWork.type}</span>
            )}
          </Box>
        );
      },
    },
    {
      field: "score",
      headerName: "مجموع درجات الواجب",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Box className="d-flex gap-2 align-items-center">
            <p className="m-0 text-danger">
              {(+params.row.score).toLocaleString()}
            </p>
            <span>درجة</span>
          </Box>
        );
      },
    },
    {
      field: "lessonDate",
      headerName: "تاريخ الحصة",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Box className="d-flex gap-2 align-items-center">
            <p className="m-0 ">{params.row.lessonDate}</p>
          </Box>
        );
      },
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
            <IconButton
              color="inherit"
              onClick={(_) =>
                handleActions("edit", params.row.action, params.row.lessonTitle)
              }
            >
              <EditRounded sx={{ color: theme.palette.success.main }} />
            </IconButton>

            <IconButton
              color="inherit"
              onClick={(_) =>
                handleActions(
                  "delete",
                  params.row.action,
                  params.row.lessonTitle
                )
              }
            >
              <DeleteRounded sx={{ color: theme.palette.error.main }} />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const handleActions = (action, id, name) => {
    setMood(action);
    setLessonDetails({
      id,
      name,
    });
    setOpen(true);
  };

  React.useEffect(() => {
    dispatch(getAllLessons());
    document.title = "فهرس المشروحات";
  }, []);

  React.useEffect(() => {
    let newArr = [];

    if (dataLessons.length > 0) {
      for (let i = 0; i < dataLessons.length; i++) {
        newArr.push({
          id: i + 1,
          educationLevel: dataLessons[i].unit.class.name,
          chapterTitle: dataLessons[i].unit.name,
          lessonTitle: dataLessons[i].title,
          lessonDesc: dataLessons[i].description,
          lessonDate: dataLessons[i].updatedAt.split("T")[0],
          homeWork: {
            type: dataLessons[i].questionType,
            file: dataLessons[i].homeworkFile,
          },
          score: dataLessons[i].score,
          action: dataLessons[i].id,
        });
      }

      setRows(newArr);
    } else setRows([]);
  }, [dataLessons]);

  const handleSubmitAction = async (_) => {
    setLoadingFetchData(true);
    try {
      if (mood === "delete") {
        await axios.delete(
          `${import.meta.env.VITE_API}lesson/${lessonDetails.id}`
        );
        toast.success("تم حذف الدرس بنجاح");
        setOpen(false);
        dispatch(getAllLessons());
      } else if (mood === "edit") {
        if (
          lessonDetails.name !== undefined &&
          lessonDetails.desc !== undefined &&
          lessonDetails.video !== undefined &&
          file
        ) {
          const formData = new FormData();
          formData.append("title", lessonDetails.title);
          formData.append("description", lessonDetails.desc);
          formData.append("videoUrl", lessonDetails.video);
          formData.append("file", file[0]);

          await axios.patch(
            `${import.meta.env.VITE_API}lesson/${lessonDetails.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          toast.success("تم حفظ البيانات بنجاح");
          dispatch(getAllLessons());

          setOpen(false);
          setFile(undefined);
        } else toast.warning("برجاء ملء الحقول التى تريد تغييرها");
      }
    } catch (err) {
      toast.error("حدث خطأ ما");
    }

    setLoadingFetchData(false);
  };

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
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </Box>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack gap={2} sx={style}>
          <Stack direction={"row"}>
            <Box flexGrow={1} />

            <IconButton color="inherit" onClick={(_) => setOpen(false)}>
              <CloseRounded />
            </IconButton>
          </Stack>

          {mood === "delete" ? (
            <Box className="d-flex gap-3">
              <span> هل متأكد من حذف </span>
              <p className="text-danger">{lessonDetails.name}</p>
            </Box>
          ) : mood === "edit" ? (
            <Stack gap={2}>
              <div className="d-flex gap-3">
                <span>تعديل على بيانات الدرس بـ عنوان</span>
                <p className="m-0 text-danger">{lessonDetails.name}</p>
              </div>

              <input
                className="flex-grow-1"
                type="text"
                placeholder="اسم الدرس "
                value={lessonDetails.title}
                onChange={(e) =>
                  setLessonDetails({
                    ...lessonDetails,
                    title: e.target.value,
                  })
                }
                style={{
                  background:
                    theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                  color: theme.palette.text.primary,
                }}
              />

              <input
                className="flex-grow-1"
                type="text"
                placeholder="وصف الدرس "
                value={lessonDetails.desc}
                onChange={(e) =>
                  setLessonDetails({
                    ...lessonDetails,
                    desc: e.target.value,
                  })
                }
                style={{
                  background:
                    theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                  color: theme.palette.text.primary,
                }}
              />

              <input
                className="flex-grow-1"
                type="text"
                placeholder="فيديو الشرح ID Youtube "
                value={lessonDetails.video}
                onChange={(e) =>
                  setLessonDetails({
                    ...lessonDetails,
                    video: e.target.value,
                  })
                }
                style={{
                  background:
                    theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                  color: theme.palette.text.primary,
                }}
              />

              <Box className="mt-2">
                <span>تغيير مرفق الشرح (اختياري)</span>
                <FileUploader files={file} setFiles={setFile} />
              </Box>
            </Stack>
          ) : null}

          <Stack direction={"row"}>
            <Box flexGrow={1} />

            <Button
              variant="contained"
              color={mood === "delete" ? "error" : "success"}
              onClick={handleSubmitAction}
              disabled={loadingFetchData}
            >
              {loadingFetchData
                ? "جاري التحميل"
                : mood === "delete"
                ? "حذف الدرس"
                : "حفظ التعديلات"}
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}

export default CourseContentPage;
