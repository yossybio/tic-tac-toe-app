import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setPlayersMode,
  setComputerPlayerSymbol,
} from "../../Redux/gameDataSlice";
import { Stack } from "@mui/material";
import MainImg from "../../assets/MainPageImg.jpg";
import style from "../../assets/SetPlayers.module.css";

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
    navigate("/setGrid");
  };

  return (
    <>
      <Stack alignItems="center" spacing={8}>
        <img
          // style={{ width: "100vw", height: "40vh"}}
          // src="https://thumbs.dreamstime.com/z/tic-tac-toe-1652844.jpg?w=992"
          src={MainImg}
          alt="Set players main img"
        />
        <Stack alignItems="center" spacing={3}>
          <button
            // style={{ direction: "rtl" }}
            className={style.mainButton}
            onClick={() => {
              clickHandler({ numOfPlayers: USER_VS_CPU_MODE });
            }}
          >
            שחקן נגד מחשב
          </button>
          <button
            // style={{ direction: "rtl" }}
            className={style.mainButton}
            onClick={() => {
              clickHandler({ numOfPlayers: USER_VS_USER_MODE });
            }}
          >
            שחקן נגד שחקן
          </button>
        </Stack>
      </Stack>
    </>
  );
}
