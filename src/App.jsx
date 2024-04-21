import * as React from "react";
import { getDesignTokens } from "./theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Routes } from "react-router";
import HomePage from "./pages/home/HomePage";
import StudentManagementPage from "./pages/students/StudentManagementPage";
import CoursePage from "./pages/course/CoursePage";
import CreatingPage from "./pages/creating/CreatingPage";
import CourseContentPage from "./pages/course content/CourseContentPage";
import HomeWorkMPage from "./pages/homework management/HomeWorkMPage";

export default function App() {
  const [mode, setMode] = React.useState(
    localStorage.theme ? localStorage.theme : "dark"
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<HomePage setMode={setMode} />}>
          <Route
            path="students-management"
            element={<StudentManagementPage />}
          />

          <Route path="course" element={<CoursePage />} />
          <Route path="course-content" element={<CourseContentPage />} />
          <Route path="create" element={<CreatingPage />} />
          <Route path="homework-management" element={<HomeWorkMPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
