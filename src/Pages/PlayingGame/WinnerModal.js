import React, { memo } from "react";
// import * as React from "react";
import styles from "../../assets/modal.module.css";
import woodImg from "../../assets/WoodBackgroundImg.jpg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "../../Redux/gameDataSlice";
import { useNavigate } from "react-router-dom";

export default memo(function WinnerModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const winnerPlayer = useSelector(
    (state) => state.gameData.gameStatus.currentTurnPlayer
  );

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    textAlign: 'center',
    transform: "translate(-50%, -50%)",
    width: "30vw",
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
  }

  return (
    <Modal
      open={props.open}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h3" dir="rtl" component="h2">
          שחקן {winnerPlayer} ניצח!!!
        </Typography>
        <button className={styles.playAgainButton} onClick={clickHandler}>שחק שוב</button>
      </Box>
    </Modal>
  );
})
