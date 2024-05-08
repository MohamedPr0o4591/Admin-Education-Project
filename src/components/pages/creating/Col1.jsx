import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Col } from "react-bootstrap";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import {
  Cancel,
  CheckCircle,
  CheckCircleOutline,
  HighlightOff,
} from "@mui/icons-material";
import FileUploader from "../../../pages/course/FileUploader";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses, getGroups } from "../../../Redux/actions/Actions";

export default function Col1(props) {
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

  const handleDateChange = (e) => {
    const date = e.target.type === "date" ? e.target.valueAsDate : new Date();
    const time = e.target.type === "time" ? e.target.valueAsDate : new Date();
    props.setSelectedDateTime(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      )
    );
  };

  const [allClasses, setAllClasses] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [groupDetails, setGroupDetails] = useState([]);

  const dataClasses = useSelector((state) => state.CLASSES.classes);
  const dataGroups = useSelector((state) => state.GROUPS.groups);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllClasses());
  }, []);

  React.useEffect(() => {
    setAllClasses(dataClasses);
  }, [dataClasses]);

  const handleChangeClass = (id) => {
    props.setClassDetails({
      id,
    });
    dispatch(getGroups(id));
  };

  React.useEffect(() => {
    setGroupsData(dataGroups);
  }, [dataGroups]);

  return (
    <Col xs={12} lg={6} className="col-1">
      <Stack gap={2}>
        <Stack gap={1}>
          <span style={{ color: props.theme.palette.primary.dark }}>
            اولا حدد المستوى التعليمي
          </span>
          {allClasses.length > 0 && (
            <ToggleButtonGroup
              color="primary"
              value={props.alignment}
              exclusive
              onChange={(_) => props.setAlignment(event.target.value)}
              aria-label="Platform"
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.12);",
              }}
              className="flex-wrap"
            >
              {allClasses.map((data, index) => {
                return (
                  <ToggleButton
                    color="success"
                    key={index}
                    className="flex-grow-1"
                    value={data.name}
                    onClick={(_) => handleChangeClass(data.id)}
                  >
                    {data.name}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          )}
        </Stack>

        {props.alignment !== "" ? (
          <Stack gap={1}>
            <span style={{ color: props.theme.palette.primary.dark }}>
              حدد رقم المجموعة
            </span>

            {groupsData.length > 0 ? (
              <ToggleButtonGroup
                color="success"
                value={props.groupNumber}
                onChange={props.handleFormatChange}
                aria-label="text formatting"
                sx={{
                  border: "1px solid rgba(255, 255, 255, 0.12);",
                }}
              >
                {groupsData.map((data, index) => {
                  return (
                    <ToggleButton
                      key={index}
                      className="flex-grow-1"
                      value={data.id}
                    >
                      {data.name}
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>
            ) : (
              <span className="text-danger">لا يوجد مجموعات</span>
            )}
          </Stack>
        ) : null}

        <Stack
          gap={1}
          sx={{
            pointerEvents: props.groupNumber.length > 0 ? "auto" : "none",
            opacity: props.groupNumber.length > 0 ? 1 : 0.5,
          }}
        >
          <span style={{ color: props.theme.palette.primary.dark }}>
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
              FORM
            </ToggleButton>
            <ToggleButton className="flex-grow-1" value="PDF">
              PDF / صورة
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {props.questionType === "FORM" ? (
          <Stack gap={2}>
            <Stack gap={2}>
              <Stack direction={"row"} gap={2}>
                <input
                  className="flex-grow-1"
                  type="text"
                  placeholder="عنوان الامتحان  (امتحان شامل)"
                  value={props.examTitle}
                  onChange={(e) => props.setExamTitle(e.target.value)}
                  style={{
                    background:
                      props.theme.palette.mode === "dark"
                        ? "#242424"
                        : "#f1faf1",
                    color: props.theme.palette.text.primary,
                  }}
                />

                <select
                  className="flex-grow-1"
                  value={props.language}
                  onChange={(e) => props.setLanguage(e.target.value)}
                  style={{
                    color: props.theme.palette.text.primary,
                    background:
                      props.theme.palette.mode === "dark"
                        ? "#242424"
                        : "#f1faf1",
                  }}
                >
                  <option value="Arabic">لغة الصفحة : العربية</option>
                  <option value="English">لغة الصفحة : الإنجليزية</option>
                </select>

                <select
                  className="flex-grow-1"
                  value={props.examTime}
                  onChange={(e) => props.setExamTime(e.target.value)}
                  style={{
                    color: props.theme.palette.text.primary,
                    background:
                      props.theme.palette.mode === "dark"
                        ? "#242424"
                        : "#f1faf1",
                  }}
                >
                  <option value="30">مدة الامتحان : نصف ساعة</option>
                  <option value="60">مدة الامتحان : ساعة واحدة</option>
                  <option value="90">مدة الامتحان : ساعة ونصف</option>
                  <option value="120">مدة الامتحان : ساعتان</option>
                </select>
              </Stack>

              <textarea
                className="flex-grow-1"
                placeholder="وصف عن الامتحان"
                value={props.materialDesc}
                onChange={(e) => props.setMaterialDesc(e.target.value)}
                rows={"4"}
                style={{
                  background:
                    props.theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                  color: props.theme.palette.text.primary,
                }}
              />

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
                  <span style={{ color: props.theme.palette.primary.dark }}>
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
                  <span style={{ color: props.theme.palette.primary.dark }}>
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
                        props.theme.palette.mode === "dark"
                          ? "#242424"
                          : "#f1faf1",
                      color: props.theme.palette.text.primary,
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
                          props.theme.palette.mode === "dark"
                            ? "#242424"
                            : "#f1faf1",
                        color: props.theme.palette.text.primary,
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
                          props.theme.palette.mode === "dark"
                            ? "#242424"
                            : "#f1faf1",
                        color: props.theme.palette.text.primary,
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
                          props.theme.palette.mode === "dark"
                            ? "#242424"
                            : "#f1faf1",
                        color: props.theme.palette.text.primary,
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
                          props.theme.palette.mode === "dark"
                            ? "#242424"
                            : "#f1faf1",
                        color: props.theme.palette.text.primary,
                      }}
                    />
                  </Stack>

                  <span style={{ color: props.theme.palette.primary.dark }}>
                    حدد الاجابة الصحيحة
                  </span>

                  <Stack direction={"row"} gap={2}>
                    <TextField
                      id="standard-select-currency"
                      select
                      defaultValue=""
                      label="اختر الاجابة الصحيحة"
                      variant="filled"
                      className="flex-grow-1 "
                      onChange={(e) => props.setCorrectAns1(e.target.value)}
                    >
                      {answers.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>

                    {/* درجة السؤال */}

                    <input
                      type="number"
                      placeholder="ادخل درجة السؤال"
                      value={props.questionMark}
                      onChange={(e) => props.setQuestionMark(e.target.value)}
                      style={{
                        background:
                          props.theme.palette.mode === "dark"
                            ? "#242424"
                            : "#f1faf1",
                        color: props.theme.palette.text.primary,
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
                  <span style={{ color: props.theme.palette.primary.dark }}>
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
                          props.theme.palette.mode === "dark"
                            ? "#242424"
                            : "#f1faf1",
                        color: props.theme.palette.text.primary,
                      }}
                    />
                    <IconButton color="inherit">
                      {props.correctAns2 === "true" ? (
                        <CheckCircle
                          className="fs-2"
                          sx={{ color: props.theme.palette.success.main }}
                        />
                      ) : (
                        <CheckCircleOutline
                          className="fs-2"
                          sx={{ color: props.theme.palette.success.main }}
                        />
                      )}
                    </IconButton>

                    <IconButton color="inherit">
                      {props.correctAns2 === "false" ? (
                        <Cancel
                          className="fs-2"
                          sx={{ color: props.theme.palette.error.main }}
                        />
                      ) : (
                        <HighlightOff
                          className="fs-2"
                          sx={{ color: props.theme.palette.error.main }}
                        />
                      )}
                    </IconButton>
                  </Stack>

                  <span style={{ color: props.theme.palette.primary.dark }}>
                    اختر الاجابة الصحيحة
                  </span>

                  <Stack direction={"row"} gap={2}>
                    <select
                      className="flex-grow-1"
                      value={props.correctAns2}
                      onChange={(e) => props.setCorrectAns2(e.target.value)}
                      style={{
                        color: props.theme.palette.text.primary,
                        background:
                          props.theme.palette.mode === "dark"
                            ? "#242424"
                            : "#f1faf1",
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
                          props.theme.palette.mode === "dark"
                            ? "#242424"
                            : "#f1faf1",
                        color: props.theme.palette.text.primary,
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
            <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
              <input
                className="flex-grow-1"
                type="text"
                placeholder="عنوان الامتحان  (امتحان شامل)"
                value={props.examTitle}
                onChange={(e) => props.setExamTitle(e.target.value)}
                style={{
                  background:
                    props.theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                  color: props.theme.palette.text.primary,
                }}
              />

              <input
                className="flex-grow-1"
                type="number"
                placeholder="مجموع درجات الامتحان"
                value={props.score}
                onChange={(e) => props.setScore(e.target.value)}
                style={{
                  background:
                    props.theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                  color: props.theme.palette.text.primary,
                }}
              />

              <select
                className="flex-grow-1"
                value={props.examTime}
                onChange={(e) => props.setExamTime(e.target.value)}
                style={{
                  color: props.theme.palette.text.primary,
                  background:
                    props.theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                }}
              >
                <option value="30">مدة الامتحان : نصف ساعة</option>
                <option value="60">مدة الامتحان : ساعة واحدة</option>
                <option value="90">مدة الامتحان : ساعة ونصف</option>
                <option value="120">مدة الامتحان : ساعتان</option>
              </select>
            </Stack>

            <span style={{ color: props.theme.palette.primary.dark }}>
              قم برفع الملف هنا
            </span>

            <Box>
              <FileUploader files={props.files} setFiles={props.setFiles} />
            </Box>
          </Stack>
        ) : null}

        <Stack
          direction={"row"}
          gap={2}
          flexWrap={"wrap"}
          sx={{
            pointerEvents: props.groupNumber.length > 0 ? "auto" : "none",
            opacity: props.groupNumber.length > 0 ? 1 : 0.5,
          }}
        >
          <span style={{ color: props.theme.palette.primary.dark }}>
            تحديد موعد عرض الامتحان
          </span>

          <Box flexGrow={1} />

          <div className="d-flex gap-2">
            <input type="date" onChange={handleDateChange} />
            <input type="time" onChange={handleDateChange} />
          </div>
        </Stack>

        <Stack
          direction={"row"}
          gap={2}
          alignItems={"center"}
          sx={{
            pointerEvents: props.groupNumber.length > 0 ? "auto" : "none",
            opacity: props.groupNumber.length > 0 ? 1 : 0.5,
          }}
        >
          <span
            className="finished-question"
            onClick={(_) =>
              props.setFinished((prev) => (prev === false ? true : false))
            }
          >
            هل انتهيت من الاسئلة ؟؟
          </span>
          <Box flexGrow={1} />

          {props.finished ? (
            <Stack direction={"row"} gap={2}>
              <Button
                variant="contained"
                color="success"
                onClick={props.handleSendExam}
              >
                نعم انتهيت
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={(_) => props.setFinished(false)}
              >
                لا, لم انتهي
              </Button>
            </Stack>
          ) : null}
        </Stack>

        <span style={{ color: props.theme.palette.warning.dark }}>
          اذا كنت تريد مسح كل شي والبدء من جديد فقط عليك اعادة تحميل الصفحة
        </span>
      </Stack>
    </Col>
  );
}
