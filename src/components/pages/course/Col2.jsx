import React from "react";
import { Box, IconButton, Paper, Stack, useTheme } from "@mui/material";
import {
  Cancel,
  CheckCircle,
  CheckCircleOutline,
  DeleteRounded,
  HighlightOff,
  OndemandVideoRounded,
} from "@mui/icons-material";
import { Col, Container } from "react-bootstrap";

export default function Col2(props) {
  const theme = useTheme();
  return (
    <Col xs={12} lg={6}>
      <Container className="d-flex justify-content-center gap-4 align-items-center flex-column">
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
                {props.unitDetails.name}
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

        <Paper
          className="overflow-auto"
          sx={{
            height: 75 + "vh",
            width: 100 + "%",
            minWidth: 420 + "px",
            maxWidth: 530 + "px",
            px: 2,
            py: 5,
            textAlign: props.language === "ar" ? "right" : "left",
          }}
        >
          <Stack gap={1}>
            <h4>{props.alignment}</h4>

            {props.arrQuestions.length > 0
              ? props.arrQuestions.map((question, index) => {
                  return (
                    <Box key={index}>
                      {question.ans3 ? (
                        <Stack gap={1}>
                          <Stack
                            direction={"row"}
                            gap={2}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <span style={{ color: theme.palette.primary.main }}>
                              سؤال رقم: {index + 1}
                            </span>

                            <span>
                              ({" "}
                              <span
                                style={{ color: theme.palette.warning.main }}
                              >
                                {question.questionMark}
                              </span>{" "}
                              درجة )
                            </span>

                            <IconButton
                              color="inherit"
                              onClick={(_) => props.handleDeleteQuestion(index)}
                            >
                              <DeleteRounded
                                sx={{ color: theme.palette.error.main }}
                              />
                            </IconButton>
                          </Stack>
                          <Paper elevation={3} sx={{ p: 2 }}>
                            {question.question}
                          </Paper>
                          <Stack direction={"row"} gap={2}>
                            <Paper
                              elevation={3}
                              className="flex-grow-1"
                              sx={{
                                p: 2,
                                background:
                                  question.correct === question.ans1
                                    ? theme.palette.success.dark
                                    : null,
                                color:
                                  question.correct === question.ans1
                                    ? "#efef"
                                    : null,
                              }}
                            >
                              {question.ans1}
                            </Paper>
                            <Paper
                              elevation={3}
                              className="flex-grow-1"
                              sx={{
                                p: 2,
                                background:
                                  question.correct === question.ans2
                                    ? theme.palette.success.dark
                                    : null,
                                color:
                                  question.correct === question.ans2
                                    ? "#efef"
                                    : null,
                              }}
                            >
                              {question.ans2}
                            </Paper>
                          </Stack>

                          <Stack direction={"row"} gap={2}>
                            <Paper
                              elevation={3}
                              className="flex-grow-1"
                              sx={{
                                p: 2,
                                background:
                                  question.correct === question.ans3
                                    ? theme.palette.success.dark
                                    : null,
                                color:
                                  question.correct === question.ans3
                                    ? "#efef"
                                    : null,
                              }}
                            >
                              {question.ans3}
                            </Paper>
                            <Paper
                              elevation={3}
                              className="flex-grow-1"
                              sx={{
                                p: 2,
                                background:
                                  question.correct === question.ans4
                                    ? theme.palette.success.dark
                                    : null,
                                color:
                                  question.correct === question.ans4
                                    ? "#efef"
                                    : null,
                              }}
                            >
                              {question.ans4}
                            </Paper>
                          </Stack>
                        </Stack>
                      ) : (
                        <Stack gap={1}>
                          <Stack
                            direction={"row"}
                            gap={2}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <span style={{ color: theme.palette.primary.main }}>
                              سؤال رقم: {index + 1}
                            </span>

                            <span>
                              ({" "}
                              <span
                                style={{ color: theme.palette.warning.main }}
                              >
                                {question.questionMark}
                              </span>{" "}
                              درجة )
                            </span>

                            <IconButton
                              color="inherit"
                              onClick={(_) => props.handleDeleteQuestion(index)}
                            >
                              <DeleteRounded
                                sx={{ color: theme.palette.error.main }}
                              />
                            </IconButton>
                          </Stack>
                          <Stack
                            direction={"row"}
                            gap={1}
                            alignItems={"center"}
                          >
                            <Paper
                              elevation={3}
                              sx={{ p: 2 }}
                              className="flex-grow-1"
                            >
                              {question.question}
                            </Paper>
                            {question.correct === "true" ? (
                              <Stack direction={"row"} gap={1}>
                                <CheckCircle
                                  style={{
                                    color: theme.palette.success.main,
                                  }}
                                  className="fs-3"
                                />
                                <HighlightOff
                                  style={{
                                    color: theme.palette.error.main,
                                  }}
                                  className="fs-3"
                                />
                              </Stack>
                            ) : (
                              <Stack direction={"row"} gap={1}>
                                <CheckCircleOutline
                                  style={{
                                    color: theme.palette.success.main,
                                  }}
                                  className="fs-3"
                                />
                                <Cancel
                                  style={{
                                    color: theme.palette.error.main,
                                  }}
                                  className="fs-3"
                                />
                              </Stack>
                            )}
                          </Stack>
                        </Stack>
                      )}
                    </Box>
                  );
                })
              : null}
          </Stack>
        </Paper>
      </Container>
    </Col>
  );
}
