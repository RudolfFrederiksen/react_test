import React from "react";
import { Square } from "./Square";
import "./Board.scss";

interface BoardState {}
interface BoardProps {
    squares: Array<string | null>;
    onClick: (idx: number) => void;
}

class Board extends React.Component<BoardProps, BoardState> {
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

    renderSquare(i: number) {
        return <Square index={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    render() {
        return <div>{this.generateBoard()}</div>;
    }
}

export { Board };
