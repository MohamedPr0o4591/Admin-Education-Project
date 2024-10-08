import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

export default function Row1(props) {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <ToggleButtonGroup
        className="w-100 mb-3"
        size="medium"
        exclusive
        value={props.CreateType}
        onChange={(_) => props.setCreateType(event.target.value)}
        aria-label="Medium sizes"
        sx={{
          border: "1px solid #2f2f2f",
        }}
        color="primary"
      >
        <ToggleButton value="HW" key="HW" className="flex-grow-1">
          إنشاء واجب منزلى
        </ToggleButton>

        <ToggleButton value="EXAM" key="EXAM" className="flex-grow-1">
          إنشاء امتحان
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
