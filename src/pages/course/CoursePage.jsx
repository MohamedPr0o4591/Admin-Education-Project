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
          title={title}
          setTitle={setTitle}
          lessonTitle={lessonTitle}
          setLessonTitle={setLessonTitle}
          lessonDesc={lessonDesc}
          setLessonDesc={setLessonDesc}
        />

        {/* Col 2 */}

        <Col2
          theme={theme}
          title={title}
          alignment={alignment}
          lessonDesc={lessonDesc}
          lessonTitle={lessonTitle}
        />
      </Row>
    </div>
  );
}

export default CoursePage;
