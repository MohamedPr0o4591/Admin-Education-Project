import React from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { Paper, useTheme } from "@mui/material";
import { CheckRounded, ErrorRounded } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const notify = () => toast(`تم تسجيل الدخول بنجاح`);
  const navigate = useNavigate();

  const [auth, setAuth] = React.useState({ email: "", pass: "" });

  const [active, setActive] = React.useState(false);
  const [loadingFetchData, setLoadingFetchData] = React.useState(false);
  const [err, setErr] = React.useState("");

  React.useEffect(() => {
    document.title = "تسجيل الدخول الى صفحة القيادة";
    if (localStorage.login) {
      navigate("/admin");
    } else navigate("/login");
  }, []);

  const handleChangeInput = (e) => {
    setActive(false);
    setErr("");
    const { name, value } = e.target;

    setAuth({ ...auth, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActive(true);
    setLoadingFetchData(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}teacher/login`,
        { email: auth.email, password: auth.pass },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.token) {
        notify();
        localStorage.setItem("login", res.data.token);
        navigate("/admin");
      }
    } catch (err) {
      setErr(err.response.status);
    }

    setLoadingFetchData(false);
  };

  const theme = useTheme();

  return (
    <div className="login-page">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h2>تسجيل الدخول</h2>

        {err === 401 && active && (
          <Paper
            sx={{
              p: 2,
              bgcolor: theme.palette.error.main,
            }}
          >
            {<ErrorRounded />} البريد الالكترونى او كلمة المرور غير صحيحة
          </Paper>
        )}

        <div className="input-box">
          <input
            type="email"
            required
            value={auth.email}
            name="email"
            onChange={handleChangeInput}
          />
          <span>الحساب الالكترونى</span>
        </div>
        <div className="input-box">
          <input
            type="password"
            required
            value={auth.pass}
            name="pass"
            onChange={handleChangeInput}
          />
          <span>كلمة المرور</span>
        </div>

        <input
          type="submit"
          value={`${
            loadingFetchData ? "جاري تسجيل الدخول ..." : "تسجيل الدخول"
          }`}
          disabled={loadingFetchData}
          style={{
            cursor: !loadingFetchData ? "pointer" : "not-allowed",
            opacity: !loadingFetchData ? 1 : 0.5,
          }}
        />
      </form>
    </div>
  );
}
