import React, { useEffect, useState } from "react";
import Input from "./Input";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { updateComment } from "../featchers/comment/commentActions";
import axios from "axios";
import { commentReset } from "../featchers/comment/commentSlice";

export default function AddComment() {
  const { commentID } = useParams();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    content: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      axios
        .get(`/api/blogs/getCommentById/${commentID}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => setData(res.data));
    }
  }, [commentID, navigate, user]);

  // console.log(data)

  const getData = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(updateComment({ data, id: commentID }));
    dispatch(commentReset());
    navigate("..");
    console.log(data);
  };

  const { content } = data;
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
            value={content}
            name="content"
            id="commentContent"
            required
          />
          <input type="submit" value="Udate Comment" />
        </form>
      </div>
    </div>
  );
}
