import * as React from "react";
import { getDesignTokens } from "./theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Routes } from "react-router";
import HomePage from "./pages/home/HomePage";
import StudentManagementPage from "./pages/students management/StudentManagementPage";
import CoursePage from "./pages/course/CoursePage";

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
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
