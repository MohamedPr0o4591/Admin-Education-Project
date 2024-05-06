import React from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Container } from "react-bootstrap";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import "./PreparationPage.css";
import {
  CloseRounded,
  DeleteRounded,
  EditRounded,
  InfoRounded,
} from "@mui/icons-material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupComponent from "../../components/pages/preparation of classes/GroupComponent";

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

const PreparationPage = () => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [mood, setMood] = React.useState("create");
  const [deleteMood, setDeleteMood] = React.useState("");

  const [classTitle, setClassTitle] = React.useState("");
  const [groupName, setGroupName] = React.useState("");

  const [classesData, setClassesData] = React.useState([]);

  const [classDetails, setClassDetails] = React.useState([]);
  const [groupDetails, setGroupDetails] = React.useState([]);
  const theme = useTheme();

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (classTitle !== "") {
      if (mood === "edit") {
        handleEditClass(classDetails.id);
      } else {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API}class`,
            { name: classTitle },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          toast.success("تم إضافة الصف بنجاح");

          renderData();
          setClassTitle("");
          setOpen(false);
        } catch (err) {
          toast.error("الصف موجود بالفعل");
        }
      }
    } else {
      toast.warning("الرجاء ملء البيانات");
    }
  };

  const handleAddGroup = async (_) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}group`,
        {
          name: groupName,
          classId: classDetails.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("تم إضافة المجموعة بنجاح");
      showGroups();
      setOpen2(false);
      setGroupName("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenModal = (id, name) => {
    setClassDetails({
      id: id,
      name: name,
    });
  };

  const switchMode = (_) => {
    setClassTitle(classDetails.name);
    setMood("edit");
    window.scrollTo(0, 0);
  };

  const handleEditClass = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API}class/${id}`, {
        name: classTitle,
      });

      setMood("create");
      toast.success("تم تعديل الصف بنجاح");
      renderData();
      setClassTitle("");
      setClassDetails([]);
      setGroupDetails([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (deleteMood === "class") {
      try {
        await axios.delete(`${import.meta.env.VITE_API}class/${id}`);
        toast.success("تم حذف الصف بنجاح");
        renderData();
        setClassDetails({});
        setGroupDetails([]);
      } catch (err) {
        console.error(err);
      }
    } else if (deleteMood === "group") {
      try {
        await axios.delete(`${import.meta.env.VITE_API}group/${id}`);
        toast.success("تم حذف المجموعة بنجاح");
      } catch (err) {
        console.error(err);
      }
    }

    showGroups();
    setOpen(false);
    setOpen2(false);
  };

  const renderData = async (_) => {
    const res = await axios.get(`${import.meta.env.VITE_API}class`);
    setClassesData(res.data.classes);
  };

  const showGroups = async (_) => {
    if (classDetails.id) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}group/class/${classDetails.id}`
        );

        setGroupDetails(res.data.groups);
      } catch (err) {
        console.error(err);
      }
    }
  };

  React.useEffect(() => {
    renderData();
  }, []);

  React.useEffect(() => {
    if (mood !== "edit") {
      setClassTitle("");
    }
  }, [mood]);

  React.useEffect(() => {
    showGroups();
  }, [classDetails.id]);

  return (
    <div className="preparation-page">
      <ToastContainer position="top-right" />

      <HeaderLine title="الصفوف الدراسية" />
      <Container>
        <Stack gap={4}>
          {/* Row 1 */}
          <Paper sx={{ p: 2 }}>
            <h3 className="text-decoration-underline">أضف الصف الدراسى</h3>

            <span
              style={{ color: theme.palette.primary.main }}
              className="mt-5 d-block"
            >
              (مثال: الصف الاول الثانوى)
            </span>

            <p>ملاحظة: هذا هو مثال لاضافة صف دراسى</p>

            <form>
              <Stack direction="row" spacing={2} gap={2} flexWrap={"wrap"}>
                <div className="input-box flex-grow-1">
                  <input
                    type="text"
                    placeholder="الصف الدراسى"
                    style={{
                      background:
                        theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                      color: theme.palette.text.primary,
                      transform: mood === "edit" ? "scale(1.05)" : "scale(1)",
                      boxShadow:
                        mood === "edit"
                          ? `0 0 0.4rem ${theme.palette.background.paper}`
                          : "none",
                      transition: "all 0.3s ease-in",
                    }}
                    className="w-100"
                    value={classTitle}
                    onChange={(e) => setClassTitle(e.target.value)}
                  />
                </div>
                <Box flexGrow={1} />

                <Button
                  variant="contained"
                  color={mood === "edit" ? "success" : "primary"}
                  className="flex-grow-1"
                  type="submit"
                  onClick={handleAddClass}
                >
                  {mood === "edit" ? <span>تعديل</span> : <span>إضافة</span>}
                </Button>

                {mood === "edit" ? (
                  <Button
                    color="error"
                    variant="contained"
                    onClick={(_) => setMood("create")}
                  >
                    الغاء التعديل
                  </Button>
                ) : null}
              </Stack>
            </form>
          </Paper>

          {/* Row 2 */}
          <Paper sx={{ p: 2 }}>
            <h3 className="text-decoration-underline">الصفوف الدراسية</h3>

            <ul className="list-unstyled d-flex gap-2 mt-5 p-0 flex-wrap">
              {classesData.length > 0
                ? classesData.map((item, index) => {
                    return (
                      <li
                        onClick={(_) =>
                          handleOpenModal(item.id, item.name, "class")
                        }
                        key={index}
                      >
                        <Box
                          className="class-box"
                          sx={{
                            background:
                              classDetails.name === item.name
                                ? theme.palette.primary.main
                                : theme.palette.mode === "dark"
                                ? "#2d3437"
                                : "#ccdce1",
                            color:
                              classDetails.name === item.name
                                ? theme.palette.background.paper
                                : theme.palette.text.primary,
                            ":hover": {
                              background: "transparent",
                              boxShadow: `0 0 0.65rem ${theme.palette.primary.main}`,
                              transform: "scale(1.02)",
                            },
                          }}
                        >
                          {item.name}
                        </Box>
                      </li>
                    );
                  })
                : null}
            </ul>
          </Paper>

          {/* Row 3 */}
          <Paper sx={{ p: 2 }}>
            <h3 className="text-decoration-underline">
              إعداد المجاميع الدراسية
            </h3>

            <span
              style={{ color: theme.palette.primary.main }}
              className="d-block mt-3 mb-2"
            >
              <InfoRounded /> حدد الصف الدراسى من الاعلى
            </span>

            {classDetails.name && (
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                <span
                  className="fs-5 user-select-none border-bottom"
                  style={{ color: theme.palette.success.main }}
                >
                  {classDetails.name}
                </span>

                <Box flexGrow={1} />

                <ul className="list-unstyled m-0 d-flex gap-2 flex-wrap align-items-center">
                  <li>
                    <Button
                      color="success"
                      variant="contained"
                      onClick={switchMode}
                    >
                      <EditRounded /> تعديل الصف
                    </Button>
                  </li>
                  <li>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={(_) => {
                        setOpen(true);
                        setDeleteMood("class");
                      }}
                    >
                      <DeleteRounded /> حذف الصف
                    </Button>
                  </li>
                </ul>
              </Stack>
            )}

            {classDetails.name ? (
              <GroupComponent
                groupDetails={groupDetails}
                setDeleteMood={setDeleteMood}
                handleDelete={handleDelete}
                open2={open2}
                setOpen2={setOpen2}
                handleAddGroup={handleAddGroup}
                groupName={groupName}
                setGroupName={setGroupName}
              />
            ) : null}
          </Paper>
        </Stack>

        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <Box flexGrow={1} />

              <IconButton color="inherit" onClick={(_) => setOpen(false)}>
                <CloseRounded />
              </IconButton>
            </Stack>

            <p>
              هل متأكد من حذف{" "}
              <i style={{ color: theme.palette.primary.main }}>
                {classDetails.name}
              </i>
              ؟
            </p>

            <Stack direction={"row"} gap={2} mt={2}>
              <Box flexGrow={1} />

              <Button
                variant="contained"
                color="error"
                onClick={(_) => {
                  handleDelete(classDetails.id);
                }}
              >
                حذف
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default PreparationPage;
