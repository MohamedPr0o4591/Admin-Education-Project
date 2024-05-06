import React from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Col, Container, Row } from "react-bootstrap";
import "./CoursePage.css";
import { useTheme } from "@mui/material";
import Col1 from "../../components/pages/course/Col1";
import Col2 from "../../components/pages/course/Col2";

function CoursePage() {
  const theme = useTheme();

  const [alignment, setAlignment] = React.useState(null);
  const [questionType, setQuestionType] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [lessonTitle, setLessonTitle] = React.useState("");
  const [lessonDesc, setLessonDesc] = React.useState("");
  const [videoLink, setVideoLink] = React.useState("");
  const [hWFile, setHWFile] = React.useState();
  const [lessonFile, setLessonFile] = React.useState();
  const [language, setLanguage] = React.useState("ar");
  const [openMenu, setOpenMenu] = React.useState(false);
  const [questionForm, setQuestionForm] = React.useState("");
  const [question1, setQuestion1] = React.useState("");
  const [ans1, setAns1] = React.useState("");
  const [ans2, setAns2] = React.useState("");
  const [ans3, setAns3] = React.useState("");
  const [ans4, setAns4] = React.useState("");
  const [correctAns1, setCorrectAns1] = React.useState(ans1);
  const [questionMark, setQuestionMark] = React.useState("");

  const [question2, setQuestion2] = React.useState("");
  const [correctAns2, setCorrectAns2] = React.useState("true");

  const [arrQuestions, setArrQuestions] = React.useState([]);
  const [unitDetails, setUnitDetails] = React.useState([]);

  const clearForm = (_) => {
    setQuestion1("");
    setAns1("");
    setAns2("");
    setAns3("");
    setAns4("");
    setCorrectAns1(ans1);
    setQuestion2("");
    setCorrectAns2("true");
    setQuestionMark("");
  };

  React.useEffect(() => {
    localStorage.removeItem("question");
  }, []);

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
        questionMark,
      };
    } else if (questionForm === "اختر الاجابة الصحيحة") {
      object = {
        question: question2,
        correct: correctAns2,
        questionMark,
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

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleDeleteQuestion = (i) => {
    let arr = JSON.parse(localStorage.question);
    arr.splice(i, 1);
    localStorage.setItem("question", JSON.stringify(arr));
    setArrQuestions(arr);
  };

  return (
    <div className="course-page">
      <HeaderLine title="شرح المنهج" />

      <Row>
        <Col1
          alignment={alignment}
          handleChange={handleChange}
          lessonTitle={lessonTitle}
          setLessonTitle={setLessonTitle}
          lessonDesc={lessonDesc}
          setLessonDesc={setLessonDesc}
          videoLink={videoLink}
          setVideoLink={setVideoLink}
          hWFile={hWFile}
          setHWFile={setHWFile}
          lessonFile={lessonFile}
          setLessonFile={setLessonFile}
          setTitle={setTitle}
          title={title}
          questionType={questionType}
          setQuestionType={setQuestionType}
          handleFormSubmit={handleFormSubmit}
          language={language}
          setLanguage={setLanguage}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          setQuestionForm={setQuestionForm}
          questionForm={questionForm}
          question1={question1}
          setQuestion1={setQuestion1}
          ans1={ans1}
          setAns1={setAns1}
          ans2={ans2}
          setAns2={setAns2}
          ans3={ans3}
          setAns3={setAns3}
          ans4={ans4}
          setAns4={setAns4}
          correctAns1={correctAns1}
          setCorrectAns1={setCorrectAns1}
          questionMark={questionMark}
          setQuestionMark={setQuestionMark}
          question2={question2}
          setQuestion2={setQuestion2}
          correctAns2={correctAns2}
          setCorrectAns2={setCorrectAns2}
          handleAddQuestion={handleAddQuestion}
          unitDetails={unitDetails}
          setUnitDetails={setUnitDetails}
        />

        {/* Col 2 */}

        <Col2
          title={title}
          theme={theme}
          alignment={alignment}
          lessonDesc={lessonDesc}
          lessonTitle={lessonTitle}
          arrQuestions={arrQuestions}
          handleDeleteQuestion={handleDeleteQuestion}
          unitDetails={unitDetails}
        />
      </Row>
    </div>
  );
}

export default CoursePage;
