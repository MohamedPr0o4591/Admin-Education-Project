import React from "react";
import "./HeaderLine.css";
import { useTheme } from "@mui/material";

function HeaderLine(props) {
  const theme = useTheme();

  return (
    <div className="header-line mb-4">
      <h3>{props.title}</h3>

      <div
        className="overline"
        style={{
          background: theme.palette.primary.dark,
        }}
      />
    </div>
  );
}

export default HeaderLine;
