import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import Spinner from "../components/Spinner";
import Comment from "../components/Comment";
import Options from "../components/Options";
import { IoAddSharp } from "react-icons/io5";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import {
  deleteComment,
  getPostComments,
} from "../featchers/comment/commentActions";

export default function Comments() {
  const { id } = useParams();
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { comments, loading } = useSelector((state) => state.comment);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      axios
        .get(`/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          setData(res.data);
        });
      dispatch(getPostComments(id));
    }
  }, [id, user, navigate, dispatch]);

  const delComment = (commentId) => {
    dispatch(deleteComment(commentId));
    dispatch(getPostComments(id));
  };

  return (
    <>
      <div className="view">
        <Options />
        <div className="view_content">
          {loading && <Spinner cls={"fixed"} />}

          <div className="box">
            <Post {...data} />
          </div>
          <button className="addComment" onClick={() => navigate("addComment")}>
            <IoAddSharp />
          </button>
          <div className="comments">
            {comments &&
              comments.map((comment) => {
                return (
                  <div className="box" key={comment._id}>
                    <Comment {...comment} />
                    {user && user.id === comment.author ? (
                      <>
                        <ul className="postControll">
                          <li
                            onClick={() => {
                              delComment(comment._id);
                            }}
                          >
                            <AiTwotoneDelete />
                          </li>
                          <li
                            onClick={() =>
                              navigate(`updateComment/${comment._id}`)
                            }
                          >
                            <AiFillEdit />
                          </li>
                        </ul>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
