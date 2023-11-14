import React, { useCallback, memo } from "react";
import styles from "../../assets/setGridPage.module.css";

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
                            <td key={cell[index]} className={styles.tdModal} style={{ width: props.cellSize.width, height: props.cellSize.height }}>
                            </td>
                        );
                    })}
                </tr>
            );
        });
    }, []);

    return (
        <button onClick={() => { props.onClick(props.gridSize) }} className={styles.gridButton}>
            <h4 className={styles.buttonHeader}>{`${props.gridSize.rows}X${props.gridSize.columns}`}</h4>
            <table className={`${styles.center} ${styles.tableSpacing}`}>
                <tbody>{buildingGridSymbol()}</tbody>
            </table>
        </button>)
};

export default memo(GridSizeComp);