import { Box, Button, Paper, Stack, useTheme } from "@mui/material";
import React, { useState } from "react";

function Row1(props) {
  const theme = useTheme();

  const [imgReader, setImgReader] = useState("");

  const handleChangePicture = (e) => {
    const file = e.target.files[0];

    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = (_) => {
        setImgReader(URL.createObjectURL(file));
        props.setImgFile(file);
      };
    }
  };
  return (
    <Paper className="p-3">
      <strong className="border-bottom">تعديل على البيانات الشخصية</strong>

      <Stack direction={"row"} gap={2} mt={2}>
        <span className="user-select-none">تغيير الصورة الشخصية للمدرس</span>

        <Box flexGrow={1} />
        <Box>
          <Stack gap={2}>
            <input
              type="file"
              style={{ display: "none" }}
              id="photo"
              onChange={handleChangePicture}
            />

            <label htmlFor="photo">اضغط لتغيير الصورة الشخصية</label>
            {props.imgFile !== undefined ? (
              <img
                className="img-reader"
                src={imgReader}
                alt="picture profile"
              />
            ) : null}
          </Stack>
        </Box>
      </Stack>

      <form className="mt-4" onSubmit={props.handleChangeDetails}>
        <span style={{ color: theme.palette.primary.main, marginTop: "10px" }}>
          التعديل علي الاسم الشخصي للمدرس
        </span>

        <Stack direction={"row"} gap={2} alignItems={"center"} mt={2}>
          <div className="d-flex flex-column gap-2 flex-grow-1">
            <input
              type="text"
              placeholder="الاسم الاول"
              className="w-100"
              value={props.firstName}
              onChange={(e) => props.setFirstName(e.target.value)}
              style={{
                background:
                  theme.palette.mode === "dark" ? "rgb(57 57 57)" : "#f1faf1",
                color: theme.palette.text.primary,
              }}
            />

            <span className="user-select-none opacity-50">
              {props.profileDetails.firstName}
            </span>
          </div>

          <div className="d-flex flex-column gap-2 flex-grow-1">
            <input
              type="text"
              placeholder="الاسم الثانى"
              className="w-100"
              value={props.lastName}
              onChange={(e) => props.setLastName(e.target.value)}
              style={{
                background:
                  theme.palette.mode === "dark" ? "rgb(57 57 57)" : "#f1faf1",
                color: theme.palette.text.primary,
              }}
            />

            <span className="user-select-none opacity-50">
              {props.profileDetails.lastName}
            </span>
          </div>
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
