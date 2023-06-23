import React, { useState } from "react";
import Input from "./Input";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { commentReset } from "../featchers/comment/commentSlice";
import { addComment } from "../featchers/comment/commentActions";

export default function AddComment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    content: "",
  });
  const { loading, error } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const getData = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    dispatch(addComment({ data, id }));
    dispatch(commentReset());
    navigate("..");
    console.log(id);
  };

  return (
    <div className="popup">
      {<div className={`err ${error ? "active" : ""}`}>{error}</div>}
      {loading && <Spinner cls={"fixed"} />}
      <div className="popupContent">
        <button className="x" onClick={() => navigate("..")}>
          X
        </button>
        <form onSubmit={submit}>
          <Input
            type="text"
            onChange={getData}
            value={data.content}
            name="content"
            id="commentContent"
            required
          />
          <input type="submit" value="Add Comment" />
        </form>
      </div>
    </div>
  );
}
