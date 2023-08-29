import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Square from "./square.jsx";
import { setArrayBoard } from "../../Redux/gameDataSlice.js";

export default function Board() {
  const { rows: numRows, columns: numColumns } = useSelector(
    (state) => state.gameData.gameMode.gridSize
  );
  const gameBoard = useSelector(
    (state) => state.gameData.gameStatus.arrayBoard
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let arrayBoard = [];
    for (let i = 0; i < numRows; i++) {
      let rowToAdd = [];
      for (let j = 0; j < numColumns; j++) {
        rowToAdd.push({ rowIndex: i, columnIndex: j, value: "" });
      }
      arrayBoard.push(rowToAdd);
    }

    dispatch(setArrayBoard(arrayBoard));
  }, []);

  const buildingBoardGame = () => {
    return gameBoard.map(function (row) {
      return (
        <tr>
          {row.map(function (cell) {
            return (
              <td>
                <Square rowIndex={cell.rowIndex} cellIndex={cell.columnIndex} />
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <table>
      <tbody>{buildingBoardGame()}</tbody>
    </table>
  );
}
