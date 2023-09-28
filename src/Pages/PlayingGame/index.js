import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Square from "./square.jsx";
import {
  setArrayBoard,
  searchingForWinner,
  settingWinnerStatusOn,
  checkingForGameOver,
  settingGameOverStatusOn,
  switchPlayerTurn,
  setPlayerStep,
  setIsIdleStatus,
} from "../../Redux/gameDataSlice.js";
import store from "../../Redux/store.js";
import Stack from "@mui/material/Stack";
import WinnerModal from "./WinnerModal.js";
import GameOverModal from "./GameOverModal.js";

export default function Board() {
  const { rows: numRows, columns: numColumns } = useSelector(
    (state) => state.gameData.gameMode.gridSize
  );
  const { numOfPlayers } = useSelector((state) => state.gameData.gameMode);
  const {
    isGameStarted,
    arrayBoard: gameBoard,
    currentTurnPlayer,
    isWinnerExist,
    isGameOver,
  } = useSelector((state) => state.gameData.gameStatus);

  const USER_VS_CPU_MODE = 1;
  const dispatch = useDispatch();
  const [openWinnerModal, setOpenWinnerModal] = useState(false);
  const [openGameOverModal, setOpenGameOverModal] = useState(false);

  useEffect(() => {
    let arrayBoard = [];
    for (let i = 0; i < numRows; i++) {
      let rowToAdd = [];
      for (let j = 0; j < numColumns; j++) {
        rowToAdd.push({ rowIndex: i, columnIndex: j, value: null });
      }
      arrayBoard.push(rowToAdd);
    }

    dispatch(setArrayBoard(arrayBoard));
  }, []);

  useEffect(() => {
    if (isGameStarted) {
      let isWinnerExist;
      dispatch(searchingForWinner({ numRows, numColumns }));
      isWinnerExist = store.getState().gameData.gameStatus.isWinnerExist;
      if (!isWinnerExist) {
        let isGameOver;
        dispatch(checkingForGameOver({ numRows, numColumns }));
        isGameOver = store.getState().gameData.gameStatus.isGameOver;
        if (!isGameOver) {
          dispatch(switchPlayerTurn());
        } else {
          dispatch(settingGameOverStatusOn());
        }
      } else {
        dispatch(settingWinnerStatusOn(currentTurnPlayer));
      }
    }
  }, [gameBoard]);

  useEffect(() => {
    const isComputerPlayerTurn =
      numOfPlayers === USER_VS_CPU_MODE && currentTurnPlayer === "O";
    if (isComputerPlayerTurn) {
      let isRandomStepFound = false;
      let rowIndex, columnIndex;
      while (isRandomStepFound === false) {
        rowIndex = Math.floor(Math.random() * numRows);
        columnIndex = Math.floor(Math.random() * numColumns);

        if (gameBoard[rowIndex][columnIndex].value === null) {
          isRandomStepFound = true;
        }
      }

      dispatch(setIsIdleStatus({ status: true }));
      setTimeout(() => {
        dispatch(setPlayerStep({ rowIndex, columnIndex, currentTurnPlayer }));
        dispatch(setIsIdleStatus({ status: false }));
      }, 1000);
    }
  }, [currentTurnPlayer]);

  useEffect(() => {
    if (isWinnerExist) {
      setOpenWinnerModal(true);
    } else {
      if (isGameOver) {
        setOpenGameOverModal(true);
      }
    }
  }, [isWinnerExist, isGameOver]);

  const buildingBoardGame = () => {
    return gameBoard.map(function (row, index) {
      return (
        <tr key={row[index].rowIndex}>
          {row.map(function (cell, index) {
            return (
              <td key={cell.columnIndex}>
                <Square
                  rowIndex={cell.rowIndex}
                  columnIndex={cell.columnIndex}
                />
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={2}
      paddingTop={"15%"}
    >
      <h3 dir="rtl">{`תור שחקן ${currentTurnPlayer === "X" ? "X" : "O"}`}</h3>
      <WinnerModal open={openWinnerModal} />
      <GameOverModal open={openGameOverModal} />
      <table>
        <tbody>{buildingBoardGame()}</tbody>
      </table>
      <h3 dir="rtl">מקם 3 ברציפות!</h3>
    </Stack>
  );
}
