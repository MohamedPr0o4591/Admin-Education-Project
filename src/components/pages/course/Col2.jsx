import React from "react";
import { Box, Paper, Stack } from "@mui/material";
import { OndemandVideoRounded } from "@mui/icons-material";
import { Col, Container } from "react-bootstrap";

export default function Col2(props) {
  return (
    <Col xs={12} lg={6}>
      <Container className="d-flex justify-content-center align-items-center">
        <Paper
          sx={{
            height: 75 + "vh",
            width: 100 + "%",
            minWidth: 420 + "px",
            maxWidth: 530 + "px",
            px: 2,
            py: 5,
          }}
        >
          <Stack gap={2} height={"100%"}>
            <Box
              className="paper-box h-100 "
              sx={{
                border: `1px solid ${props.theme.palette.primary.dark}`,
              }}
            >
              <span
                className="title"
                style={{
                  background:
                    props.theme.palette.mode === "dark" ? "#242424" : "#ffff",
                }}
              >
                {props.title}
              </span>
              <span
                style={{
                  background:
                    props.theme.palette.mode === "dark" ? "#242424" : "#ffff",
                }}
                className="level"
              >
                {props.alignment}
              </span>
              <p className="lessonTitle fs-4 fw-bold mt-3">
                {props.lessonTitle}
              </p>

              <div className="content d-flex justify-content-center">
                <OndemandVideoRounded
                  sx={{
                    fontSize: 20 + "vw",
                    color: props.theme.palette.primary.main,
                  }}
                />
              </div>
              <span className="lessonDesc">{props.lessonDesc}</span>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Col>
  );
}
