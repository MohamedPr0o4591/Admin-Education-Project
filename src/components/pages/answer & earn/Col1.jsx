import {
  Cancel,
  CheckCircle,
  CheckCircleOutline,
  HighlightOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses } from "../../../Redux/actions/Actions";

const Col1 = (props) => {
  const theme = useTheme();

  const [classesData, setClassesData] = useState([]);
  const [classDetails, setClassDetails] = useState([]);
  const dataClasses = useSelector((state) => state.CLASSES.classes);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllClasses());
  }, []);

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
    <Col xs={12} lg={6} className="col-1 d-flex gap-3 flex-column">
      <Stack gap={1}>
        <span style={{ color: theme.palette.primary.dark }}>
          اولا حدد المستوى التعليمي
        </span>
        {classesData.length > 0 && (
          <ToggleButtonGroup
            className="flex-column"
            color="primary"
            value={props.alignment}
            exclusive
            onChange={props.handleChange}
            aria-label="Platform"
            sx={{
              border: "1px solid rgba(255, 255, 255, 0.12);",
            }}
          >
            <Stack direction={"row"} flexWrap={"wrap"} alignItems={"center"}>
              {classDetails.arr1.length > 0 &&
                classDetails.arr1.map((item, index) => {
                  return (
                    <ToggleButton
                      key={index}
                      className="flex-grow-1"
                      value={item.name}
                      onClick={(_) => props.setClassId(item.id)}
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
                      key={index}
                      className="flex-grow-1"
                      value={item.name}
                      onClick={(_) => props.setClassId(item.id)}
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
                      key={index}
                      className="flex-grow-1"
                      value={item.name}
                      onClick={(_) => props.setClassId(item.id)}
                    >
                      {item.name}
                    </ToggleButton>
                  );
                })}
            </Stack>
          </ToggleButtonGroup>
        )}
      </Stack>

      <Stack direction={"row"} gap={2} alignItems={"center"} flexWrap={"wrap"}>
        <span style={{ color: theme.palette.primary.dark }}>نوع الاسئلة:</span>
        <Box flexGrow={1} />

        <span className="text-uppercase fw-bold text-decoration-underline user-select-none">
          mcq
        </span>
      </Stack>

      <form onSubmit={props.handleFormSubmit}>
        <Stack direction={"row"} gap={2}>
          <select
            className="flex-grow-1"
            value={props.language}
            onChange={(e) => props.setLanguage(e.target.value)}
            style={{
              color: theme.palette.text.primary,
              background: theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
            }}
          >
            <option value="Arabic">لغة السؤال : العربية</option>
            <option value="English">لغة السؤال : الإنجليزية</option>
          </select>

          <Box flexGrow={1} />
        </Stack>

        <Button
          variant="outlined"
          color="primary"
          onClick={(_) => {
            props.setOpenMenu((prev) => (prev === false ? true : false));
            props.setQuestionForm("");
          }}
          sx={{
            pointerEvents: props.alignment !== "" ? "auto" : "none",
            opacity: props.alignment !== "" ? "1" : "0.5",
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
              <ToggleButton className="flex-grow-1" value="اختيار من متعدد">
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

        <Stack gap={2} mt={3}>
          <Stack direction={"row"} gap={2} alignItems={"center"}>
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
                <Button variant="contained" color="success" type="submit">
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

          <span style={{ color: theme.palette.warning.dark }}>
            اذا كنت تريد مسح كل شي والبدء من جديد فقط عليك اعادة تحميل الصفحة
          </span>
        </Stack>
      </form>
    </Col>
  );
};

export default Col1;
