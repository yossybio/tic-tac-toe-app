// import React from "react";
// import * as React from "react";
import styles from "../../assets/modal.module.css";
import woodImg from "../../assets/WoodBackgroundImg.jpg";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetStore } from "../../Redux/gameDataSlice";

export default function WinnerModal(props) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // bgcolor: "background.paper",
    backgroundImage: `url(${woodImg})`,
    border: "2px solid #000",
    boxShadow: 24,
    color: "#F9F7F7",
    textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
    p: 4,
  };

  const clickHandler = () => {
    dispatch(resetStore());
    localStorage.clear();
    navigate("/");
  };

  return (
    <Modal
      open={props.open}
    //   onClose={handleClose}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography> */}
        <Typography id="modal-modal-title" variant="h3" dir="rtl" component="h2" textAlign="center">
          תיקו!!!
        </Typography>
        <button className={styles.playAgainButton} onClick={clickHandler}>שחק שוב</button>
        {/* <Stack
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <h1 style={{ direction: "rtl", textAlign: "center" }}>תיקו!!!</h1>
          <button onClick={clickHandler} style={{ width: "100%" }}>
            PLAY AGAIN
          </button>
        </Stack> */}
      </Box>
    </Modal>
  );
}
