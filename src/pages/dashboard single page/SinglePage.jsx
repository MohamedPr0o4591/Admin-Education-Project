import React from "react";
import "./SinglePage.css";
import { Avatar, Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import {
  AndroidRounded,
  FacebookOutlined,
  Filter1Rounded,
  SensorOccupiedRounded,
  SwitchAccountRounded,
  WhatsApp,
} from "@mui/icons-material";
import image from "../../assets/photo.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfileDetails } from "../../Redux/actions/Actions";

const SinglePage = () => {
  const teacherDetails = useSelector((state) => state.PROFILEDETAILS.profile);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let token = localStorage.login;

    dispatch(getAllProfileDetails(token));
  }, []);

  return (
    <div className="single-page">
      <div className="inner-page" />
      <nav>
        <h4 className="m-0">مذكرتى</h4>

        <div className="content-box">
          <ul className="list-unstyled d-flex gap-3 m-0">
            <li>
              <a href="#">الصفحة الرئيسية</a>
            </li>

            <li>
              <a href="#">تحميل التطبيق</a>
            </li>
            <li>
              <Link to={"/admin"}>صفحة القيادة</Link>
            </li>
          </ul>
        </div>
      </nav>

      <section className="home-section">
        <Box className="content-box">
          <h5 className="fw-bold">السلام عليكم ورحمة الله وبركاته</h5>
          <p>أ / محمد مختار مصطفى</p>
          <span className="desc">
            مدرس أول فى اللغة العربية للمدرسة الثانوية بمحافظة ... مركز ... يعلن
            عن إنساء موسوعة كاملة فيما يتعلق بتفوق الطالب معنا حيث يتم شرح
            المنهج كامل داخل الموسوعة لتمديد معلومات الطالب وإمكانية الرجوع
            للمعلومات الدراسة حيث يتم الاحتفاظ بواجبات المحاضرات وإنشاء عديد من
            الامتحانات والاختبارات اليومية لمتابعة مستوى الطالب بـ استمرار
          </span>

          <ul className="m-0 mt-3 p-0 list-unstyled d-flex gap-2 flex-wrap list-social">
            <li>
              <a
                href={teacherDetails.facebookUrl}
                target="_blank"
                id="facebook"
              >
                <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <FacebookOutlined />
                  <span>صفحتنا على فيس بوك</span>
                </Stack>
              </a>
            </li>

            <li>
              <a
                href={teacherDetails.whatsappUrl}
                target="_blank"
                id="whatsapp"
              >
                <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <WhatsApp />
                  <span>واتساب</span>
                </Stack>
              </a>
            </li>
          </ul>

          <Stack direction={"row"} gap={2} mt={3}>
            <Button
              variant="contained"
              className="mt-3"
              color="success"
              id="download-app"
              sx={{
                textTransform: "none",
                fontSize: "1.2rem",
                fontWeight: "500",
                px: 4,
                color: "#4a4a4a",
              }}
            >
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                <AndroidRounded />
                تحميل التطبيق
              </Stack>
            </Button>

            <Box flexGrow={1} />
          </Stack>
        </Box>

        <div className="profession-container">
          <div className="profession-box">
            <div className="profession" style={{ "--i": 0 }}>
              <SwitchAccountRounded
                sx={{ fontSize: 3 + "rem", color: "#ffaa4f" }}
              />
              <p>مدرس أول</p>
            </div>
            <div className="profession" style={{ "--i": 1 }}>
              <WhatsApp sx={{ fontSize: 3 + "rem", color: "#ffaa4f" }} />
              <p>01022585956</p>
            </div>{" "}
            <div className="profession" style={{ "--i": 2 }}>
              <SensorOccupiedRounded
                sx={{ fontSize: 3 + "rem", color: "#ffaa4f" }}
              />
              <p>معلم خبير</p>
            </div>
            <div className="profession" style={{ "--i": 3 }}>
              <Filter1Rounded sx={{ fontSize: 3 + "rem", color: "#ffaa4f" }} />
              <p>درجة أولى</p>
            </div>
            <div className="circle" />
          </div>
          <div className="overlay" />

          <img src={image} alt="Mohamed Mokhtar" />
        </div>
      </section>
    </div>
  );
};

export default SinglePage;
