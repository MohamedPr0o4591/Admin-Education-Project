import { Box, Button, Paper, Stack, useTheme } from "@mui/material";
import React from "react";

function Row2(props) {
  const theme = useTheme();
  return (
    <Paper className="p-3 mt-3">
      <strong className="border-bottom">صفحات التواصل الاجتماعى</strong>

      <Stack gap={2} mt={2}>
        <span style={{ color: theme.palette.primary.main, marginTop: "10px" }}>
          اضافة صفحات التواصل الخاصة بالمدرس
        </span>

        <Stack direction={"row"} gap={2} alignItems={"center"} mt={2}>
          <input
            type="text"
            placeholder="رابط صفحة الفيس بوك"
            className="flex-grow-1"
            value={props.facebook}
            onChange={(e) => props.setFacebook(e.target.value)}
            style={{
              background:
                theme.palette.mode === "dark" ? "rgb(57 57 57)" : "#f1faf1",
              color: theme.palette.text.primary,
            }}
          />

          <Button color={"success"} variant="contained">
            حفظ
          </Button>
        </Stack>

        <Stack direction={"row"} gap={2} alignItems={"center"} mt={2}>
          <input
            type="text"
            placeholder="رقم الواتساب"
            className="flex-grow-1"
            value={props.whatsapp}
            onChange={(e) => props.setWhatsapp(e.target.value)}
            style={{
              background:
                theme.palette.mode === "dark" ? "rgb(57 57 57)" : "#f1faf1",
              color: theme.palette.text.primary,
            }}
          />

          <Button color={"success"} variant="contained">
            حفظ
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default Row2;
