import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import React from "react";
import { Col } from "react-bootstrap";
import FileUploader from "../../../pages/course/FileUploader";
import axios from "axios";

export default function Col1(props) {
  const theme = useTheme();

  const [classes, setClasses] = React.useState([]);

  const [imgReader, setImgReader] = React.useState();

  const handleUploadImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImgReader(URL.createObjectURL(file));
        props.setImgFile(file);
      };
    }
  };

  React.useEffect(() => {
    return async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}class`);

        setClasses(res.data.classes);
      } catch (err) {
        console.error(err);
      }
    };
  }, []);

  return (
    <Box>
      <Stack gap={1}>
        <span style={{ color: theme.palette.primary.dark }}>
          اولا حدد المستوى التعليمي
        </span>

        <Stack
          direction={"row"}
          gap={1}
          alignItems={"center"}
          flexWrap={"wrap"}
        >
          {classes.length > 0
            ? classes.map((item, index) => {
                return (
                  <Box
                    className="box-classes"
                    sx={{
                      background:
                        props.classDetails.name === item.name
                          ? "#f1f1f1"
                          : theme.palette.mode === "dark"
                          ? "#242424"
                          : "#f1faf1",

                      color:
                        props.classDetails.name === item.name
                          ? "#4a4a4a"
                          : theme.palette.text.primary,

                      transform:
                        props.classDetails.name === item.name
                          ? "skew(7deg)"
                          : "skew(0deg)",
                    }}
                    key={index}
                    onClick={(_) => {
                      props.setClassDetails({
                        name: item.name,
                        id: item.id,
                      });
                    }}
                  >
                    {item.name}
                  </Box>
                );
              })
            : null}
        </Stack>
      </Stack>

      <Stack direction={"row"} gap={2} alignItems={"center"} mt={2}>
        <input
          className="flex-grow-1"
          type="text"
          placeholder="عنواع الكتاب"
          value={props.bookTitle}
          onChange={(e) => props.setBookTitle(e.target.value)}
          style={{
            background: theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
            color: theme.palette.text.primary,
          }}
        />

        <Box flexGrow={1} />
      </Stack>

      <Stack direction={"row"} gap={2} alignItems={"center"} mt={2}>
        <textarea
          className="flex-grow-1"
          placeholder="وصف عن الكتاب"
          value={props.bookDesc}
          onChange={(e) => props.setBookDesc(e.target.value)}
          rows={"4"}
          style={{
            background: theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
            color: theme.palette.text.primary,
          }}
        />
      </Stack>

      <Box mt={3}>
        <span style={{ color: theme.palette.primary.dark }}>
          ضع صورة مصغرة للكتاب
        </span>

        <Stack direction={"row"} gap={2} mt={1}>
          <span className="user-select-none">اضغط لاختيار الصورة المصغرة</span>
          <Box flexGrow={1} />

          <div className="w-50 d-flex flex-column gap-4 align-items-end">
            <input
              type="file"
              className="d-none"
              id="upload-cover"
              onChange={handleUploadImg}
              accept="image/*" // تحديد أنه يمكن قبول ملفات الصور فقط
            />

            <label
              htmlFor="upload-cover"
              style={{
                cursor: "pointer",
                color: theme.palette.primary.dark,
                background:
                  theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                border: `1px solid ${theme.palette.primary.dark}`,
              }}
              className="upload-cover w-100"
            >
              300 × 300
            </label>
            {imgReader ? (
              <img className="book-cover" src={imgReader} alt="book cover" />
            ) : null}
          </div>
        </Stack>
      </Box>

      <Box mt={3}>
        <span style={{ color: theme.palette.primary.dark }}>
          ارفق كتاب الشرح
        </span>

        <FileUploader files={props.files} setFiles={props.setFiles} />
      </Box>

      <Stack direction={"row"} gap={2} alignItems={"center"} mt={2}>
        <Box flexGrow={1} />

        <Button
          color={"primary"}
          variant="contained"
          sx={{ p: "10px 20px" }}
          className="flex-grow-1"
          onClick={props.handleSendData}
        >
          حفظ
        </Button>
      </Stack>
    </Box>
  );
}
