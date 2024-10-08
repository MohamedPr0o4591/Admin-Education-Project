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
import LecturesPage from "./pages/books and lectures/LecturesPage";
import ExamManagement from "./pages/exam management/ExamManagement";
import ProfilePage from "./pages/profile settings/ProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import HomePageContent from "./pages/home/content/HomePageContent";
import { Box } from "@mui/material";
import RewardsPage from "./pages/answer and earn/RewardsPage";
import PreparationPage from "./pages/preparation of classes/PreparationPage";
import SinglePage from "./pages/dashboard single page/SinglePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [mode, setMode] = React.useState(
    localStorage.theme ? localStorage.theme : "dark"
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" theme="colored" />

      <Box
        sx={{ width: 100 + "vw", height: 100 + "vh", overflow: "auto" }}
        className="App"
      >
        <Routes>
          <Route path="/" element={<SinglePage />} />
          <Route
            path="/admin"
            element={<HomePage mode={mode} setMode={setMode} />}
          >
            <Route index element={<HomePageContent />} />
            <Route
              path="students-management"
              element={<StudentManagementPage />}
            />
            <Route path="course" element={<CoursePage />} />
            <Route path="course-content" element={<CourseContentPage />} />
            <Route path="create" element={<CreatingPage />} />
            <Route path="homework-management" element={<HomeWorkMPage />} />
            <Route path="books-lectures" element={<LecturesPage />} />
            <Route path="exam-management" element={<ExamManagement />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="bonus" element={<RewardsPage />} />
            <Route path="preparation-classes" element={<PreparationPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
