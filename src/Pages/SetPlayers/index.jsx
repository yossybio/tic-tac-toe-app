import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPlayersMode, setLoadDataToStore } from "../../Redux/gameDataSlice";
import { Stack } from "@mui/material";

export default function SetPlayersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { numOfPlayers } = useSelector((state) => state.gameData.gameMode);
  const USER_VS_CPU_MODE = 1;
  const USER_VS_USER_MODE = 2;

  const savingDataInLocalStorage = (numOfPlayers) => {
    // const existingData = JSON.parse(localStorage.getItem("gameMode"));
    // const gameModeObj = {
    // ...existingData,
    // numOfPlayers: numOfPlayers,
    // };
    // localStorage.setItem("gameMode", JSON.stringify(gameModeObj));
    localStorage.setItem("numOfPlayers", JSON.stringify(numOfPlayers));
  };

  useEffect(() => {
    const loadedData = localStorage.getItem("numOfPlayers");
    if (loadedData) {
      // dispatch(setSavedDataInStore({ savedGameMode: JSON.parse(loadedData) }));
      dispatch(
        setLoadDataToStore({
          key: "numOfPlayers",
          value: JSON.parse(loadedData),
        })
      );
    }
  }, []);

  const clickHandler = (gameMode) => {
    const { numOfPlayers } = gameMode;
    dispatch(setPlayersMode(numOfPlayers));
    savingDataInLocalStorage(numOfPlayers);
    navigate("/setGrid");
  };

  const disabledButtonHandler = (selectedGameMode) => {
    return selectedGameMode !== numOfPlayers && numOfPlayers;
  };

  return (
    <>
      <Stack alignItems="center" spacing={8}>
        <img
          style={{ width: "60%", height: "50%" }}
          src="https://thumbs.dreamstime.com/z/tic-tac-toe-1652844.jpg?w=992"
          alt="Set players main img"
        />
        <Stack alignItems="center" spacing={1}>
          <button
            style={{ direction: "rtl" }}
            onClick={() => {
              clickHandler({ numOfPlayers: USER_VS_CPU_MODE });
            }}
            disabled={disabledButtonHandler(USER_VS_CPU_MODE)}
          >
            שחקן נגד מחשב
          </button>
          <button
            style={{ direction: "rtl" }}
            onClick={() => {
              clickHandler({ numOfPlayers: USER_VS_USER_MODE });
            }}
            disabled={disabledButtonHandler(USER_VS_USER_MODE)}
          >
            שחקן נגד שחקן
          </button>
        </Stack>
      </Stack>
    </>
  );
}
