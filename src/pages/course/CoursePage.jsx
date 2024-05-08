import React from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Col, Container, Row } from "react-bootstrap";
import "./CoursePage.css";
import { useTheme } from "@mui/material";
import Col1 from "../../components/pages/course/Col1";
import Col2 from "../../components/pages/course/Col2";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

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
  const [score, setScore] = React.useState();

  const [question2, setQuestion2] = React.useState("");
  const [correctAns2, setCorrectAns2] = React.useState("true");

  const [arrQuestions, setArrQuestions] = React.useState([]);
  const [unitDetails, setUnitDetails] = React.useState([]);

  const navigate = useNavigate();

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
        questionText: question1,
        options: [ans1, ans2, ans3, ans4],
        correctAnswer: correctAns1,
        questionScore: +questionMark,
      };
    } else if (questionForm === "اختر الاجابة الصحيحة") {
      object = {
        questionText: question2,
        correctAnswer: correctAns2,
        questionScore: +questionMark,
        options: ["true", "false"],
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

  const handleSendData = async (_) => {
    let flag;

    if (alignment !== null && title !== "" && lessonTitle !== "") {
      flag = true;
    } else flag = false;

    if (flag) {
      try {
        const formData = new FormData();

        if (questionType != "PDF") {
          let newArr = JSON.parse(localStorage.question);
          formData.append("unitId", unitDetails.id);
          formData.append("title", lessonTitle);
          formData.append("description", lessonDesc);
          formData.append("videoUrl", videoLink);
          formData.append("file", lessonFile[0]);
          formData.append("questionType", "MCQ");
          formData.append("score", score);

          newArr.forEach((value, index) => {
            formData.append(
              `homeworkQuestions[${index}]`,
              JSON.stringify(value)
            );
          });
        } else {
          formData.append("unitId", unitDetails.id);
          formData.append("title", lessonTitle);
          formData.append("description", lessonDesc);
          formData.append("videoUrl", videoLink);
          formData.append("file", lessonFile[0]);
          formData.append("questionType", "PDF");
          formData.append("score", score);
          formData.append("homeworkFile", hWFile[0]);
        }

        await axios.post(`${import.meta.env.VITE_API}lesson`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("تم إضافة الدرس بنجاح");
        localStorage.removeItem("question");

        setTimeout(() => {
          navigate("/admin/course-content");
        }, 1000);
      } catch (err) {
        toast.error("حدث خطأ");
      }
    } else toast.warning("برجاء ملء جميع الحقول");
  };

  const handleDeleteQuestion = (i) => {
    let arr = JSON.parse(localStorage.question);
    arr.splice(i, 1);
    localStorage.setItem("question", JSON.stringify(arr));
    setArrQuestions(arr);
  };

  React.useEffect(() => {
    let total = 0;
    if (localStorage.question) {
      let arr = JSON.parse(localStorage.question);
      for (let i = 0; i < arr.length; i++) {
        total = +total + +arr[i].questionScore;
        setScore(total);
      }
    }
  }, [localStorage.question]);

  return (
    <div className="course-page">
      <HeaderLine title="شرح المنهج" />
      <ToastContainer position="top-right" />

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
          handleSendData={handleSendData}
          score={score}
          setScore={setScore}
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
          language={language}
          score={score}
        />
      </Row>
    </div>
  );
}

export default CoursePage;
