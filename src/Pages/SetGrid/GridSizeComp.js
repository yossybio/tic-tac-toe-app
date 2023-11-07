import React, { useCallback } from "react";
import style from "../../assets/setGridPage.module.css";

const GridSizeComp = (props) => {
    let gridSymbol = [];

    const buildingGridSymbol = useCallback(() => {
        for (let i = 0; i < props.gridSize.rows; i++) {
            let rowToAdd = [];
            for (let j = 0; j < props.gridSize.columns; j++) {
                rowToAdd.push({ rowIndex: i, columnIndex: j, value: null });
            }
            gridSymbol.push(rowToAdd);
        }

        return gridSymbol.map(function (row, index) {
            return (
                <tr key={row[index]}>
                    {row.map(function (cell, index) {
                        return (
                            <td key={cell[index]} className={style.tdModal} style={{ width: props.cellSize.width, height: props.cellSize.height }}>
                            </td>
                        );
                    })}
                </tr>
            );
        });
    }, []);

    return (
        <button onClick={() => { props.onClick(props.gridSize) }} className={style.gridButton}>
            <h4 className={style.buttonHeader}>{`${props.gridSize.rows}X${props.gridSize.columns}`}</h4>
            <table className={`${style.center} ${style.tableSpacing}`}>
                <tbody>{buildingGridSymbol()}</tbody>
            </table>
        </button>)
};

export default GridSizeComp;