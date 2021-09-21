import React from "react";
import classNames from "classnames";
import { Board } from "../board/Board";
import "./Game.scss";
import Toggle from "../../shared/toggle/Toggle";

interface GameState {
    history: Array<HistoryState>;
    currentStep: number;
    xIsNext: boolean;
    winner: Array<number> | null;
    orderMoveAsc: boolean;
}

interface HistoryState {
    squares: Array<string | null>;
    col: number | null;
    row: number | null;
}

interface GameProps {}

class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    col: null,
                    row: null,
                },
            ],
            currentStep: 0,
            xIsNext: true,
            winner: null,
            orderMoveAsc: true,
        };
    }

    handleClick(idx: number) {
        let history = this.state.history.slice(0, this.state.currentStep + 1),
            squares = history[history.length - 1].squares.slice();

        // prevent action if winner defined or square has been played
        if (!!this.calculateWinner(squares) || squares[idx]) {
            return;
        }

        squares[idx] = this.state.xIsNext ? "X" : "O";
        const winner = this.calculateWinner(squares);
        history = history.concat([
            {
                squares,
                col: (idx % 3) + 1,
                row: Math.ceil((idx + 1) / 3),
            },
        ]);

        this.setState({
            history,
            currentStep: history.length - 1,
            xIsNext: !this.state.xIsNext,
            winner,
        });
    }

    calculateWinner(squares: Array<string | null>): Array<number> | null {
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
                return lines[i];
            }
        }
        return null;
    }

    renderHistory() {
        const $history = this.state.history.map((historyState, idx) => (
            <li key={idx} className={classNames({ selected: this.state.currentStep === idx })}>
                <button onClick={() => this.goToHistoryState(idx)}>
                    {idx
                        ? `Go to move #${idx} ${idx % 2 === 1 ? "X" : "O"}` +
                          ` played at (c-${historyState.col}:r-${historyState.row})`
                        : "Go to game start"}
                </button>
            </li>
        ));

        // order desc history
        if (!this.state.orderMoveAsc) {
            $history.reverse();
        }

        return $history;
    }

    goToHistoryState(idx: number) {
        this.setState({
            currentStep: idx,
            winner: this.calculateWinner(this.state.history[idx].squares),
            xIsNext: idx % 2 === 0,
        });
    }

    toggleHistoryOrder() {
        this.setState({
            orderMoveAsc: !this.state.orderMoveAsc,
        });
    }

    render() {
        const latestSquare = this.state.history[this.state.currentStep].squares,
            winner = this.state.winner,
            status = winner ? "Winner: " + winner : "Next player: " + (this.state.xIsNext ? "X" : "O");
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={latestSquare} winner={winner} onClick={(idx) => this.handleClick(idx)} />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <div className="history-toggle">
                        <span>History Order : {this.state.orderMoveAsc ? "Ascending" : "Descending"}</span>
                        <Toggle isActive={this.state.orderMoveAsc} onClick={() => this.toggleHistoryOrder()} />
                    </div>
                    <ol reversed={!this.state.orderMoveAsc}>{this.renderHistory()}</ol>
                </div>
            </div>
        );
    }
}

export { Game };
