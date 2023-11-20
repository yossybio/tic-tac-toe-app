import React, { memo } from "react";
import styles from "../../assets/PlayingGame.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  settingIsGameStarted,
  setPlayerStep,
  setIsIdleStatus,
} from "../../Redux/gameDataSlice";

export default memo(function Square({ rowIndex, columnIndex, gridDimention }) {
  const { isGameStarted, arrayBoard, currentTurnPlayer, isIdleStatus } =
    useSelector((state) => state.gameData.gameStatus);
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (!isGameStarted) {
      dispatch(settingIsGameStarted({ value: true }));
    }

    dispatch(setIsIdleStatus({ status: true }));
    setTimeout(() => {
      dispatch(setPlayerStep({ rowIndex, columnIndex, currentTurnPlayer }));
      dispatch(setIsIdleStatus({ status: false }));
    }, 1000);
  };

  const fontSizeClass = (gridDimention) => {
    switch (gridDimention) {
      case 3:
        return `${styles.fontSize3Dimention}`
        break;
      case 5:
        return `${styles.fontSize5Dimention}`
        break;
      case 7:
        return `${styles.fontSize7Dimention}`
        break;
    
      default:
        break;
    }
  }

  return (
    <button
      className={`${styles.boardButton} ${arrayBoard[rowIndex][columnIndex].value === "X" ? styles.redButton : ""} ${styles.button} ${fontSizeClass(gridDimention)}`}
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
})