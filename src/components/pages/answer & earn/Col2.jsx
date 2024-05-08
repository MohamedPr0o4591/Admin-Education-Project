import React from "react";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { IconButton, Paper, useTheme } from "@mui/material";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import {
  Cancel,
  CheckCircle,
  CheckCircleOutline,
  DeleteRounded,
  HighlightOff,
} from "@mui/icons-material";

const Col2 = (props) => {
  const theme = useTheme();

  return (
    <Col xs={12} lg={6}>
      <Container className="d-flex justify-content-center align-items-center">
        <Paper
          className="overflow-auto"
          sx={{
            height: 75 + "vh",
            width: 100 + "%",
            minWidth: 420 + "px",
            maxWidth: 530 + "px",
            px: 2,
            py: 5,
            textAlign: props.language === "Arabic" ? "right" : "left",
          }}
        >
          <Stack gap={1}>
            <Stack direction={"row"} alignItems={"center"}>
              <h4 className="border-bottom pb-2">{props.alignment}</h4>
              <Box flexGrow={1} />

              {props.score !== 0 && props.score !== undefined && (
                <span
                  style={{ color: theme.palette.primary.main }}
                  className="d-flex gap-2"
                >
                  مجموع الدرجات:{" "}
                  <p className="text-danger">{props.score.toLocaleString()}</p>{" "}
                  درجة
                </span>
              )}
            </Stack>

            {props.arrQuestions.length > 0
              ? props.arrQuestions.map((question, index) => {
                  return (
                    <Box key={index}>
                      {question.options.length > 2 ? (
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
                                {question.questionScore.toLocaleString()}
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
                            {question.questionText}
                          </Paper>
                          <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
                            <Paper
                              elevation={3}
                              className="flex-grow-1"
                              sx={{
                                p: 2,
                                background:
                                  question.correctAnswer === question.options[0]
                                    ? theme.palette.success.dark
                                    : null,
                                color:
                                  question.correctAnswer === question.options[0]
                                    ? "#efef"
                                    : null,
                              }}
                            >
                              {question.options[0]}
                            </Paper>
                            <Paper
                              elevation={3}
                              className="flex-grow-1"
                              sx={{
                                p: 2,
                                background:
                                  question.correctAnswer === question.options[1]
                                    ? theme.palette.success.dark
                                    : null,
                                color:
                                  question.correctAnswer === question.options[1]
                                    ? "#efef"
                                    : null,
                              }}
                            >
                              {question.options[1]}
                            </Paper>
                          </Stack>

                          <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
                            <Paper
                              elevation={3}
                              className="flex-grow-1"
                              sx={{
                                p: 2,
                                background:
                                  question.correctAnswer === question.options[2]
                                    ? theme.palette.success.dark
                                    : null,
                                color:
                                  question.correctAnswer === question.options[2]
                                    ? "#efef"
                                    : null,
                              }}
                            >
                              {question.options[2]}
                            </Paper>
                            <Paper
                              elevation={3}
                              className="flex-grow-1"
                              sx={{
                                p: 2,
                                background:
                                  question.correctAnswer === question.options[3]
                                    ? theme.palette.success.dark
                                    : null,
                                color:
                                  question.correctAnswer === question.options[3]
                                    ? "#efef"
                                    : null,
                              }}
                            >
                              {question.options[3]}
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
                                {question.questionScore.toLocaleString()}
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
                              {question.questionText}
                            </Paper>
                            {question.correctAnswer === "true" ? (
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
};

export default Col2;
