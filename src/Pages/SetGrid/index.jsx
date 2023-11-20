import React from "react";
import styles from "../../assets/setGridPage.module.css";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGridSize } from "../../Redux/gameDataSlice";
import GridSizeComp from "./GridSizeComp";

export default function SetGridPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BOARD_SIZE_3X3 = { rows: 3, columns: 3 };
  const BOARD_SIZE_5X5 = { rows: 5, columns: 5 };
  const BOARD_SIZE_7X7 = { rows: 7, columns: 7 };

  const savingDataInLocalStorage = (gridSize) => {
    localStorage.setItem("gridSize", JSON.stringify(gridSize));
  };

  const clickHandler = (gridSize) => {
    dispatch(setGridSize(gridSize));
    savingDataInLocalStorage(gridSize);
    navigate("/playingGame");
  };

  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Secular+One&family=Varela+Round&display=swap" rel="stylesheet" />
      </head>
      <Stack justifyContent="center" alignItems="center" spacing={10} className={styles.background}>
        <h1 className={styles.setGridHeader}>בחר את גודל הלוח</h1>
        <Stack direction={"row"} spacing={1}>
          {/* <button
            onClick={() => {
              clickHandler(BOARD_SIZE_3X3);
            }}
          >
            3X3
          </button> */}
          <GridSizeComp gridSize={BOARD_SIZE_3X3} onClick={clickHandler} cellSize={{
            width: 16,
            height: 12
          }} />

          {/* <button
            onClick={() => {
              clickHandler(BOARD_SIZE_5X5);
            }}
          >
            5X5
          </button> */}
          <GridSizeComp gridSize={BOARD_SIZE_5X5} onClick={clickHandler} cellSize={{
            width: 4,
            height: 3
          }} />

          {/* <button
            onClick={() => {
              clickHandler(BOARD_SIZE_7X7);
            }}
          >
            7X7
          </button> */}
          <GridSizeComp gridSize={BOARD_SIZE_7X7} onClick={clickHandler} cellSize={{
            width: 0.25,
            height: 0.125
          }} />
        </Stack>
      </Stack>
    </>
  );
}
