import React, { memo } from "react";
import styles from "../../assets/PlayingGame.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  settingIsGameStarted,
  setPlayerStep,
  setIsIdleStatus,
} from "../../Redux/gameDataSlice";

export default memo(function Square({ rowIndex, columnIndex }) {
  const { isGameStarted, arrayBoard, currentTurnPlayer, isIdleStatus } =
    useSelector((state) => state.gameData.gameStatus);
  const dispatch = useDispatch();
  const tdElementSize = (40 / arrayBoard[0].length) + "vw";

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

  return (
    <button
      className={`${styles.boardButton} ${arrayBoard[rowIndex][columnIndex].value === "X" ? styles.redButton : ""} ${styles.button}`}
      style={{ width: tdElementSize, height: tdElementSize }}
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