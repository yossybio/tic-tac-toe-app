import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SetPlayersPage from "./Pages/SetPlayers/index.js";
import SetGridPage from "./Pages/SetGrid/index.js";
import PlayingGame from "./Pages/PlayingGame/index.js";


const router = createBrowserRouter([
  { index: true, element: <SetPlayersPage /> },
  { path: "/setGrid", element: <SetGridPage /> },
  { path: "/playingGame", element: <PlayingGame /> },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
