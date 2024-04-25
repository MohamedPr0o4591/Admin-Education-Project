import { Stack, useTheme } from "@mui/material";
import React from "react";
import HeaderLine from "../../../components/headerLine/HeaderLine";
import { Row } from "react-bootstrap";
import StudentCard from "../../../components/pages/home/StudentCard";

function HomePageContent() {
  const theme = useTheme();

  return (
    <div className="home-page-content">
      <HeaderLine title="عدد الطلاب" />

      <Stack direction={"row"} gap={2} alignItems={"center"} flexWrap={"wrap"}>
        <StudentCard level="الاول" />
        <StudentCard level="الثانى" />
        <StudentCard level="الثالث" />
      </Stack>
    </div>
  );
}

export default HomePageContent;
