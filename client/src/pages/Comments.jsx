import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import { getPostComments } from "../featchers/comment/commentActions";
import Spinner from "../components/Spinner";
import Comment from "../components/Comment";

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
    }
    axios
      .get(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setData(res.data);
      });
    dispatch(getPostComments(id));
  }, [id, user, navigate, dispatch]);

  return (
    <>
      <div className="view">
        <div className="view_content">
          {loading && <Spinner cls={"fixed"} />}

          <div className="box">
            <Post {...data} />
          </div>
          <button onClick={() => navigate("addComment")}>add comment</button>
          <div className="comments">
            {comments &&
              comments.map((comment) => {
                return (
                  <div className="box" key={comment._id}>
                    <Comment {...comment} />
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
