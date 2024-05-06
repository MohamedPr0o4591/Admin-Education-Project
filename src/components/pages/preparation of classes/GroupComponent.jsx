import { AddRounded, CloseRounded, InfoRounded } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Stack, useTheme } from "@mui/material";
import React, { useState } from "react";

const GroupComponent = (props) => {
  const theme = useTheme();
  const [groupDetails, setGroupDetails] = useState([]);
  const [mood, setMood] = useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 520,
    bgcolor: "background.paper",
    border: "2px solid rgba(0 ,0 ,0 ,.2)",
    boxShadow: "0 0 0.4rem rgb(103 138 201 / 70%)",
    p: "0.4rem 0.8rem",
    borderRadius: "0.4rem",
  };

  const handleOpen = (mood, name, id) => {
    setMood(mood);
    if (mood === "delete") {
      props.setDeleteMood("group");
      setGroupDetails({
        name: name,
        id: id,
      });
    }

    props.setOpen2(true);
  };

  const handleClick = (_) => {
    if (mood === "delete") {
      props.handleDelete(groupDetails.id);
    } else {
      if (props.groupName !== "") {
        props.handleAddGroup();
      } else {
        alert("ادخل اسم المجموعة");
      }
    }
  };
  return (
    <Box>
      <span
        style={{ color: theme.palette.primary.main }}
        className="d-block mt-3 mb-2"
      >
        <InfoRounded /> لحذف المجموعة اضغط على اسم المجموعة (يمكنك حذف المجموعة
        من اخر مجموعة تم انشاءها)
      </span>
      <ul className="list-unstyled d-flex gap-2 mt-3 p-0 flex-wrap align-items-center">
        {props.groupDetails.length > 0 ? (
          props.groupDetails.map((item, index) => {
            return (
              <li key={index}>
                <Box
                  className="class-box"
                  title="حذف"
                  onClick={(_) => handleOpen("delete", item.name, item.id)}
                  sx={{
                    background:
                      theme.palette.mode === "dark" ? "#2d3437" : "#ccdce1",
                    color: theme.palette.text.primary,

                    ":hover": {
                      background: theme.palette.error.main,
                      boxShadow: `0 0 0.65rem ${theme.palette.error.main}`,
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  {item.name}
                </Box>
              </li>
            );
          })
        ) : (
          <li>
            <span className="text-danger">
              لا توجد مجاميع لإضافة مجموعة إضغط على علامة +
            </span>
          </li>
        )}
        <li>
          <IconButton
            color="primary"
            onClick={(_) => handleOpen("add", "", "")}
          >
            <AddRounded />
          </IconButton>
        </li>
      </ul>

      <Modal
        open={props.open2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Box flexGrow={1} />

            <IconButton color="inherit" onClick={(_) => props.setOpen2(false)}>
              <CloseRounded />
            </IconButton>
          </Stack>

          {mood === "delete" ? (
            <p>
              هل متأكد من حذف{" "}
              <i style={{ color: theme.palette.primary.main }}>
                {groupDetails.name}
              </i>
              ؟
            </p>
          ) : (
            <div>
              <p>ادخل اسم المجموعة</p>
              <input
                type={"text"}
                className="flex-grow-1 w-100"
                placeholder="مثلا: مجموعة 1 او مجموعة المتفوقين"
                value={props.groupName}
                onChange={(e) => props.setGroupName(e.target.value)}
                style={{
                  background:
                    theme.palette.mode === "dark" ? "#242424" : "#f1faf1",
                  color: theme.palette.text.primary,
                  border: "none",
                  outline: "none",
                }}
              />
            </div>
          )}

          <Stack direction={"row"} gap={2} mt={2}>
            <Box flexGrow={1} />

            <Button
              variant="contained"
              color={mood === "delete" ? "error" : "success"}
              onClick={handleClick}
            >
              {mood === "delete" ? "حذف" : "إضافة"}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default GroupComponent;
