import React from "react";
import { Link } from "react-router-dom";

export default function ListItem({ name, to, icone }) {
  return (
    <li>
      <Link to={to}>
        {icone} <span>{name}</span>
      </Link>
    </li>
  );
}
