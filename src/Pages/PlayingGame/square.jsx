import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

export default function Square({ rowIndex, columnIndex }) {
  const currentTurnPlayer = useSelector(
    (state) => state.gameData.gameStatus.currentTurnPlayer
  );

  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = () => {
    setIsClicked(true);
  };
  return (
    <button style={{ width: 50, height: 50 }} onClick={clickHandler}>
      {isClicked ? currentTurnPlayer : ""}
    </button>
  );
}
