import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Square from "./square.jsx";
import * as gameData from "../../Redux/gameDataSlice.js";
import store from "../../Redux/store.js";
import Stack from "@mui/material/Stack";
import WinnerModal from "./WinnerModal.js";
import GameOverModal from "./GameOverModal.js";

export default function Board() {
  const USER_VS_CPU_MODE = 1;
  const {
    numOfPlayers,
    gridSize: { rows: numRows, columns: numColumns },
  } = useSelector((state) => state.gameData.gameMode);
  const {
    isGameStarted,
    arrayBoard: gameBoard,
    currentTurnPlayer,
    computerPlayerSymbol,
    isWinnerExist,
    isGameOver,
  } = useSelector((state) => state.gameData.gameStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openWinnerModal, setOpenWinnerModal] = useState(false);
  const [openGameOverModal, setOpenGameOverModal] = useState(false);

  useEffect(() => {
    const handlePopstate = () => {
      // Perform actions based on history navigation changes
      if (window.confirm("האם אתה בטוח שאתה רוצה להתחיל משחק חדש?")) {
        localStorage.clear();
        dispatch(gameData.resetStore());
        window.removeEventListener("popstate", handlePopstate);
        navigate("/");
      } else {
        dispatch(gameData.settingIsGameStarted(false));
        window.removeEventListener("popstate", handlePopstate);
        navigate("/PlayingGame");
      }
    };
    window.addEventListener("popstate", handlePopstate);
    // return () => {
    //   window.removeEventListener('popstate', handlePopstate);
    // };
  }, []);

  const savingGameStatusInLocalStorage = () => {
    const {
      isGameStarted,
      arrayBoard,
      currentTurnPlayer,
      computerPlayerSymbol,
      isWinnerExist,
      isGameOver,
      isIdleStatus,
    } = store.getState().gameData.gameStatus;

    const gameStatusDataToSave = {
      isGameStarted,
      arrayBoard,
      currentTurnPlayer,
      computerPlayerSymbol,
      isWinnerExist,
      isGameOver,
      isIdleStatus,
    };

    localStorage.setItem("gameStatus", JSON.stringify(gameStatusDataToSave));
  };

  useEffect(() => {
    //Loading saved data and setting it in redux store:
    const hasStoreNumOfPlayers =
      !!store.getState().gameData.gameMode.numOfPlayers;
    if (!hasStoreNumOfPlayers) {
      const numOfPlayers = JSON.parse(localStorage.getItem("numOfPlayers"));
      if (numOfPlayers) {
        dispatch(gameData.setPlayersMode(numOfPlayers));
      }
    }
    const hasStoreGridSize = !!store.getState().gameData.gameMode.gridSize.rows;
    if (!hasStoreGridSize) {
      const { rows, columns } = JSON.parse(localStorage.getItem("gridSize"));
      if (rows && columns) {
        dispatch(gameData.setGridSize({ rows, columns }));
      }
    }

    const gameStatusData = JSON.parse(localStorage.getItem("gameStatus"));
    if (gameStatusData) {
      gameStatusData.isGameStarted = false;
      dispatch(
        gameData.setLoadedDataToStore({
          values: gameStatusData,
        })
      );

      setOpenWinnerModal(gameStatusData.isWinnerExist);
      setOpenGameOverModal(gameStatusData.isGameOver);

      return;
    }

    //  Initializing new game board and
    //  saving all new data in local storage:
    let arrayBoard = [];
    for (let i = 0; i < numRows; i++) {
      let rowToAdd = [];
      for (let j = 0; j < numColumns; j++) {
        rowToAdd.push({ rowIndex: i, columnIndex: j, value: null });
      }
      arrayBoard.push(rowToAdd);
    }

    dispatch(gameData.setArrayBoard(arrayBoard));

    savingGameStatusInLocalStorage();
  }, []);

  useEffect(() => {
    if (isGameStarted) {
      let isWinnerExist;
      dispatch(gameData.searchingForWinner({ numRows, numColumns }));
      isWinnerExist = store.getState().gameData.gameStatus.isWinnerExist;
      if (!isWinnerExist) {
        let isGameOver;
        dispatch(gameData.checkingForGameOver({ numRows, numColumns }));
        isGameOver = store.getState().gameData.gameStatus.isGameOver;
        if (!isGameOver) {
          dispatch(gameData.switchPlayerTurn());
        } else {
          dispatch(gameData.settingGameOverStatusOn());
        }
      } else {
        dispatch(gameData.settingWinnerStatusOn(currentTurnPlayer));
      }

      savingGameStatusInLocalStorage();
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

      dispatch(gameData.setIsIdleStatus({ status: true }));
      setTimeout(() => {
        dispatch(
          gameData.setPlayerStep({ rowIndex, columnIndex, currentTurnPlayer })
        );
        dispatch(gameData.setIsIdleStatus({ status: false }));
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