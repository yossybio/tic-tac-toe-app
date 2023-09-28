import { createSlice } from "@reduxjs/toolkit";

const gameDataSlice = createSlice({
  name: "gameData",
  initialState: {
    gameMode: { numOfPlayers: null, gridSize: { rows: null, columns: null } },
    gameStatus: {
      isGameStarted: false,
      currentTurnPlayer: "X",
      arrayBoard: [],
      isIdleStatus: false,
      isWinnerExist: false,
      isGameOver: false,
    },
  },
  reducers: {
    setPlayersMode: (state, action) => {
      state.gameMode.numOfPlayers = action.payload;
    },
    setGridSize: (state, action) => {
      state.gameMode.gridSize.rows = action.payload.rows;
      state.gameMode.gridSize.columns = action.payload.columns;
    },
    setArrayBoard: (state, action) => {
      state.gameStatus.arrayBoard = action.payload;
    },
    settingTheGameIsStarted: (state, action) => {
      state.gameStatus.isGameStarted = true;
    },
    setPlayerStep: (state, action) => {
      const rowIndex = action.payload.rowIndex;
      const columnIndex = action.payload.columnIndex;
      const currentTurnPlayer = action.payload.currentTurnPlayer;
      state.gameStatus.arrayBoard[rowIndex][columnIndex].value =
        currentTurnPlayer;
    },
    switchPlayerTurn: (state, action) => {
      const currentTurnPlayer = state.gameStatus.currentTurnPlayer;

      currentTurnPlayer === "X"
        ? (state.gameStatus.currentTurnPlayer = "O")
        : (state.gameStatus.currentTurnPlayer = "X");
    },
    setIsIdleStatus: (state, action) => {
      state.gameStatus.isIdleStatus = action.payload.status;
    },
    searchingForWinner: (state, action) => {
      let isWinnerExist = false;
      const { numRows, numColumns } = action.payload;
      const { arrayBoard: gameBoard, currentTurnPlayer } = state.gameStatus;

      //Checking for winner on rows:
      for (
        let rowsIndex = 0;
        rowsIndex < numRows && !isWinnerExist;
        rowsIndex++
      ) {
        isWinnerExist = true;
        for (let columnsIndex = 0; columnsIndex < numColumns; columnsIndex++) {
          if (gameBoard[rowsIndex][columnsIndex].value !== currentTurnPlayer) {
            isWinnerExist = false;
          }
        }
      }
      if (isWinnerExist) {
        state.gameStatus.isWinnerExist = true;
        return;
      }

      isWinnerExist = false;
      //Checking for winner on columns:
      for (
        let columnsIndex = 0;
        columnsIndex < numColumns && !isWinnerExist;
        columnsIndex++
      ) {
        isWinnerExist = true;
        for (let rowsIndex = 0; rowsIndex < numRows; rowsIndex++) {
          if (gameBoard[rowsIndex][columnsIndex].value !== currentTurnPlayer) {
            isWinnerExist = false;
          }
        }
      }
      if (isWinnerExist) {
        state.gameStatus.isWinnerExist = true;
        return;
      }

      //Checking for winner on diagonals:
      isWinnerExist = true;
      for (
        let rowsIndex = 0, columnsIndex = 0;
        rowsIndex < numRows && columnsIndex < numColumns;
        rowsIndex++, columnsIndex++
      ) {
        if (gameBoard[rowsIndex][columnsIndex].value !== currentTurnPlayer) {
          isWinnerExist = false;
        }
      }
      if (isWinnerExist) {
        state.gameStatus.isWinnerExist = true;
        return;
      }

      isWinnerExist = true;
      for (
        let rowsIndex = numRows - 1, columnsIndex = 0;
        rowsIndex >= 0 && columnsIndex < numColumns;
        rowsIndex--, columnsIndex++
      ) {
        if (gameBoard[rowsIndex][columnsIndex].value !== currentTurnPlayer) {
          isWinnerExist = false;
        }
      }
      if (isWinnerExist) {
        state.gameStatus.isWinnerExist = true;
        return;
      }

      state.gameStatus.isWinnerExist = false;
    },
    settingWinnerStatusOn: (state, action) => {
      state.gameStatus.isWinnerExist = true;
    },
    checkingForGameOver: (state, action) => {
      const { numRows, numColumns } = action.payload;
      const { arrayBoard: gameBoard } = state.gameStatus;
      let isGameOver;

      for (let rowsIndex = 0; rowsIndex < numRows; rowsIndex++) {
        isGameOver = true;
        for (let columnsIndex = 0; columnsIndex < numColumns; columnsIndex++) {
          if (gameBoard[rowsIndex][columnsIndex].value === null) {
            state.gameStatus.isGameOver = false;
            return;
          }
        }
      }

      state.gameStatus.isGameOver = isGameOver;
    },
    settingGameOverStatusOn: (state, action) => {
      state.gameStatus.isGameOver = true;
    },
    resetStore: (state, action) => {
      state.gameMode.numOfPlayers = null;
      state.gameMode.gridSize = { rows: null, columns: null };
      state.gameStatus.isGameStarted = false;
      state.gameStatus.currentTurnPlayer = "X";
      state.gameStatus.arrayBoard = [];
      state.gameStatus.isWinnerExist = false;
      state.gameStatus.isGameOver = false;
    },
  },
});

export const {
  setPlayersMode,
  setGridSize,
  setArrayBoard,
  settingTheGameIsStarted,
  setPlayerStep,
  switchPlayerTurn,
  setIsIdleStatus,
  searchingForWinner,
  settingWinnerStatusOn,
  checkingForGameOver,
  settingGameOverStatusOn,
  resetStore,
} = gameDataSlice.actions;

export default gameDataSlice.reducer;
