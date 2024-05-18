import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Col } from "react-bootstrap";
import {
  Alert,
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Snackbar,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import FileUploader from "./../../../pages/course/FileUploader";
import HeaderLine from "../../headerLine/HeaderLine";
import {
  AddRounded,
  Cancel,
  CheckCircle,
  CheckCircleOutline,
  CloseRounded,
  DeleteRounded,
  HighlightOff,
} from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses, getUnits } from "../../../Redux/actions/Actions";

function Col1(props) {
  const correctDate = new Date().toLocaleDateString();
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
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const [classesData, setClassesData] = useState([]);
  const [classDetails, setClassDetails] = useState([]);
  const [unitsData, setUnitsData] = useState([]);
  const [classId, setClassId] = useState("");
  const [unitName, setUnitName] = useState("");

  const [mood, setMood] = useState("");

  const dataClasses = useSelector((state) => state.CLASSES.classes);
  const dataUnits = useSelector((state) => state.UNITS.units);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllClasses());
  }, []);

  React.useEffect(() => {
    dispatch(getUnits(classId));
  }, [classId]);

  React.useEffect(() => {
    setClassesData(dataClasses);
    let arr1 = dataClasses.filter(
      (item) =>
        item.name.includes("الابتدائى") || item.name.includes("الابتدائي")
    );

    let arr2 = dataClasses.filter(
      (item) => item.name.includes("الاعدادى") || item.name.includes("الاعدادي")
    );

    let arr3 = dataClasses.filter(
      (item) => item.name.includes("الثانوي") || item.name.includes("الثانوى")
    );

    setClassDetails({
      arr1,
      arr2,
      arr3,
    });
  }, [dataClasses]);

  React.useEffect(() => {
    setUnitsData(dataUnits);
  }, [dataUnits]);

  const handleAddUnit = async (id, name) => {
    props.setLoadingFetchData(true);
    try {
      await axios.post(`${import.meta.env.VITE_API}unit`, {
        name: name,
        classId: id,
      });

      setToastDetails({
        status: "success",
        message: "تم أضافة الوحدة بنجاح",
        open: true,
      });

      dispatch(getUnits(classId));

      setOpen(false);
      setUnitName("");
    } catch (err) {
      console.log(err);
    }

    props.setLoadingFetchData(false);
  };

  const handleDeleteUnit = async (id) => {
    props.setLoadingFetchData(true);

    try {
      await axios.delete(`${import.meta.env.VITE_API}unit/${id}`);

      setToastDetails({
        status: "success",
        message: "تم حذف الوحدة بنجاح",
        open: true,
      });

      dispatch(getUnits(classId));
      props.setUnitDetails([]);
    } catch (err) {
      console.error(err);
    }
    props.setLoadingFetchData(false);
  };

  const handleClick = (_) => {
    if (mood === "create") {
      handleAddUnit(classId, unitName);
      setUnitName("");
    } else if (mood === "delete-unit") {
      handleDeleteUnit(props.unitDetails.id);
      props.setTitle("");
    } else if (mood === "upload") {
      props.handleSendData();
    }

    setOpen(false);
  };

  const handleSetUnitDetails = (name, id) => {
    props.setUnitDetails({
      name,
      id,
    });
  };

  const answers = [
    {
      value: props.ans1,
    },
    {
      value: props.ans2,
    },
    {
      value: props.ans3,
    },
    {
      value: props.ans4,
    },
  ];

  return (
    <Col xs={12} lg={6} className="col-1">
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

      <Stack gap={2}>
        <Stack gap={1}>
          <span style={{ color: theme.palette.primary.dark }}>
            <strong className="text-danger fs-4">*</strong>اولا حدد المستوى
            التعليمي
          </span>

          {classesData.length > 0 ? (
            <ToggleButtonGroup
              color="success"
              value={props.alignment}
              exclusive
              onChange={props.handleChange}
              aria-label="Platform"
              className="flex-column"
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.12);",
              }}
            >
              <Stack direction={"row"} flexWrap={"wrap"} alignItems={"center"}>
                {classDetails.arr1.length > 0 &&
                  classDetails.arr1.map((item, index) => {
                    return (
                      <ToggleButton
                        className="flex-grow-1"
                        value={item.name}
                        key={index}
                        onClick={() => {
                          setClassId(item.id);
                          props.setUnitDetails([]);
                        }}
                      >
                        {item.name}
                      </ToggleButton>
                    );
                  })}
              </Stack>

              <Stack direction={"row"} flexWrap={"wrap"} alignItems={"center"}>
                {classDetails.arr2.length > 0 &&
                  classDetails.arr2.map((item, index) => {
                    return (
                      <ToggleButton
                        className="flex-grow-1"
                        value={item.name}
                        key={index}
                        onClick={() => {
                          setClassId(item.id);
                          props.setUnitDetails([]);
                        }}
                      >
                        {item.name}
                      </ToggleButton>
                    );
                  })}
              </Stack>

              <Stack direction={"row"} flexWrap={"wrap"} alignItems={"center"}>
                {classDetails.arr3.length > 0 &&
                  classDetails.arr3.map((item, index) => {
                    return (
                      <ToggleButton
                        className="flex-grow-1"
                        value={item.name}
                        key={index}
                        onClick={() => {
                          setClassId(item.id);
                          props.setUnitDetails([]);
                        }}
                      >
                        {item.name}
                      </ToggleButton>
                    );
                  })}
              </Stack>
            </ToggleButtonGroup>
          ) : null}
        </Stack>

        {props.alignment !== null && props.alignment !== "" ? (
          <Stack gap={2}>
            <Stack
              direction={"row"}
              gap={2}
              flexWrap={"wrap"}
              alignItems={"center"}
            >
              <span style={{ color: theme.palette.primary.dark }}>
                <strong className="text-danger fs-4">*</strong> اختر عنوان الفصل
              </span>

              {unitsData.length > 0 ? (
                <TextField
                  id="standard-select-currency"
                  select
                  defaultValue={""}
                  label="عنوان الفصل"
                  variant="filled"
                  className="flex-grow-1 "
                  onChange={(e) => props.setTitle(e.target.value)}
                >
                  {unitsData.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={item.name}
                        onClick={(_) =>
                          handleSetUnitDetails(item.name, item.id)
                        }
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              ) : null}

              <IconButton
                color="success"
                onClick={(_) => {
                  setOpen(true);
                  setMood("create");
                }}
              >
                <AddRounded />
              </IconButton>
            </Stack>

            <Stack
              direction={"row"}
              gap={3}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <span style={{ color: theme.palette.success.main }}>
                إسم الفصل المختار:
              </span>

              {props.unitDetails.name ? (
                <i>{props.unitDetails.name}</i>
              ) : (
                <span className="text-danger">غير محدد</span>
              )}

              <Box flexGrow={1} />

              <IconButton
                color="inherit"
                onClick={(_) => {
                  setMood("delete-unit");
                  setOpen(true);
                }}
              >
                <DeleteRounded sx={{ color: theme.palette.error.main }} />
              </IconButton>
            </Stack>
          </Stack>
        ) : null}

        <input
          className="flex-grow-1"
          type="text"
          placeholder="عنوان الدرس"
          value={props.lessonTitle}
          onChange={(e) => props.setLessonTitle(e.target.value)}
          style={{
            background: theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
            color: theme.palette.text.primary,
          }}
        />

        <textarea
          className="flex-grow-1"
          placeholder="وصف الدرس"
          value={props.lessonDesc}
          onChange={(e) => props.setLessonDesc(e.target.value)}
          rows={"4"}
          style={{
            background: theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
            color: theme.palette.text.primary,
          }}
        />

        <Stack gap={2}>
          <span style={{ color: theme.palette.primary.dark }}>
            <strong className="text-danger fs-4">*</strong> ضع رابط فيديو الشرح:
            (Youtube Video ID)
          </span>

          <input
            className="flex-grow-1"
            type="text"
            placeholder="ID الفيديو"
            value={props.videoLink}
            onChange={(e) => props.setVideoLink(e.target.value)}
            style={{
              background: theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
              color: theme.palette.text.primary,
              direction: "ltr",
            }}
          />
        </Stack>

        <Stack direction="row" gap={2} alignItems={"center"} flexWrap={"wrap"}>
          <span
            className="d-flex align-items-center gap-1"
            style={{ color: theme.palette.primary.dark }}
          >
            <strong className="text-danger fs-4 ">*</strong> فترة عرض الدرس
          </span>

          <span>من :</span>

          <p className="m-0 border-bottom user-select-none">{correctDate}</p>

          <span>الي :</span>

          <input
            type="date"
            title="موعد انتهاء الدرس"
            className="flex-grow-1"
            value={props.lessonExpireDate}
            onChange={(e) => props.setLessonExpireDate(e.target.value)}
            style={{
              background: theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
              color: theme.palette.text.primary,
              cursor: "pointer",
            }}
          />
        </Stack>

        <Stack>
          <span style={{ color: theme.palette.primary.dark }}>
            رفع مرفق لملف الشرح اذا تواجد مثل مذكرة الشرح PDF (اختياري)
          </span>

          <FileUploader
            files={props.lessonFile}
            setFiles={props.setLessonFile}
          />
        </Stack>

        <HeaderLine title="الواجب المنزلى" />

        <Stack gap={1}>
          <span style={{ color: theme.palette.primary.dark }}>
            حدد نوع الاسئلة
          </span>

          <ToggleButtonGroup
            color="primary"
            value={props.questionType}
            exclusive
            onChange={(_) => props.setQuestionType(event.target.value)}
            aria-label="Platform"
            sx={{
              border: "1px solid rgba(255, 255, 255, 0.12);",
            }}
          >
            <ToggleButton className="flex-grow-1" value="FORM">
              MCQ
            </ToggleButton>
            <ToggleButton className="flex-grow-1" value="PDF">
              PDF
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {props.questionType === "FORM" ? (
          <Stack gap={2}>
            <Stack gap={2}>
              <Stack direction={"row"} gap={2}>
                <Box flexGrow={1} />

                <select
                  className="flex-grow-1"
                  value={props.language}
                  onChange={(e) => props.setLanguage(e.target.value)}
                  style={{
                    color: theme.palette.text.primary,
                    background:
                      theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                  }}
                >
                  <option value="ar">لغة الصفحة : العربية</option>
                  <option value="en">لغة الصفحة : الإنجليزية</option>
                </select>
              </Stack>

              <Button
                variant="outlined"
                color="primary"
                onClick={(_) => {
                  props.setOpenMenu((prev) => (prev === false ? true : false));
                  props.setQuestionForm("");
                }}
              >
                أضف سؤالاً
              </Button>

              {props.openMenu ? (
                <Stack gap={1}>
                  <span style={{ color: theme.palette.primary.dark }}>
                    حدد نوع السؤال
                  </span>

                  <ToggleButtonGroup
                    color="primary"
                    value={props.questionForm}
                    exclusive
                    onChange={(_) => {
                      props.setQuestionForm(event.target.value);
                      props.setOpenMenu(false);
                    }}
                    aria-label="Platform"
                    sx={{
                      border: "1px solid rgba(255, 255, 255, 0.12);",
                    }}
                  >
                    <ToggleButton
                      className="flex-grow-1"
                      value="اختيار من متعدد"
                    >
                      اختيار من متعدد
                    </ToggleButton>
                    <ToggleButton
                      className="flex-grow-1"
                      value="اختر الاجابة الصحيحة"
                    >
                      اختر الاجابة الصحيحة
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
              ) : null}

              {/* ادخل السؤال */}

              {props.questionForm === "اختيار من متعدد" ? (
                <Stack gap={2}>
                  <span style={{ color: theme.palette.primary.dark }}>
                    ادخل السؤال وحدد الاخيارات
                  </span>

                  <input
                    className="flex-grow-1"
                    type="text"
                    placeholder="اكتب السؤال"
                    value={props.question1}
                    onChange={(e) => props.setQuestion1(e.target.value)}
                    style={{
                      background:
                        theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                      color: theme.palette.text.primary,
                    }}
                  />

                  <Stack direction={"row"} gap={2}>
                    <input
                      className="flex-grow-1"
                      type="text"
                      placeholder="الاختيار الاول"
                      value={props.ans1}
                      onChange={(e) => props.setAns1(e.target.value)}
                      style={{
                        background:
                          theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                        color: theme.palette.text.primary,
                      }}
                    />

                    <input
                      className="flex-grow-1"
                      type="text"
                      placeholder="الاختيار الثانى"
                      value={props.ans2}
                      onChange={(e) => props.setAns2(e.target.value)}
                      style={{
                        background:
                          theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                        color: theme.palette.text.primary,
                      }}
                    />
                  </Stack>

                  <Stack direction={"row"} gap={2}>
                    <input
                      className="flex-grow-1"
                      type="text"
                      placeholder="الاختيار الثالث"
                      value={props.ans3}
                      onChange={(e) => props.setAns3(e.target.value)}
                      style={{
                        background:
                          theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                        color: theme.palette.text.primary,
                      }}
                    />

                    <input
                      className="flex-grow-1"
                      type="text"
                      placeholder="الاختيار الرابع"
                      value={props.ans4}
                      onChange={(e) => props.setAns4(e.target.value)}
                      style={{
                        background:
                          theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                        color: theme.palette.text.primary,
                      }}
                    />
                  </Stack>

                  <span style={{ color: theme.palette.primary.dark }}>
                    حدد الاجابة الصحيحة
                  </span>

                  <Stack direction={"row"} gap={2}>
                    {answers.length > 0 ? (
                      <TextField
                        id="standard-select-currency"
                        select
                        defaultValue={""}
                        label="اختر الاجابة الصحيحة"
                        variant="filled"
                        className="flex-grow-1 "
                        onChange={(e) => props.setCorrectAns1(e.target.value)}
                      >
                        {answers.map((option, index) => (
                          <MenuItem key={index} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : null}

                    {/* درجة السؤال */}

                    <input
                      type="number"
                      placeholder="ادخل درجة السؤال"
                      value={props.questionMark}
                      onChange={(e) => props.setQuestionMark(e.target.value)}
                      style={{
                        background:
                          theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                        color: theme.palette.text.primary,
                      }}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      className="flex-grow-1"
                      onClick={props.handleAddQuestion}
                    >
                      أضف السؤال الى الصفحة
                    </Button>
                  </Stack>
                </Stack>
              ) : props.questionForm === "اختر الاجابة الصحيحة" ? (
                <Stack gap={2}>
                  <span style={{ color: theme.palette.primary.dark }}>
                    ادخل السؤال
                  </span>

                  <Stack direction={"row"} gap={2}>
                    <input
                      className="flex-grow-1"
                      type="text"
                      placeholder="اكتب السؤال"
                      value={props.question2}
                      onChange={(e) => props.setQuestion2(e.target.value)}
                      style={{
                        background:
                          theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                        color: theme.palette.text.primary,
                      }}
                    />
                    <IconButton color="inherit">
                      {props.correctAns2 === "true" ? (
                        <CheckCircle
                          className="fs-2"
                          sx={{ color: theme.palette.success.main }}
                        />
                      ) : (
                        <CheckCircleOutline
                          className="fs-2"
                          sx={{ color: theme.palette.success.main }}
                        />
                      )}
                    </IconButton>

                    <IconButton color="inherit">
                      {props.correctAns2 === "false" ? (
                        <Cancel
                          className="fs-2"
                          sx={{ color: theme.palette.error.main }}
                        />
                      ) : (
                        <HighlightOff
                          className="fs-2"
                          sx={{ color: theme.palette.error.main }}
                        />
                      )}
                    </IconButton>
                  </Stack>

                  <span style={{ color: theme.palette.primary.dark }}>
                    اختر الاجابة الصحيحة
                  </span>

                  <Stack direction={"row"} gap={2}>
                    <select
                      className="flex-grow-1"
                      value={props.correctAns2}
                      onChange={(e) => props.setCorrectAns2(e.target.value)}
                      style={{
                        color: theme.palette.text.primary,
                        background:
                          theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                      }}
                    >
                      <option value={"true"}>صحيح</option>
                      <option value={"false"}>خطأ</option>
                    </select>

                    {/* درجة السؤال */}

                    <input
                      type="number"
                      placeholder="ادخل درجة السؤال"
                      value={props.questionMark}
                      onChange={(e) => props.setQuestionMark(e.target.value)}
                      style={{
                        background:
                          theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                        color: theme.palette.text.primary,
                      }}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      className="flex-grow-1"
                      onClick={props.handleAddQuestion}
                    >
                      أضف السؤال الى الصفحة
                    </Button>
                  </Stack>
                </Stack>
              ) : null}
            </Stack>
          </Stack>
        ) : props.questionType === "PDF" ? (
          <Stack gap={2}>
            <Stack
              direction={"row"}
              gap={2}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <span>ادخل مجموعة نقاط اسئلة الواجب</span>

              <input
                className="flex-grow-1 border-0 py-3"
                type="number"
                placeholder="مجموعة نقاط اسئلة الواجب"
                value={props.score}
                onChange={(e) => props.setScore(e.target.value)}
                style={{
                  background:
                    theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                  color: theme.palette.text.primary,
                }}
              />
            </Stack>

            <Box>
              <span style={{ color: theme.palette.primary.dark }}>
                رفع ملف PDF / صورة لواجب منزلى اذا تواجد عن الدرس المذكور في
                الشرح
              </span>

              <FileUploader files={props.hWFile} setFiles={props.setHWFile} />
            </Box>
          </Stack>
        ) : null}

        <Stack direction={"row"} gap={2} mt={2}>
          <Box flexGrow={1} />

          <Button
            variant="contained"
            color="primary"
            onClick={(_) => {
              setOpen(true);
              setMood("upload");
            }}
          >
            رفع الدرس
          </Button>
        </Stack>
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

          {mood === "upload" ? (
            <span>لرفع الدرس اضعط للتأكيد</span>
          ) : mood === "create" ? (
            <Stack gap={2}>
              <span>
                <strong className="text-danger fs-4">*</strong> اسم الفصل
              </span>

              <input
                className="flex-grow-1 border-0 py-3"
                type="text"
                placeholder="ادخل اسم الفصل"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                style={{
                  background:
                    theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                  color: theme.palette.text.primary,
                }}
              />
            </Stack>
          ) : (
            <Stack direction={"row"} gap={3} alignItems={"center"}>
              <span>هل تريد بالفعل حذف</span>

              <strong className="border-bottom">
                {props.unitDetails.name}
              </strong>
            </Stack>
          )}

          <Stack direction={"row"} gap={2} mt={2}>
            <Box flexGrow={1} />

            <Button
              variant="contained"
              color={mood === "delete-unit" ? "error" : "success"}
              onClick={handleClick}
              disabled={props.loadingFetchData}
            >
              {props.loadingFetchData
                ? "جاري التحميل ..."
                : mood === "upload"
                ? "رفع الدرس"
                : mood === "create"
                ? "اضافة فصل جديد"
                : "حذف"}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Col>
  );
}

export default Col1;
