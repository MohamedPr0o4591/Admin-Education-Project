import { Box, Button, Paper, Stack, useTheme } from "@mui/material";
import React from "react";

function Row1(props) {
  const theme = useTheme();
  return (
    <Paper className="p-3">
      <strong className="border-bottom">تعديل على البيانات الشخصية</strong>

      <Stack direction={"row"} gap={2} mt={2} alignItems={"center"}>
        <span className="user-select-none">تغيير الصورة الشخصية للمدرس</span>

        <Box flexGrow={1} />
        <Box>
          <input type="file" style={{ display: "none" }} id="photo" />
          <label htmlFor="photo">اضغط لتغيير الصورة الشخصية</label>
        </Box>
      </Stack>

      <form className="mt-4" onSubmit={props.handleSubmit}>
        <span style={{ color: theme.palette.primary.main, marginTop: "10px" }}>
          التعديل علي الاسم الشخصي للمدرس
        </span>

        <Stack direction={"row"} gap={2} alignItems={"center"} mt={2}>
          <input
            type="text"
            placeholder="الاسم الاول"
            className="flex-grow-1"
            value={props.firstName}
            onChange={(e) => props.setFirstName(e.target.value)}
            style={{
              background:
                theme.palette.mode === "dark" ? "rgb(57 57 57)" : "#f1faf1",
              color: theme.palette.text.primary,
            }}
          />

          <input
            type="text"
            placeholder="الاسم الثانى"
            className="flex-grow-1"
            value={props.lastName}
            onChange={(e) => props.setLastName(e.target.value)}
            style={{
              background:
                theme.palette.mode === "dark" ? "rgb(57 57 57)" : "#f1faf1",
              color: theme.palette.text.primary,
            }}
          />
        </Stack>

        <Stack direction={"row"} gap={2} alignItems={"center"} mt={2}>
          <Box flexGrow={1} />

          <Button color="success" variant="contained" type="submit">
            حفظ التغييرات
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default Row1;
