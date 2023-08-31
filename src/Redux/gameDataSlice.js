import { createSlice } from "@reduxjs/toolkit";

const gameDataSlice = createSlice({
  name: "gameData",
  initialState: {
    gameMode: { numOfPlayers: null, gridSize: { rows: null, columns: null } },
    gameStatus: { currentTurnPlayer: "X", arrayBoard: [] },
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
    setPlayerStep: (state, action) => {
      // console.log(action);
      const rowIndex = action.payload.rowIndex;
      const columnIndex = action.payload.columnIndex;
      const currentTurnPlayer = action.payload.currentTurnPlayer;
      // console.log(state.gameStatus.arrayBoard, action.payload.currentPlayer);
      state.gameStatus.arrayBoard[rowIndex][columnIndex].value = currentTurnPlayer;
    },
    switchPlayerTurn: (state, action) => {
      const currentTurnPlayer = state.gameStatus.currentTurnPlayer;

      currentTurnPlayer === "X" ? state.gameStatus.currentTurnPlayer = "O" : state.gameStatus.currentTurnPlayer = "X";
    }
  },
});

export const { setPlayersMode, setGridSize, setArrayBoard, setPlayerStep, switchPlayerTurn } = gameDataSlice.actions;

export default gameDataSlice.reducer;
