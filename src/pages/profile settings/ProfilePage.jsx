import React from "react";
import { Container } from "react-bootstrap";
import HeaderLine from "../../components/headerLine/HeaderLine";
import { Box, Button, Paper, Stack, useTheme } from "@mui/material";
import "./ProfilePage.css";
import Row1 from "../../components/pages/profile settings/Row1";
import Row2 from "../../components/pages/profile settings/Row2";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfileDetails } from "../../Redux/actions/Actions";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [facebook, setFacebook] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [imgFile, setImgFile] = React.useState();

  const [profileDetails, setProfileDetails] = React.useState([]);
  const detailsProfile = useSelector((state) => state.PROFILEDETAILS.profile);
  const dispatch = useDispatch();

  const clearData = (_) => {
    setFirstName("");
    setLastName("");
    setFacebook("");
    setWhatsapp("");
    setImgFile();
  };

  React.useEffect(() => {
    let token = localStorage.login;
    document.title = "الملف الشخصي";

    dispatch(getAllProfileDetails(token));
  }, []);

  React.useEffect(() => {
    setProfileDetails(detailsProfile);
  }, [detailsProfile]);

  const handleChangeDetails = async (e) => {
    e.preventDefault();
    let token = localStorage.login;

    let updatedData = {};

    if (firstName !== "") {
      updatedData.firstName = firstName;
    }

    if (lastName !== "") {
      updatedData.lastName = lastName;
    }

    if (imgFile) {
      const formData = new FormData();
      formData.append("image", imgFile);

      try {
        await axios.patch(`${import.meta.env.VITE_API}teacher`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(`تم حفظ التغييرات وتعديل الملف الشخصي بنجاح`);
        dispatch(getAllProfileDetails(token));
        clearData();
      } catch (err) {
        toast.error("يرجى اختيار صورة جديدة");
      }
    }

    if (Object.keys(updatedData).length > 0) {
      try {
        await axios.patch(`${import.meta.env.VITE_API}teacher`, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success(`تم حفظ التغييرات وتعديل الملف الشخصي بنجاح`);
        dispatch(getAllProfileDetails(token));

        clearData();
      } catch (err) {
        toast.error("ادخل التغييرات التى تريدها");
      }
    }
  };

  const handleUpdateMedia = async (social) => {
    let token = localStorage.login;
    try {
      if (social === "facebook") {
        await axios.patch(
          `${import.meta.env.VITE_API}teacher`,
          {
            facebookUrl: facebook,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (social === "whatsapp") {
        await axios.patch(
          `${import.meta.env.VITE_API}teacher`,
          {
            whatsappUrl: `https://wa.me/+2${whatsapp}`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      dispatch(getAllProfileDetails(token));
      toast.success("تم تعديل البيانات بنجاح");
      clearData();
    } catch (err) {
      toast.error("حدث خطأ");
    }
  };

  return (
    <Container className="profile-page">
      <HeaderLine title="إعدادات الملف الشخصي" />

      <Row1
        handleChangeDetails={handleChangeDetails}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        profileDetails={profileDetails}
        setImgFile={setImgFile}
        imgFile={imgFile}
      />

      <Row2
        facebook={facebook}
        setFacebook={setFacebook}
        whatsapp={whatsapp}
        setWhatsapp={setWhatsapp}
        profileDetails={profileDetails}
        handleUpdateMedia={handleUpdateMedia}
      />
    </Container>
  );
}
