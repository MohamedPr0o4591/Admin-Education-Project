import React from "react";
import { Container } from "react-bootstrap";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Box, Button, Paper, Stack, useTheme } from "@mui/material";
import "./ProfilePage.css";
import Row1 from "../../components/pages/profile settings/Row1";
import Row2 from "../../components/pages/profile settings/Row2";

export default function ProfilePage() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [facebook, setFacebook] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [youtube, setYoutube] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container className="profile-page">
      <HeaderLine title="إعدادات الملف الشخصي" />

      <Row1
        handleSubmit={handleSubmit}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
      />

      <Row2
        facebook={facebook}
        setFacebook={setFacebook}
        whatsapp={whatsapp}
        setWhatsapp={setWhatsapp}
        youtube={youtube}
        setYoutube={setYoutube}
      />
    </Container>
  );
}
