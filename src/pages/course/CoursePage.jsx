import React from "react";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Col, Container, Row } from "react-bootstrap";
import "./CoursePage.css";
import { useTheme } from "@mui/material";
import Col1 from "../../components/pages/course/Col1";
import Col2 from "../../components/pages/course/Col2";

function CoursePage() {
  const theme = useTheme();

  const [alignment, setAlignment] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [lessonTitle, setLessonTitle] = React.useState("");
  const [lessonDesc, setLessonDesc] = React.useState("");
  const [videoLink, setVideoLink] = React.useState("");
  const [hWFile, setHWFile] = React.useState("");
  const [lessonFile, setLessonFile] = React.useState("");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
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
        />

        {/* Col 2 */}

        <Col2
          title={title}
          theme={theme}
          alignment={alignment}
          lessonDesc={lessonDesc}
          lessonTitle={lessonTitle}
        />
      </Row>
    </div>
  );
}

export default CoursePage;
