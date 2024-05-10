import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, Stack, useTheme } from "@mui/material";

export default function StudentCard(props) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        minWidth: 475,
        flexGrow: 1,
        backgroundColor: "transparent",
        borderTop: "1rem solid " + theme.palette.primary.main,
        borderBottom: "1rem solid " + theme.palette.primary.main,
        borderRadius: 0.6 + "rem",
        transition: "all 0.228s ease-out",
        "&:hover": {
          transform: "scale(1.01)",
        },
      }}
    >
      <CardContent
        sx={{ color: theme.palette.text.primary }}
        className="position-relative"
      >
        <span
          style={{
            position: "absolute",
            left: 35 + "px",
            fontSize: 6 + "rem",
            top: -0.1 + "rem",
          }}
          className="opacity-25 user-select-none"
        >
          <i>
            #
            {props.level.includes("الاول", "الأول")
              ? 1
              : props.level.includes("الثانى", "الثاني")
              ? 2
              : 3}
          </i>
        </span>

        <h5 className="user-select-none">
          <u className="text-center w-100 d-block fs-2 opacity-50">
            {props.level}
          </u>
        </h5>

        <Stack gap={2} direction={"row"} mt={4} flexWrap={"wrap"}>
          <Stack
            gap={2}
            sx={{
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.3)",
              p: 2,
              borderRadius: 0.6 + "rem",
              flex: 1,
              transition: "all 0.228s ease-out",
              "&:hover": {
                transform: "scale(1.04)",
              },
            }}
            alignItems={"center"}
          >
            <p className="m-0  fs-4 ">عدد الطلاب:</p>

            <div className="fs-2 opacity-75 text-center user-select-none text-primary d-flex flex-column">
              <span>{props.students}</span>
              <span>طالب</span>
            </div>
          </Stack>

          <Stack
            gap={2}
            sx={{
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.3)",
              p: 2,
              borderRadius: 0.6 + "rem",
              flex: 1,
              transition: "all 0.228s ease-out",
              "&:hover": {
                transform: "scale(1.04)",
              },
            }}
            alignItems={"center"}
          >
            <p className="m-0  fs-4 ">عدد المجاميع:</p>

            <div className="fs-2 opacity-75 text-center user-select-none text-primary d-flex flex-column">
              <span>{props.groups}</span>
              <span>مجموعة</span>
            </div>
          </Stack>
          <Stack
            gap={2}
            sx={{
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.3)",
              p: 2,
              borderRadius: 0.6 + "rem",
              flex: 1,
              transition: "all 0.228s ease-out",
              "&:hover": {
                transform: "scale(1.04)",
              },
            }}
            alignItems={"center"}
          >
            <p className="m-0  fs-4 ">عدد الفصول:</p>

            <div className="fs-2 opacity-75 text-center user-select-none text-primary d-flex flex-column">
              <span>{props.units}</span>
              <span>فصل</span>
            </div>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
