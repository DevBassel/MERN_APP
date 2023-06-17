import React from "react";
import { Link } from "react-router-dom";

export default function ListItem({ name, to, icone, cls, fun }) {
  return (
    <li className={cls} onClick={fun}>
      <Link to={to}>
        {icone} <span>{name}</span>
      </Link>
    </li>
  );
}
