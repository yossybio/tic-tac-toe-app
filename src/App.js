import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SetPlayersPage from "./Pages/SetPlayers/index.jsx";
import PlayingGame from "./Pages/PlayingGame/index.js";
const SetGridPage = lazy(() => import('./Pages/SetGrid/index.jsx'));




const router = createBrowserRouter([
  { index: true, element: <SetPlayersPage /> },
  { path: "/setGrid", element: <SetGridPage /> },
  { path: "/playingGame", element: <PlayingGame /> },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
