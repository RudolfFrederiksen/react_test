import React from "react";
import { Square } from "./Square";
import "./Board.scss";

interface BoardState {
    squares: Array<string | null>;
    xIsNext: boolean;
    winner: string | null;
}
interface BoardProps {}

class Board extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: null,
        };
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

    renderSquare(i: number) {
        return <Square index={i} value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    handleClick(i: number) {
        const squares = this.state.squares.slice();

        // prevent action if winner defined or square has been played
        if (!!this.state.winner || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O";
        const winner = this.calculateWinner(squares);

        this.setState({
            squares,
            xIsNext: !this.state.xIsNext,
            winner,
        });
    }

    calculateWinner(squares: Array<string | null>) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    render() {
        const winner = this.state.winner,
            status = winner ? "Winner: " + winner : "Next player: " + (this.state.xIsNext ? "X" : "O");

        return (
            <div>
                <div className="status">{status}</div>
                {this.generateBoard()}
            </div>
        );
    }
}

export { Board };
