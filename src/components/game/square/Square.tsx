import React from "react";
import classNames from "classnames";
import "./Square.scss";

interface SquareProps {
    index: number;
    value: string | null;
    highlight: boolean;
    onClick: () => void;
}

function Square(props: SquareProps) {
    return (
        <button className={classNames({ square: true, highlight: props.highlight })} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export { Square };
