import React from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [pass, setPass] = React.useState("");

  React.useEffect(() => {
    document.title = "تسجيل الدخول الى صفحة القيادة";

    if (localStorage.login) {
      navigate("/admin");
    } else navigate("/login");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.login = JSON.stringify({ username });
    navigate("/admin");
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>تسجيل الدخول</h2>
        <div className="input-box">
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span>اسم المستخدم</span>
        </div>
        <div className="input-box">
          <input
            type="password"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <span>كلمة المرور</span>
        </div>

        <input type="submit" value="تسجيل الدخول" />
      </form>
    </div>
  );
}
