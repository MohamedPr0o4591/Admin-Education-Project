import {
  Box,
  Button,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import React from "react";
import { Col } from "react-bootstrap";
import FileUploader from "../../../pages/course/FileUploader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses } from "../../../Redux/actions/Actions";
import { Cancel } from "@mui/icons-material";

export default function Col1(props) {
  const theme = useTheme();

  const [classes, setClasses] = React.useState([]);
  const [classesDetails, setClassesDetails] = React.useState([]);
  const dataClasses = useSelector((state) => state.CLASSES.classes);
  const dispatch = useDispatch();

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
    dispatch(getAllClasses());
  }, []);

  React.useEffect(() => {
    setClasses(dataClasses);
    let arr1 = dataClasses.filter(
      (item) =>
        item.name.includes("الابتدائى") || item.name.includes("الابتدائي")
    );

    let arr2 = dataClasses.filter(
      (item) => item.name.includes("الاعدادى") || item.name.includes("الاعدادي")
    );

    let arr3 = dataClasses.filter(
      (item) => item.name.includes("الثانوي") || item.name.includes("الثانوى")
    );

    setClassesDetails({
      arr1,
      arr2,
      arr3,
    });
  }, [dataClasses]);

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
          {classes.length > 0 ? (
            <Stack gap={2} width={"100%"}>
              <span>الصفوف الابتدائية</span>
              {classesDetails.arr1.length > 0 ? (
                <Stack
                  direction={"row"}
                  gap={1}
                  alignItems={"center"}
                  flexWrap={"wrap"}
                >
                  {classesDetails.arr1.map((item, index) => {
                    return (
                      <Box
                        className="box-classes "
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
                  })}
                </Stack>
              ) : (
                <span className="text-warning text-center">
                  {" "}
                  لا توجد صفوف ابتدائية
                </span>
              )}

              <span>الصفوف الاعدادية</span>
              {classesDetails.arr2.length > 0 ? (
                <Stack
                  direction={"row"}
                  gap={1}
                  alignItems={"center"}
                  flexWrap={"wrap"}
                >
                  {classesDetails.arr2.map((item, index) => {
                    return (
                      <Box
                        className="box-classes "
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
                  })}
                </Stack>
              ) : (
                <span className="text-warning text-center">
                  {" "}
                  لا توجد صفوف اعدادية
                </span>
              )}

              <span>الصفوف الثانوية</span>
              {classesDetails.arr3.length > 0 ? (
                <Stack
                  direction={"row"}
                  gap={1}
                  alignItems={"center"}
                  flexWrap={"wrap"}
                >
                  {classesDetails.arr3.map((item, index) => {
                    return (
                      <Box
                        className="box-classes "
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
                  })}
                </Stack>
              ) : (
                <span className="text-warning text-center">
                  {" "}
                  لا توجد صفوف ثانوية
                </span>
              )}
            </Stack>
          ) : null}
        </Stack>
      </Stack>

      <div>
        <Stack direction={"row"} gap={2} alignItems={"center"} mt={5}>
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
            {/* <Box flexGrow={1} /> */}

            <div className="w-50 m-auto d-flex flex-column gap-4 align-items-end">
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
                اضغط لاضافة صورة
              </label>
            </div>
          </Stack>
          <Box className="d-flex">
            <Box flexGrow={1} />
            {imgReader && (
              <div className="box-img position-relative">
                <img className="book-cover" src={imgReader} alt="book cover" />
                <div className="delete-action">
                  <IconButton color="error" onClick={(_) => setImgReader(null)}>
                    <Cancel />
                  </IconButton>
                </div>
              </div>
            )}
          </Box>
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
            disabled={props.LoadingFetchData}
          >
            {props.LoadingFetchData ? "جاري التحميل ..." : "حفظ"}
          </Button>
        </Stack>
      </div>
    </Box>
  );
}
