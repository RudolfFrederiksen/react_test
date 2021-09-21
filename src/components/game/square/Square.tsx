import React from "react";
import "./Square.scss";

interface SquareProps {
    index: number;
    value: string | null;
    onClick: () => void;
}

function Square(props: SquareProps) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export { Square };
