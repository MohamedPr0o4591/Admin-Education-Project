import React from "react";
import "./LecturesPage.css";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Container, Row } from "react-bootstrap";
import Col1 from "../../components/pages/books and lectures/Col1";
import Row1 from "../../components/pages/books and lectures/Row1";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../Redux/actions/Actions.jsx";
import { DeleteRounded } from "@mui/icons-material";

export default function LecturesPage() {
  const [rows, setRows] = React.useState([]);
  const [classDetails, setClassDetails] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [LoadingFetchData, setLoadingFetchData] = React.useState(false);
  const [files, setFiles] = React.useState();

  const [bookDesc, setBookDesc] = React.useState("");
  const [bookTitle, setBookTitle] = React.useState("");

  const [imgFile, setImgFile] = React.useState();

  const [createType, setCreateType] = React.useState((prev) =>
    prev !== "" ? "add" : prev
  );

  const dispatch = useDispatch();
  const dataBooks = useSelector((state) => state.BOOKS.books);

  React.useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  React.useEffect(() => {
    if (dataBooks.length > 0) {
      let allBooks = dataBooks.map((item, index) => ({
        id: index + 1,
        bookTitle: item.title,
        bookDesc: item.description,
        level: item.class.name,
        date: item.createdAt.split("T")[0],
        delete: item.id,
        cover: `${import.meta.env.VITE_API}${item.cover}`,
        pdf: `${import.meta.env.VITE_API}${item.file}`,
      }));

      setRows(allBooks);
    } else setRows([]);
  }, [dataBooks]);

  const theme = useTheme();

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}book/${id}`);

      toast.success("تم حذف الكتاب بنجاح");
      dispatch(getAllBooks());
    } catch (err) {
      toast.error("حدث خطأ اثناء حذف الكتاب");
    }
  };

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
            <a
              style={{
                color: theme.palette.background.default,
              }}
              className="text-decoration-none"
              href={params.row.cover}
              target="_blank"
            >
              عرض الصورة
            </a>
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
            <a
              style={{
                color: theme.palette.background.default,
              }}
              className="text-decoration-none"
              href={params.row.pdf}
              target="_blank"
            >
              عرض المحتوى
            </a>
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
              background:
                params.row.level.includes("الاول") ||
                params.row.level.includes("الأول")
                  ? theme.palette.primary.main
                  : params.row.level.includes("الثانى") ||
                    params.row.level.includes("الثاني")
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
      width: 44,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <IconButton
            color="error"
            variant="contained"
            onClick={(_) => handleDeleteBook(params.row.delete)}
          >
            <DeleteRounded />
          </IconButton>
        );
      },
    },
  ];

  const renderCleaner = () => {
    setClassDetails([]);
    setCreateType("add");
    setBookDesc("");
    setBookTitle("");
    setImgFile();
    setFiles();
  };

  const handleSendData = async () => {
    setLoadingFetchData(true);
    let flag;

    if (
      imgFile !== undefined &&
      files !== undefined &&
      bookDesc !== "" &&
      bookTitle !== "" &&
      classDetails.id
    ) {
      flag = true;
    } else flag = false;

    if (flag) {
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("title", bookTitle);
        formData.append("description", bookDesc);
        formData.append("classId", classDetails.id);

        formData.append("cover", imgFile);

        files.forEach((file, index) => {
          formData.append(`pdf`, file);
        });

        await axios.post(`${import.meta.env.VITE_API}book`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        renderCleaner();
        setTimeout(() => {
          setCreateType("show");
        }, 3000);
        dispatch(getAllBooks());

        toast.success(`تم اضافة الكتاب بنجاح`);
      } catch (err) {
        toast.error(`حدث خطأ ما`);
      }
    } else {
      toast.error("يحب ملء البيانات كاملة!!!");
    }

    setLoading(false);
    setLoadingFetchData(false);
  };

  return (
    <div className="lectures-page">
      {loading ? (
        <div className="loading">
          <div
            class="spinner-border"
            role="status"
            style={{ width: 144 + "px", height: 144 + "px" }}
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : null}

      <HeaderLine
        title={
          createType === "add" ? "اضافة كتاب / مذكرة" : "عرض الكتب / المذكرات"
        }
      />

      <ToastContainer position="top-right" />

      <Row1 createType={createType} setCreateType={setCreateType} />

      {/* col 1 */}

      {createType === "add" ? (
        <Container>
          <Col1
            setClassDetails={setClassDetails}
            classDetails={classDetails}
            bookDesc={bookDesc}
            setBookDesc={setBookDesc}
            bookTitle={bookTitle}
            setBookTitle={setBookTitle}
            files={files}
            setFiles={setFiles}
            handleSendData={handleSendData}
            setImgFile={setImgFile}
            imgFile={imgFile}
            LoadingFetchData={LoadingFetchData}
          />
        </Container>
      ) : (
        <Box sx={{ height: 75 + "vh", width: "100%", mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            rowsPerPageOptions={[10]}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </Box>
      )}
    </div>
  );
}
