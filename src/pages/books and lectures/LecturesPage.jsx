import React from "react";
import "./LecturesPage.css";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Row } from "react-bootstrap";
import Col1 from "../../components/pages/books and lectures/Col1";
import Col2 from "../../components/pages/books and lectures/Col2";
import Row1 from "../../components/pages/books and lectures/Row1";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, useTheme } from "@mui/material";
import { rows } from "../../components/pages/books and lectures/Data";

export default function LecturesPage() {
  const [alignment, setAlignment] = React.useState("");
  const [finished, setFinished] = React.useState(false);
  const [files, setFiles] = React.useState([]);

  const [bookDesc, setBookDesc] = React.useState("");
  const [bookTitle, setBookTitle] = React.useState("");

  const [ImgReader, setImgReader] = React.useState("");

  const [createType, setCreateType] = React.useState("add");

  React.useEffect(() => {
    localStorage.removeItem("books");
  }, []);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleSave = (_) => {
    let arr;
    const object = {
      title: bookTitle,
      desc: bookDesc,
      cover: ImgReader,
      pdf: files,
      level: alignment,
    };

    if (localStorage.books) {
      arr = JSON.parse(localStorage.books);
      arr.push(object);
    } else {
      arr = [object];
    }

    localStorage.books = JSON.stringify(arr);
    setBookTitle("");
    setBookDesc("");
    setImgReader("");
    setFiles([]);
  };

  const theme = useTheme();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "bookTitle",
      headerName: "عنوان الكتاب",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "bookDesc",
      headerName: "وصف الكتاب",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cover",
      headerName: "صورة الكتاب",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button color="secondary" variant="contained">
            عرض الصورة
          </Button>
        );
      },
    },
    {
      field: "pdf",
      headerName: "PDF",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button color="secondary" variant="contained">
            عرض المحتوى
          </Button>
        );
      },
    },
    {
      field: "level",
      headerName: "المستوى التعليمى",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <span
            style={{
              background: params.row.level.includes("الاول")
                ? theme.palette.primary.main
                : params.row.level.includes("الثانى")
                ? theme.palette.warning.main
                : theme.palette.success.main,
              color: theme.palette.background.default,
              padding: "7px 10px",
              borderRadius: 0.6 + "rem",
              pointerEvents: "none",
            }}
          >
            {params.row.level}
          </span>
        );
      },
    },
    {
      field: "date",
      headerName: "تاريخ",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "delete",
      headerName: "حذف",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button color="error" variant="contained">
            حذف
          </Button>
        );
      },
    },
  ];

  return (
    <div className="lectures-page">
      <HeaderLine
        title={
          createType === "add" ? "اضافة كتاب / مذكرة" : "عرض الكتب / المذكرات"
        }
      />

      <Row1 createType={createType} setCreateType={setCreateType} />

      {/* col 1 */}

      {createType === "add" ? (
        <Row>
          <Col1
            alignment={alignment}
            handleChange={handleChange}
            finished={finished}
            setFinished={setFinished}
            bookDesc={bookDesc}
            setBookDesc={setBookDesc}
            bookTitle={bookTitle}
            setBookTitle={setBookTitle}
            handleSave={handleSave}
            ImgReader={ImgReader}
            setImgReader={setImgReader}
            files={files}
            setFiles={setFiles}
          />

          <Col2
            alignment={alignment}
            bookDesc={bookDesc}
            bookTitle={bookTitle}
          />
        </Row>
      ) : (
        <Box sx={{ height: 75 + "vh", width: "100%", mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            rowsPerPageOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      )}

      {/* col 2 */}
    </div>
  );
}
