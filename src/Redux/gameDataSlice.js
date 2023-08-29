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
      console.log(action.payload);
      state.gameStatus.arrayBoard = action.payload;
    }
  },
});

export const { setPlayersMode, setGridSize, setArrayBoard } = gameDataSlice.actions;

export default gameDataSlice.reducer;
