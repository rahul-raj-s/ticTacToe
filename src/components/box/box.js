import React, { memo } from "react";
import style from "./box.module.css";

function Box(props) {
  const additionalClass = props.term === "O" ? style.o : style.x;
  const activeClass = props.active ? style.final : "";
  return (
    <div
      className={[style.box, additionalClass, activeClass].join(" ")}
      onClick={() =>
        props.term.length === 0 &&
        !props.gameLock &&
        props.handleClick(props.id)
      }
    >
      {props.term}
    </div>
  );
}

export default memo(Box);
