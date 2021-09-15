import React from "react";
import { Square } from "./Square";
import "./Board.scss";

class Board extends React.Component {
    renderSquare(i: number) {
        return <Square value={i} />;
    }

    /**
     * generate a 3x3 board
     */
    generateBoard() {
        const rows = [];
        for (let row = 0; row < 3; row++) {
            rows.push(
                <div className="board-row" key={row}>
                    {this.renderSquare(row * 3)}
                    {this.renderSquare(row * 3 + 1)}
                    {this.renderSquare(row * 3 + 2)}
                </div>
            );
        }

        return rows;
    }

    render() {
        const status = "Next player: X";

        return (
            <div>
                <div className="status">{status}</div>
                {this.generateBoard()}
            </div>
        );
    }
}

export { Board };
