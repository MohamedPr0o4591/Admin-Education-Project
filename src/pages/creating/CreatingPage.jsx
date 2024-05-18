import React from "react";
import "./CreatingPage.css";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Row } from "react-bootstrap";
import { useTheme } from "@mui/material";
import Col1 from "../../components/pages/creating/Col1";
import Col2 from "../../components/pages/creating/Col2";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function CreatingPage() {
  const [alignment, setAlignment] = React.useState("");
  const [classDetails, setClassDetails] = React.useState([]);
  const [groupNumber, setGroupNumber] = React.useState([]);
  const [questionType, setQuestionType] = React.useState("");
  const [questionForm, setQuestionForm] = React.useState("");
  const [examTitle, setExamTitle] = React.useState("");

  const [files, setFiles] = React.useState();

  const [materialDesc, setMaterialDesc] = React.useState("");
  const [language, setLanguage] = React.useState("Arabic");

  const [openMenu, setOpenMenu] = React.useState(false);

  //   سؤال متعدد الاجابات
  const [question1, setQuestion1] = React.useState("");
  const [ans1, setAns1] = React.useState("");
  const [ans2, setAns2] = React.useState("");
  const [ans3, setAns3] = React.useState("");
  const [ans4, setAns4] = React.useState("");
  const [correctAns1, setCorrectAns1] = React.useState(ans1);
  const [questionMark, setQuestionMark] = React.useState("");
  const [score, setScore] = React.useState("");

  const [question2, setQuestion2] = React.useState("");
  const [correctAns2, setCorrectAns2] = React.useState("true");

  const [finished, setFinished] = React.useState(false);

  const [examTime, setExamTime] = React.useState("60");

  const [arrQuestions, setArrQuestions] = React.useState([]);

  const [selectedDateTime, setSelectedDateTime] = React.useState(new Date());

  const navigate = useNavigate();

  const theme = useTheme();

  const handleFormatChange = (event, newFormats) => {
    setGroupNumber(newFormats);
  };

  const handleSendExam = async (_) => {
    let flag;

    if (
      alignment !== "" &&
      groupNumber.length > 0 &&
      questionType !== "" &&
      examTitle !== "" &&
      selectedDateTime !== null
    ) {
      flag = true;
    } else flag = false;

    if (flag) {
      try {
        if (questionType !== "PDF") {
          await axios.post(
            `${import.meta.env.VITE_API}exam`,
            {
              title: examTitle,
              examType: "EXAM",
              questionType: "MCQ",
              description: materialDesc,
              language,
              duration: examTime,
              startTime: selectedDateTime,
              score: +score,
              classId: classDetails.id,
              groupsId: groupNumber,
              questions: JSON.parse(localStorage.getItem("question")),
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          const formData = new FormData();
          formData.append("file", files[0]);
          formData.append("title", examTitle);
          formData.append("examType", "EXAM");
          formData.append("questionType", "PDF");
          formData.append("duration", examTime);
          formData.append("startTime", selectedDateTime);
          formData.append("score", +score);
          formData.append("classId", classDetails.id);
          // formData.append("groupsId", groupNumber); // ['a766db6b-571d-4b5c-b594-c625c7168fc9', 'e3dd3c44-2fc4-415c-b757-c63f5f105381', 'fa888b7f-0edc-4524-a86a-35a3b395b983']
          formData.append("language", "Arabic");
          formData.append("description", "description");

          groupNumber.forEach((value, index) => {
            formData.append(`groupsId[${index}]`, value);
          });

          await axios.post(`${import.meta.env.VITE_API}exam`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
        toast.success(`تم انشاء الامتحان بنجاح`);
        localStorage.removeItem("question");

        setTimeout(() => {
          navigate("/admin/exam-management");
        }, 1000);
      } catch (err) {
        toast.error(`حدث خطأ أثناء إنشاء الامتحان`);
      }
    } else {
      toast.error(`يرجى ملء جميع البيانات المطلوبة`);
      setFinished(false);
    }
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
    setQuestionMark("");
  };

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
    <div className="create-homework-page">
      <HeaderLine title="إنشاء امتحان" />

      <Row>
        {/* Col1 Start */}
        <Col1
          handleFormatChange={handleFormatChange}
          theme={theme}
          alignment={alignment}
          setAlignment={setAlignment}
          groupNumber={groupNumber}
          setGroupNumber={setGroupNumber}
          questionType={questionType}
          setQuestionType={setQuestionType}
          handleSendExam={handleSendExam}
          handleAddQuestion={handleAddQuestion}
          language={language}
          setLanguage={setLanguage}
          finished={finished}
          setFinished={setFinished}
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
          questionMark={questionMark}
          setQuestionMark={setQuestionMark}
          files={files}
          setFiles={setFiles}
          examTitle={examTitle}
          setExamTitle={setExamTitle}
          setSelectedDateTime={setSelectedDateTime}
          selectedDateTime={selectedDateTime}
          setClassDetails={setClassDetails}
          score={score}
          setScore={setScore}
        />

        {/* Col2 Start */}
        <Col2
          language={language}
          alignment={alignment}
          groupNumber={groupNumber}
          materialDesc={materialDesc}
          arrQuestions={arrQuestions}
          examTime={examTime}
          handleDeleteQuestion={handleDeleteQuestion}
          score={score}
          examTitle={examTitle}
        />
      </Row>
    </div>
  );
}

export default CreatingPage;
