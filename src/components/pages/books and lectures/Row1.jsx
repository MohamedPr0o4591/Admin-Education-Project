import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

export default function Row1(props) {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <ToggleButtonGroup
        className="w-100 mb-3"
        size="medium"
        exclusive
        value={props.createType}
        onChange={(_) => props.setCreateType(event.target.value)}
        aria-label="Medium sizes"
        sx={{
          border: "1px solid #2f2f2f",
        }}
        color="primary"
      >
        <ToggleButton value="add" key="add" className="flex-grow-1">
          اضافة مذكرة / كتاب جديد
        </ToggleButton>

        <ToggleButton value="show" key="show" className="flex-grow-1">
          عرض جميع الكتب
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
