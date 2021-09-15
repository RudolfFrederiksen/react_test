import React from "react";
import "./Square.scss";

interface SquareProps {
    value: string | null;
}

interface SquareState {
    value: string | null;
}

class Square extends React.Component<SquareProps, SquareState> {
    constructor(props: SquareProps) {
        super(props);

        this.state = {
            value: null,
        };
    }
    render() {
        return <button className="square">{this.state.value}</button>;
    }
}

export { Square };
