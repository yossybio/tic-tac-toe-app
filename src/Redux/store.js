import { configureStore } from "@reduxjs/toolkit";

import gameDataSlice from "./gameDataSlice"; // Import your reducer(s) here

const store = configureStore({
  reducer: { gameData: gameDataSlice },
});

export default store;
