import React from "react";
import "./CreatingPage.css";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Col, Container, Row } from "react-bootstrap";
import { Box, Button, IconButton, Paper, Stack, useTheme } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  Cancel,
  CheckCircle,
  CheckCircleOutline,
  DeleteRounded,
  HighlightOff,
} from "@mui/icons-material";
import FileUploader from "../course/FileUploader";

function CreatingPage() {
  const [CreateType, setCreateType] = React.useState("HW");
  const [alignment, setAlignment] = React.useState("");
  const [groupNumber, setGroupNumber] = React.useState("");
  const [questionType, setQuestionType] = React.useState("");
  const [questionForm, setQuestionForm] = React.useState("");

  const [materialName, setMaterialName] = React.useState("");
  const [materialDesc, setMaterialDesc] = React.useState("");
  const [language, setLanguage] = React.useState("ar");

  const [openMenu, setOpenMenu] = React.useState(false);

  //   سؤال متعدد الاجابات
  const [question1, setQuestion1] = React.useState("");
  const [ans1, setAns1] = React.useState("");
  const [ans2, setAns2] = React.useState("");
  const [ans3, setAns3] = React.useState("");
  const [ans4, setAns4] = React.useState("");
  const [correctAns1, setCorrectAns1] = React.useState(ans1);

  const [question2, setQuestion2] = React.useState("");
  const [correctAns2, setCorrectAns2] = React.useState("true");

  const [finished, setFinished] = React.useState(false);

  const [examTime, setExamTime] = React.useState("60");

  const [arrQuestions, setArrQuestions] = React.useState([]);

  const theme = useTheme();

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    localStorage.removeItem("question");
  }, []);

  const clearForm = (_) => {
    setQuestion1("");
    setAns1("");
    setAns2("");
    setAns3("");
    setAns4("");
    setCorrectAns1(ans1);
    setQuestion2("");
    setCorrectAns2("true");
  };

  const handleAddQuestion = (_) => {
    let object;
    if (questionForm === "اختيار من متعدد") {
      object = {
        question: question1,
        ans1,
        ans2,
        ans3,
        ans4,
        correct: correctAns1,
      };
    } else if (questionForm === "اختر الاجابة الصحيحة") {
      object = {
        question: question2,
        correct: correctAns2,
      };
    }

    let arr;

    if (localStorage.question) {
      arr = JSON.parse(localStorage.question);
      arr.push(object);
      localStorage.setItem("question", JSON.stringify(arr));
    } else {
      arr = [object];
      localStorage.setItem("question", JSON.stringify(arr));
    }

    setArrQuestions(arr);
    clearForm();
    setQuestionForm("");
  };

  const handleDeleteQuestion = (i) => {
    let arr = JSON.parse(localStorage.question);
    arr.splice(i, 1);
    localStorage.setItem("question", JSON.stringify(arr));
    setArrQuestions(arr);
  };

  return (
    <div className="create-homework-page">
      <Box display={"flex"} justifyContent={"center"}>
        <ToggleButtonGroup
          size="medium"
          exclusive
          value={CreateType}
          onChange={(_) => setCreateType(event.target.value)}
          aria-label="Small sizes"
          sx={{
            border: "1px solid #2f2f2f",
          }}
        >
          <ToggleButton value="HW" key="HW">
            إنشاء واجب منزلى
          </ToggleButton>

          <ToggleButton value="EXAM" key="EXAM">
            إنشاء امتحان
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <HeaderLine
        title={`${CreateType === "HW" ? "إنشاء واجب منزلى" : "إنشاء امتحان"}`}
      />
      <Row>
        <Col sm={12} lg={6} className="col-1">
          <Stack gap={2}>
            <Stack gap={1}>
              <span style={{ color: theme.palette.primary.dark }}>
                اولا حدد المستوى التعليمي
              </span>

              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={(_) => setAlignment(event.target.value)}
                aria-label="Platform"
                sx={{
                  border: "1px solid rgba(255, 255, 255, 0.12);",
                }}
              >
                <ToggleButton
                  className="flex-grow-1"
                  value="الصف الاول الثانوى"
                >
                  الصف الاول الثانوى
                </ToggleButton>
                <ToggleButton
                  className="flex-grow-1"
                  value="الصف الثانى الثانوى"
                >
                  الصف الثانى الثانوى
                </ToggleButton>
                <ToggleButton
                  className="flex-grow-1"
                  value="الصف الثالث الثانوى"
                >
                  الصف الثالث الثانوى
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            <Stack gap={1}>
              <span style={{ color: theme.palette.primary.dark }}>
                حدد رقم المجموعة
              </span>

              <ToggleButtonGroup
                color="primary"
                value={groupNumber}
                exclusive
                onChange={(_) => setGroupNumber(event.target.value)}
                aria-label="Platform"
                sx={{
                  border: "1px solid rgba(255, 255, 255, 0.12);",
                }}
              >
                <ToggleButton className="flex-grow-1" value="مجموعة 1">
                  مجموعة 1
                </ToggleButton>
                <ToggleButton className="flex-grow-1" value="مجموعة 2">
                  مجموعة 2
                </ToggleButton>
                <ToggleButton className="flex-grow-1" value="مجموعة 3">
                  مجموعة 3
                </ToggleButton>
                <ToggleButton className="flex-grow-1" value="مجموعة 4">
                  مجموعة 4
                </ToggleButton>
                <ToggleButton className="flex-grow-1" value="مجموعة 5">
                  مجموعة 5
                </ToggleButton>
                <ToggleButton className="flex-grow-1" value="مجموعة 6">
                  مجموعة 6
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            <Stack gap={1}>
              <span style={{ color: theme.palette.primary.dark }}>
                حدد نوع الاسئلة
              </span>

              <ToggleButtonGroup
                color="primary"
                value={questionType}
                exclusive
                onChange={(_) => setQuestionType(event.target.value)}
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

            {questionType === "FORM" ? (
              <form onSubmit={handleFormSubmit}>
                <Stack gap={2}>
                  <Stack direction={"row"} gap={2}>
                    <input
                      className="flex-grow-1"
                      type="text"
                      placeholder="إسم المادة"
                      value={materialName}
                      onChange={(e) => setMaterialName(e.target.value)}
                      style={{
                        background:
                          theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                        color: theme.palette.text.primary,
                      }}
                    />

                    <select
                      className="flex-grow-1"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      style={{
                        color: theme.palette.text.primary,
                        background:
                          theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                      }}
                    >
                      <option value="ar">لغة الصفحة : العربية</option>
                      <option value="en">لغة الصفحة : الإنجليزية</option>
                    </select>

                    {CreateType === "EXAM" ? (
                      <select
                        className="flex-grow-1"
                        value={examTime}
                        onChange={(e) => setExamTime(e.target.value)}
                        style={{
                          color: theme.palette.text.primary,
                          background:
                            theme.palette.mode === "dark"
                              ? "#242424"
                              : "#f1faf1",
                        }}
                      >
                        <option value="30">مدة الامتحان : نصف ساعة</option>
                        <option value="60">مدة الامتحان : ساعة واحدة</option>
                        <option value="90">مدة الامتحان : ساعة ونصف</option>
                        <option value="120">مدة الامتحان : ساعتان</option>
                      </select>
                    ) : null}
                  </Stack>

                  <textarea
                    className="flex-grow-1"
                    placeholder="وصف الواجب"
                    value={materialDesc}
                    onChange={(e) => setMaterialDesc(e.target.value)}
                    rows={"4"}
                    style={{
                      background:
                        theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                      color: theme.palette.text.primary,
                    }}
                  />

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={(_) => {
                      setOpenMenu((prev) => (prev === false ? true : false));
                      setQuestionForm("");
                    }}
                  >
                    أضف سؤالاً
                  </Button>

                  {openMenu ? (
                    <Stack gap={1}>
                      <span style={{ color: theme.palette.primary.dark }}>
                        حدد نوع السؤال
                      </span>

                      <ToggleButtonGroup
                        color="primary"
                        value={questionForm}
                        exclusive
                        onChange={(_) => {
                          setQuestionForm(event.target.value);
                          setOpenMenu(false);
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

                  {questionForm === "اختيار من متعدد" ? (
                    <Stack gap={2}>
                      <span style={{ color: theme.palette.primary.dark }}>
                        ادخل السؤال وحدد الاخيارات
                      </span>

                      <input
                        className="flex-grow-1"
                        type="text"
                        placeholder="اكتب السؤال"
                        value={question1}
                        onChange={(e) => setQuestion1(e.target.value)}
                        style={{
                          background:
                            theme.palette.mode === "dark"
                              ? "#242424"
                              : "#f1faf1",
                          color: theme.palette.text.primary,
                        }}
                      />

                      <Stack direction={"row"} gap={2}>
                        <input
                          className="flex-grow-1"
                          type="text"
                          placeholder="الاختيار الاول"
                          value={ans1}
                          onChange={(e) => setAns1(e.target.value)}
                          style={{
                            background:
                              theme.palette.mode === "dark"
                                ? "#242424"
                                : "#f1faf1",
                            color: theme.palette.text.primary,
                          }}
                        />

                        <input
                          className="flex-grow-1"
                          type="text"
                          placeholder="الاختيار الثانى"
                          value={ans2}
                          onChange={(e) => setAns2(e.target.value)}
                          style={{
                            background:
                              theme.palette.mode === "dark"
                                ? "#242424"
                                : "#f1faf1",
                            color: theme.palette.text.primary,
                          }}
                        />
                      </Stack>

                      <Stack direction={"row"} gap={2}>
                        <input
                          className="flex-grow-1"
                          type="text"
                          placeholder="الاختيار الثالث"
                          value={ans3}
                          onChange={(e) => setAns3(e.target.value)}
                          style={{
                            background:
                              theme.palette.mode === "dark"
                                ? "#242424"
                                : "#f1faf1",
                            color: theme.palette.text.primary,
                          }}
                        />

                        <input
                          className="flex-grow-1"
                          type="text"
                          placeholder="الاختيار الرابع"
                          value={ans4}
                          onChange={(e) => setAns4(e.target.value)}
                          style={{
                            background:
                              theme.palette.mode === "dark"
                                ? "#242424"
                                : "#f1faf1",
                            color: theme.palette.text.primary,
                          }}
                        />
                      </Stack>

                      <span style={{ color: theme.palette.primary.dark }}>
                        حدد الاجابة الصحيحة
                      </span>

                      <Stack direction={"row"} gap={2}>
                        <select
                          className="flex-grow-1"
                          value={correctAns1}
                          onChange={(e) => setCorrectAns1(e.target.value)}
                          style={{
                            color: theme.palette.text.primary,
                            background:
                              theme.palette.mode === "dark"
                                ? "#242424"
                                : "#f1faf1",
                          }}
                        >
                          <option value={ans1}>{ans1}</option>
                          <option value={ans2}>{ans2}</option>
                          <option value={ans3}>{ans3}</option>
                          <option value={ans4}>{ans4}</option>
                        </select>

                        <Button
                          variant="contained"
                          color="primary"
                          className="flex-grow-1"
                          onClick={handleAddQuestion}
                        >
                          أضف السؤال الى الصفحة
                        </Button>
                      </Stack>
                    </Stack>
                  ) : questionForm === "اختر الاجابة الصحيحة" ? (
                    <Stack gap={2}>
                      <span style={{ color: theme.palette.primary.dark }}>
                        ادخل السؤال
                      </span>

                      <Stack direction={"row"} gap={2}>
                        <input
                          className="flex-grow-1"
                          type="text"
                          placeholder="اكتب السؤال"
                          value={question2}
                          onChange={(e) => setQuestion2(e.target.value)}
                          style={{
                            background:
                              theme.palette.mode === "dark"
                                ? "#242424"
                                : "#f1faf1",
                            color: theme.palette.text.primary,
                          }}
                        />
                        <IconButton color="inherit">
                          {correctAns2 === "true" ? (
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
                          {correctAns2 === "false" ? (
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
                          value={correctAns2}
                          onChange={(e) => setCorrectAns2(e.target.value)}
                          style={{
                            color: theme.palette.text.primary,
                            background:
                              theme.palette.mode === "dark"
                                ? "#242424"
                                : "#f1faf1",
                          }}
                        >
                          <option value={"true"}>صحيح</option>
                          <option value={"false"}>خطأ</option>
                        </select>

                        <Button
                          variant="contained"
                          color="primary"
                          className="flex-grow-1"
                          onClick={handleAddQuestion}
                        >
                          أضف السؤال الى الصفحة
                        </Button>
                      </Stack>
                    </Stack>
                  ) : null}
                </Stack>
              </form>
            ) : questionType === "PDF" ? (
              <Stack gap={2}>
                <span style={{ color: theme.palette.primary.dark }}>
                  قم برفع الملف هنا
                </span>

                <Box>
                  <FileUploader />
                </Box>
              </Stack>
            ) : null}

            <Stack direction={"row"} gap={2}>
              <span
                className="finished-question"
                onClick={(_) =>
                  setFinished((prev) => (prev === false ? true : false))
                }
              >
                هل انتهيت من الاسئلة ؟؟
              </span>
              <Box flexGrow={1} />

              {finished ? (
                <Stack direction={"row"} gap={2}>
                  <Button variant="contained" color="success">
                    نعم انتهيت
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={(_) => setFinished(false)}
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
        </Col>

        {/* Col2 Start */}
        <Col sm={12} lg={6}>
          <Container className="d-flex justify-content-center align-items-center">
            <Paper
              className="overflow-auto"
              sx={{
                height: 75 + "vh",
                width: "70%",
                px: 2,
                py: 5,
                textAlign: language === "ar" ? "right" : "left",
              }}
            >
              <Stack gap={1}>
                <h4>{alignment}</h4>
                <Stack direction={"row"} gap={2}>
                  <span>{groupNumber}</span>

                  <Box flexGrow={1} />

                  {CreateType === "EXAM" ? (
                    <span>
                      {`مدة الامتحان: ${
                        examTime === "30"
                          ? "نصف ساعة"
                          : examTime === "60"
                          ? "ساعة واحدة"
                          : examTime === "90"
                          ? "ساعة ونصف"
                          : "ساعتان"
                      }`}
                    </span>
                  ) : null}
                </Stack>

                <strong className="mt-3 fs-5">{materialName}</strong>
                <span className="border-bottom pb-2">{materialDesc}</span>

                {arrQuestions.length > 0
                  ? arrQuestions.map((question, index) => {
                      return (
                        <Box key={index}>
                          {question.ans3 ? (
                            <Stack gap={1}>
                              <Stack
                                direction={"row"}
                                gap={2}
                                alignItems={"center"}
                              >
                                <span
                                  style={{ color: theme.palette.primary.main }}
                                >
                                  سؤال رقم: {index + 1}
                                </span>
                                <Box flexGrow={1} />

                                <IconButton
                                  color="inherit"
                                  onClick={(_) => handleDeleteQuestion(index)}
                                >
                                  <DeleteRounded
                                    sx={{ color: theme.palette.error.main }}
                                  />
                                </IconButton>
                              </Stack>
                              <Paper elevation={3} sx={{ p: 2 }}>
                                {question.question}
                              </Paper>
                              <Stack direction={"row"} gap={2}>
                                <Paper
                                  elevation={3}
                                  className="flex-grow-1"
                                  sx={{
                                    p: 2,
                                    background:
                                      question.correct === question.ans1
                                        ? theme.palette.success.dark
                                        : null,
                                    color:
                                      question.correct === question.ans1
                                        ? "#efef"
                                        : null,
                                  }}
                                >
                                  {question.ans1}
                                </Paper>
                                <Paper
                                  elevation={3}
                                  className="flex-grow-1"
                                  sx={{
                                    p: 2,
                                    background:
                                      question.correct === question.ans2
                                        ? theme.palette.success.dark
                                        : null,
                                    color:
                                      question.correct === question.ans2
                                        ? "#efef"
                                        : null,
                                  }}
                                >
                                  {question.ans2}
                                </Paper>
                              </Stack>

                              <Stack direction={"row"} gap={2}>
                                <Paper
                                  elevation={3}
                                  className="flex-grow-1"
                                  sx={{
                                    p: 2,
                                    background:
                                      question.correct === question.ans3
                                        ? theme.palette.success.dark
                                        : null,
                                    color:
                                      question.correct === question.ans3
                                        ? "#efef"
                                        : null,
                                  }}
                                >
                                  {question.ans3}
                                </Paper>
                                <Paper
                                  elevation={3}
                                  className="flex-grow-1"
                                  sx={{
                                    p: 2,
                                    background:
                                      question.correct === question.ans4
                                        ? theme.palette.success.dark
                                        : null,
                                    color:
                                      question.correct === question.ans4
                                        ? "#efef"
                                        : null,
                                  }}
                                >
                                  {question.ans4}
                                </Paper>
                              </Stack>
                            </Stack>
                          ) : (
                            <Stack gap={1}>
                              <Stack
                                direction={"row"}
                                gap={2}
                                alignItems={"center"}
                              >
                                <span
                                  style={{ color: theme.palette.primary.main }}
                                >
                                  سؤال رقم: {index + 1}
                                </span>
                                <Box flexGrow={1} />

                                <IconButton
                                  color="inherit"
                                  onClick={(_) => handleDeleteQuestion(index)}
                                >
                                  <DeleteRounded
                                    sx={{ color: theme.palette.error.main }}
                                  />
                                </IconButton>
                              </Stack>
                              <Stack
                                direction={"row"}
                                gap={1}
                                alignItems={"center"}
                              >
                                <Paper
                                  elevation={3}
                                  sx={{ p: 2 }}
                                  className="flex-grow-1"
                                >
                                  {question.question}
                                </Paper>
                                {question.correct === "true" ? (
                                  <Stack direction={"row"} gap={1}>
                                    <CheckCircle
                                      style={{
                                        color: theme.palette.success.main,
                                      }}
                                      className="fs-3"
                                    />
                                    <HighlightOff
                                      style={{
                                        color: theme.palette.error.main,
                                      }}
                                      className="fs-3"
                                    />
                                  </Stack>
                                ) : (
                                  <Stack direction={"row"} gap={1}>
                                    <CheckCircleOutline
                                      style={{
                                        color: theme.palette.success.main,
                                      }}
                                      className="fs-3"
                                    />
                                    <Cancel
                                      style={{
                                        color: theme.palette.error.main,
                                      }}
                                      className="fs-3"
                                    />
                                  </Stack>
                                )}
                              </Stack>
                            </Stack>
                          )}
                        </Box>
                      );
                    })
                  : null}
              </Stack>
            </Paper>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default CreatingPage;
