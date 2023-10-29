import React from "react";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGridSize } from "../../Redux/gameDataSlice";

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
      <Stack justifyContent="center" alignItems="center" spacing={10}>
        <h1>בחר את גודל הלוח</h1>
        <Stack direction={"row"} spacing={4}>
          <button
            onClick={() => {
              clickHandler(BOARD_SIZE_3X3);
            }}
          >
            3X3
          </button>
          <button
            onClick={() => {
              clickHandler(BOARD_SIZE_5X5);
            }}
          >
            5X5
          </button>
          <button
            onClick={() => {
              clickHandler(BOARD_SIZE_7X7);
            }}
          >
            7X7
          </button>
        </Stack>
      </Stack>
    </>
  );
}
