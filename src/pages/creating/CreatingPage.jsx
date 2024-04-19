import React from "react";
import "./CreatingPage.css";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Col, Container, Row } from "react-bootstrap";
import { Box, Button, IconButton, Paper, Stack, useTheme } from "@mui/material";
import {
  Cancel,
  CheckCircle,
  CheckCircleOutline,
  DeleteRounded,
  HighlightOff,
} from "@mui/icons-material";
import FileUploader from "../course/FileUploader";
import Row1 from "../../components/pages/creating/Row1";
import Col1 from "../../components/pages/creating/Col1";
import Col2 from "../../components/pages/creating/Col2";

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
      <Row1 CreateType={CreateType} setCreateType={setCreateType} />

      <HeaderLine
        title={`${CreateType === "HW" ? "إنشاء واجب منزلى" : "إنشاء امتحان"}`}
      />
      <Row>
        {/* Col1 Start */}
        <Col1
          theme={theme}
          alignment={alignment}
          setAlignment={setAlignment}
          groupNumber={groupNumber}
          setGroupNumber={setGroupNumber}
          questionType={questionType}
          setQuestionType={setQuestionType}
          handleFormSubmit={handleFormSubmit}
          handleAddQuestion={handleAddQuestion}
          materialName={materialName}
          setMaterialName={setMaterialName}
          language={language}
          setLanguage={setLanguage}
          finished={finished}
          setFinished={setFinished}
          CreateType={CreateType}
          materialDesc={materialDesc}
          setMaterialDesc={setMaterialDesc}
          setOpenMenu={setOpenMenu}
          openMenu={openMenu}
          setQuestionForm={setQuestionForm}
          questionForm={questionForm}
          question1={question1}
          setQuestion1={setQuestion1}
          question2={question2}
          setQuestion2={setQuestion2}
          ans1={ans1}
          setAns1={setAns1}
          correctAns1={correctAns1}
          correctAns2={correctAns2}
          setCorrectAns2={setCorrectAns2}
          setCorrectAns1={setCorrectAns1}
          ans2={ans2}
          setAns2={setAns2}
          ans3={ans3}
          setAns3={setAns3}
          ans4={ans4}
          setAns4={setAns4}
          examTime={examTime}
          setExamTime={setExamTime}
        />

        {/* Col2 Start */}
        <Col2
          language={language}
          alignment={alignment}
          groupNumber={groupNumber}
          CreateType={CreateType}
          materialName={materialName}
          materialDesc={materialDesc}
          arrQuestions={arrQuestions}
          examTime={examTime}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      </Row>
    </div>
  );
}

export default CreatingPage;
