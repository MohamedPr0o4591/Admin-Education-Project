import React from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Row } from "react-bootstrap";
import Col1 from "../../components/pages/answer & earn/Col1";
import "./RewardsPage.css";
import Col2 from "../../components/pages/answer & earn/Col2";

const RewardsPage = () => {
  const [alignment, setAlignment] = React.useState("");
  const [finished, setFinished] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [questionForm, setQuestionForm] = React.useState("");
  const [ans1, setAns1] = React.useState("");
  const [ans2, setAns2] = React.useState("");
  const [ans3, setAns3] = React.useState("");
  const [ans4, setAns4] = React.useState("");
  const [correctAns1, setCorrectAns1] = React.useState(ans1);
  const [questionMark, setQuestionMark] = React.useState("");
  const [correctAns2, setCorrectAns2] = React.useState("true");
  const [language, setLanguage] = React.useState("ar");

  const [question1, setQuestion1] = React.useState("");
  const [question2, setQuestion2] = React.useState("");

  const [arrQuestions, setArrQuestions] = React.useState([]);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

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

  const handleDeleteQuestion = (i) => {
    let arr = JSON.parse(localStorage.question);
    arr.splice(i, 1);
    localStorage.setItem("question", JSON.stringify(arr));
    setArrQuestions(arr);
  };

  return (
    <div className="bonus-page">
      <HeaderLine title="المكافآت" />
      <Row>
        <Col1
          alignment={alignment}
          handleChange={handleChange}
          finished={finished}
          setFinished={setFinished}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          questionForm={questionForm}
          setQuestionForm={setQuestionForm}
          handleFormSubmit={handleFormSubmit}
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
          correctAns2={correctAns2}
          setCorrectAns2={setCorrectAns2}
          handleAddQuestion={handleAddQuestion}
          arrQuestions={arrQuestions}
          setArrQuestions={setArrQuestions}
          clearForm={clearForm}
          question1={question1}
          setQuestion1={setQuestion1}
          question2={question2}
          setQuestion2={setQuestion2}
          language={language}
          setLanguage={setLanguage}
        />

        <Col2
          handleDeleteQuestion={handleDeleteQuestion}
          alignment={alignment}
          arrQuestions={arrQuestions}
        />
      </Row>
    </div>
  );
};

export default RewardsPage;
