import React from "react";
import { Stack } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function Row1(props) {
  return (
    <Stack
      gap={2}
      direction={"row"}
      justifyContent={"center"}
      className="w-100"
    >
      <ToggleButtonGroup
        className="w-100"
        color="success"
        value={props.alignment}
        exclusive
        onChange={(e) => props.setAlignment(e.target.value)}
        aria-label="Platform"
        style={{
          border: "1px solid #2f2f2f",
        }}
      >
        <ToggleButton className="flex-grow-1" value="pending-hw">
          واجبات قيد التصحيح
        </ToggleButton>
        <ToggleButton className="flex-grow-1" value="pending-exam">
          امتحانات قيد التصحيح
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}

export default Row1;
