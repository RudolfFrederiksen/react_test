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
        const seedArray = Array(3).fill(0);
        return seedArray.map((item, row) => {
            return (
                <div className="board-row" key={`row-${row}`}>
                    {seedArray.map((val, idx) => this.renderSquare(row, row * 3 + idx))}
                </div>
            );
        });
    }

    renderSquare(row: number, i: number) {
        return (
            <Square
                key={`row-${row}-col-${i}`}
                index={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return <div>{this.generateBoard()}</div>;
    }
}

export { Board };