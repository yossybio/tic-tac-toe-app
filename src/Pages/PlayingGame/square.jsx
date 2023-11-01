import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  settingIsGameStarted,
  setPlayerStep,
  setIsIdleStatus,
} from "../../Redux/gameDataSlice";

export default function Square({ rowIndex, columnIndex }) {
  const { isGameStarted, arrayBoard, currentTurnPlayer, isIdleStatus } =
    useSelector((state) => state.gameData.gameStatus);
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (!isGameStarted) {
      dispatch(settingIsGameStarted({value: true}));
    }

    dispatch(setIsIdleStatus({ status: true }));
    setTimeout(() => {
      dispatch(setPlayerStep({ rowIndex, columnIndex, currentTurnPlayer }));
      dispatch(setIsIdleStatus({ status: false }));
    }, 1000);
  };

  return (
    <button
      style={{ width: 50, height: 50 }}
      onClick={clickHandler}
      disabled={
        arrayBoard[rowIndex][columnIndex].value !== null || isIdleStatus
      }
    >
      {arrayBoard[rowIndex][columnIndex].value === null
        ? ""
        : arrayBoard[rowIndex][columnIndex].value}
    </button>
  );
}