import React from "react";
import styles from "../../assets/SetPlayers.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setPlayersMode,
  setComputerPlayerSymbol,
} from "../../Redux/gameDataSlice";
import { Stack } from "@mui/material";
import MainImg from "../../assets/MainPageImg.jpg";
import { motion } from "framer-motion";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function SetPlayersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const USER_VS_CPU_MODE = 1;
  const USER_VS_USER_MODE = 2;

  const savingDataInLocalStorage = (numOfPlayers) => {
    localStorage.setItem("numOfPlayers", JSON.stringify(numOfPlayers));
  };

  const clickHandler = (gameMode) => {
    const { numOfPlayers } = gameMode;
    dispatch(setPlayersMode(numOfPlayers));
    dispatch(setComputerPlayerSymbol({ computerPlayerSymbol: "O" }));
    savingDataInLocalStorage(numOfPlayers);
    setTimeout(() => { navigate("/setGrid"); }, 500);

  };

  return (
    <>
      <body>
        <Stack alignItems="center" spacing={8}>
          <Box component="img"
            src={MainImg} alt="Set players main img"
            sx={{
              height: "auto",
              width: {
                xs: "65%",
                sm: "55%",
                md: "45%",
                lg: "30%",
              }
            }} />
          <Stack alignItems="center" spacing={3}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                clickHandler({ numOfPlayers: USER_VS_CPU_MODE });
              }}
              component={motion.div}
              whileHover={{
                backgroundColor: "white",
                scale: 1.2,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: [1.5, 1.2], transition: { duration: 0.25 } }}
              sx={{ backgroundColor: "#F9F7F7", color: "black" }}
            >
              שחקן נגד מחשב
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                clickHandler({ numOfPlayers: USER_VS_USER_MODE });
              }}
              component={motion.div}
              whileHover={{
                backgroundColor: "white",
                scale: 1.2,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: [1.5, 1.2], transition: { duration: 0.25 } }}
              sx={{ backgroundColor: "#F9F7F7", color: "black" }}
            >
              שחקן נגד שחקן
            </Button>
          </Stack>
        </Stack>
      </body>
    </>
  );
}
