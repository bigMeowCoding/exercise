// Link.react.js
import React, { FC, useState } from "react";
import "./link.scss";
const STATUS = {
  HOVERED: "hovered",
  NORMAL: "normal",
};
const Link: FC<{ page: string }> = ({ page, children }) => {
  const [status, setStatus] = useState(STATUS.NORMAL);

  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED);
  };

  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };

  return (
    <a
      className={status}
      href={page || "#"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
};
export default Link;
