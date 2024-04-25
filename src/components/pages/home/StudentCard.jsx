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
        backgroundColor: props.level.includes("الاول")
          ? theme.palette.primary.main
          : props.level.includes("الثانى")
          ? theme.palette.warning.main
          : theme.palette.success.main,
      }}
    >
      <CardContent
        sx={{ color: theme.palette.primary.contrastText }}
        className="position-relative"
      >
        <span
          style={{
            position: "absolute",
            left: 35 + "px",
            fontSize: 6 + "rem",
          }}
          className="opacity-25 user-select-none"
        >
          <i>
            #
            {props.level.includes("الاول")
              ? 1
              : props.level.includes("الثانى")
              ? 2
              : 3}
          </i>
        </span>

        <h5 className="user-select-none">
          <u>الصف {props.level} الثانوى</u>
        </h5>

        <Stack direction={"row"} gap={5} alignItems={"center"}>
          <span>عدد الطلاب: </span>

          <span className="user-select-none">
            <i style={{ color: theme.palette.secondary.main }} className="fs-5">
              <b>{(12000).toLocaleString()}</b>
            </i>{" "}
            طالب
          </span>
        </Stack>

        <Stack direction={"row"} gap={5} alignItems={"center"}>
          <span>اجمالى الدخل الشهري: </span>

          <span className="user-select-none">
            <i style={{ color: theme.palette.secondary.main }} className="fs-5">
              <b>{(12000 * 1500).toLocaleString()}</b>
            </i>{" "}
            جنيهاً
          </span>
        </Stack>

        <Stack direction={"row"} gap={5} alignItems={"center"}>
          <span>متوسط الدخل الشهري: </span>

          <span className="user-select-none">
            <i style={{ color: theme.palette.secondary.main }} className="fs-5">
              <b>{((12000 * 1500) / 12000).toLocaleString()}</b>
            </i>{" "}
            جنيهاً
          </span>
        </Stack>
      </CardContent>

      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <Box flexGrow={1} />

        <CardActions>
          <Button size="small" variant="contained">
            أضف الدخل الشهرى
          </Button>
        </CardActions>
      </Stack>
    </Card>
  );
}
