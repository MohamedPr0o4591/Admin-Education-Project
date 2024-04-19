import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

export default function Row1(props) {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <ToggleButtonGroup
        size="medium"
        exclusive
        value={props.CreateType}
        onChange={(_) => props.setCreateType(event.target.value)}
        aria-label="Small sizes"
        sx={{
          border: "1px solid #2f2f2f",
        }}
      >
        <ToggleButton value="HW" key="HW">
          إنشاء واجب منزلى
        </ToggleButton>

        <ToggleButton value="EXAM" key="EXAM">
          إنشاء امتحان
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
