import React from "react";
import button from "./button.module.css";

function Button({
  type = "primary",
  size = "medium",
  text,
  onClick = () => {},
}: {
  type?: string;
  size?: string;
  text: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const typeClass =
    type === "tertiary"
      ? button.tertiary
      : type === "secondary"
      ? button.secondary
      : button.primary;
  const sizeClass =
    size === "large"
      ? button.large
      : size === "small"
      ? button.small
      : button.medium;

  return (
    <button
      onClick={(e: React.MouseEvent<HTMLElement>) => onClick(e)}
      className={`${button.main} ${typeClass} ${sizeClass}`}
    >
      {text}
    </button>
  );
}

export default Button;
