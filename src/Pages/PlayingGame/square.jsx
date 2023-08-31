import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlayerStep, switchPlayerTurn } from "../../Redux/gameDataSlice";

export default function Square({ rowIndex, columnIndex }) {
  const currentTurnPlayer = useSelector(
    (state) => state.gameData.gameStatus.currentTurnPlayer
  );
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState("");

  const clickHandler = () => {
    setIsClicked(true);
    setValue(currentTurnPlayer);
    dispatch(setPlayerStep({rowIndex, columnIndex, currentTurnPlayer}));
    dispatch(switchPlayerTurn());
  };

  return (
    <button style={{ width: 50, height: 50 }} onClick={clickHandler}>
      {isClicked ? value : ""}
    </button>
  );
}
