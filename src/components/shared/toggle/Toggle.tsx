import React from "react";
import "./Toggle.scss";

interface ToggleProps {
    isActive: boolean;
    onClick: () => void;
}

const Toggle = (props: ToggleProps) => (
    <label className="toggle">
        <input type="checkbox" checked={props.isActive} readOnly={true} />
        <span className="slider round" onClick={() => props.onClick()}/>
    </label>
);

export default Toggle;
