import { Box, Button, Paper, Stack, useTheme } from "@mui/material";
import React from "react";
import { Col } from "react-bootstrap";

export default function Col2(props) {
  const theme = useTheme();

  const [arr, setArr] = React.useState([]);

  React.useEffect(() => {
    setArr([]);
  }, []);

  React.useEffect(() => {
    if (localStorage.books) {
      setArr(JSON.parse(localStorage.books));
    }
  }, [localStorage.books]);

  const handleRemove = (i) => {
    let newArr = JSON.parse(localStorage.books);
    newArr.splice(i, 1);
    setArr(newArr);
    localStorage.books = JSON.stringify(newArr);
  };

  return (
    <Col sm={12} lg={6} className="d-flex justify-content-center">
      <Paper sx={{ height: 75 + "vh", width: "70%", px: 2, py: 5 }}>
        <Stack
          height={100 + "%"}
          sx={{ border: `1px solid ${theme.palette.primary.dark}` }}
          className="paper-box "
        >
          <span
            className="level"
            style={{
              background: theme.palette.mode === "dark" ? "#242424" : "#ffff",
            }}
          >
            {props.alignment}
          </span>

          <Box className="h-100 overflow-auto">
            {arr.length > 0
              ? arr.map((item, index) => {
                  return (
                    <Paper
                      sx={{ mt: 2, p: "10px 20px" }}
                      elevation={9}
                      key={index}
                    >
                      <Stack direction={"row"} gap={2} alignItems={"normal"}>
                        <Stack gap={1}>
                          <strong>
                            <i>{item.title}</i>
                          </strong>

                          <span title={item.desc}>
                            {item.desc.length > 25
                              ? item.desc.substring(0, 25) + "..."
                              : item.desc}
                          </span>

                          <Box flexGrow={1} />
                          <Button
                            color="error"
                            variant="contained"
                            className="w-100 "
                            onClick={() => handleRemove(index)}
                          >
                            حذف
                          </Button>
                        </Stack>

                        {item.pdf.length > 0 ? (
                          <span
                            className="flex-grow-1 text-center"
                            style={{ color: theme.palette.success.main }}
                          >
                            تم حديد الملف المرفق
                          </span>
                        ) : (
                          <Box flexGrow={1} />
                        )}

                        {item.cover && (
                          <img src={item.cover} alt="cover" className="w-25" />
                        )}
                      </Stack>
                    </Paper>
                  );
                })
              : null}
          </Box>
        </Stack>
      </Paper>
    </Col>
  );
}
