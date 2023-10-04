import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Square from "./square.jsx";
import {
  setArrayBoard,
  setCurrentTurnPlayer,
  searchingForWinner,
  settingWinnerStatusOn,
  checkingForGameOver,
  settingGameOverStatusOn,
  switchPlayerTurn,
  setPlayerStep,
  setIsIdleStatus,
  setLoadedDataToStore,
  setComputerPlayerSymbol,
  settingIsGameStarted,
  setGridSize,
  setPlayersMode,
} from "../../Redux/gameDataSlice.js";
import store from "../../Redux/store.js";
import Stack from "@mui/material/Stack";
import WinnerModal from "./WinnerModal.js";
import GameOverModal from "./GameOverModal.js";

export default function Board() {
  const USER_VS_CPU_MODE = 1;
  const {
    gameMode: {
      numOfPlayers,
      gridSize: { rows: numRows, columns: numColumns },
    },
    gameStatus: {
      isGameStarted,
      arrayBoard: gameBoard,
      currentTurnPlayer,
      computerPlayerSymbol,
      isWinnerExist,
      isGameOver,
      isIdleStatus,
    },
  } = useSelector((state) => state.gameData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openWinnerModal, setOpenWinnerModal] = useState(false);
  const [openGameOverModal, setOpenGameOverModal] = useState(false);

  const popstarHandler = useCallback(() => {
    if (window.confirm("האם אתה בטוח להתחיל משחק חדש?")) {
      localStorage.clear();
      navigate("/");
    } else {
      dispatch(settingIsGameStarted({ value: false }));
      navigate("/PlayingGame");
    }
  }, [navigate]);

  useEffect(() => {
    window.addEventListener("popstate", popstarHandler);
  }, [popstarHandler]);

  useEffect(() => {
    const numOfPlayers = JSON.parse(localStorage.getItem("numOfPlayers"));
    dispatch(setPlayersMode(numOfPlayers));
    const { rows, columns } = JSON.parse(localStorage.getItem("gridSize"));
    dispatch(setGridSize({ rows, columns }));

    const loadedData = JSON.parse(localStorage.getItem("gameStatus"));
    if (loadedData) {
      dispatch(
        setLoadedDataToStore({
          key: "gameStatus",
          value: loadedData,
        })
      );

      dispatch(setArrayBoard(loadedData.arrayBoard));
      dispatch(
        setComputerPlayerSymbol({
          computerPlayerSymbol: loadedData.computerPlayerSymbol,
        })
      );
      dispatch(setCurrentTurnPlayer(loadedData.currentTurnPlayer));

      setOpenWinnerModal(loadedData.isWinnerExist);
      setOpenGameOverModal(loadedData.isGameOver);
      return;
    }

    let arrayBoard = [];
    for (let i = 0; i < numRows; i++) {
      let rowToAdd = [];
      for (let j = 0; j < numColumns; j++) {
        rowToAdd.push({ rowIndex: i, columnIndex: j, value: null });
      }
      arrayBoard.push(rowToAdd);
    }

    dispatch(setArrayBoard(arrayBoard));

    const gameStatusToSave = {
      isGameStarted,
      arrayBoard,
      currentTurnPlayer,
      computerPlayerSymbol,
      isWinnerExist,
      isGameOver,
      isIdleStatus,
    };

    localStorage.setItem("gameStatus", JSON.stringify(gameStatusToSave));
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

      const updatedCurrentTurnPlayer =
        store.getState().gameData.gameStatus.currentTurnPlayer;
      const newGameStatusObj = {
        isGameStarted,
        arrayBoard: [...gameBoard],
        currentTurnPlayer: updatedCurrentTurnPlayer,
        computerPlayerSymbol,
        isWinnerExist,
        isGameOver,
        isIdleStatus,
      };
      localStorage.setItem("gameStatus", JSON.stringify(newGameStatusObj));
    }
  }, [gameBoard]);

  useEffect(() => {
    const isComputerPlayerTurn =
      numOfPlayers === USER_VS_CPU_MODE &&
      currentTurnPlayer === computerPlayerSymbol &&
      isGameStarted;

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
          {row.map(function (cell) {
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
