import React from "react";
import ListItem from "./ListItem";
import { IoAddSharp, IoHome, IoPersonCircleSharp } from "react-icons/io5";

export default function Options({ children }) {
  return (
    <div className="opts">
      <ul>
        <ListItem to="/" name="home" icone={<IoHome />} />
        <ListItem
          to="/profile"
          name="profile"
          icone={<IoPersonCircleSharp />}
        />
        <ListItem to="/addPost" name="add post" icone={<IoAddSharp />} />
        {children}
      </ul>
    </div>
  );
}
