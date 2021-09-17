import React from "react";
import { Board } from "./Board";
import "./Game.scss";

interface GameState {
    history: Array<HistoryState>;
    xIsNext: boolean;
    winner: string | null;
}

interface HistoryState {
    squares: Array<string | null>;
}

interface GameProps {}

class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            xIsNext: true,
            winner: null,
        };
    }

    handleClick(idx: number) {
        let history = this.state.history,
            squares = history[history.length - 1].squares.slice();

        // prevent action if winner defined or square has been played
        if (!!this.state.winner || squares[idx]) {
            return;
        }

        squares[idx] = this.state.xIsNext ? "X" : "O";
        const winner = this.calculateWinner(squares);
        history = history.concat([{ squares }]);

        this.setState({
            history,
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
        const latestSquare = this.state.history[this.state.history.length - 1].squares,
            winner = this.state.winner,
            status = winner ? "Winner: " + winner : "Next player: " + (this.state.xIsNext ? "X" : "O");

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={latestSquare} onClick={(idx) => this.handleClick(idx)} />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

export { Game };
