import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Options from "../components/Options";
import { getUserPosts } from "../featchers/posts/postActions";
import Spinner from "../components/Spinner";
import Post from "../components/Post";
import Pagenation from "../components/Pagenation";
import axios from "axios";

export default function ViewProfile() {
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  const [userViewed, setVi] = useState({});
  useEffect(() => {
    if (user.id === id) {
      navigate("/profile");
    }
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getUserPosts({ id, page }));
    }
    (async () => {
      const res = await axios.get(`/api/me/users/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setVi(res.data);
    })();
  }, [dispatch, id, navigate, page, user]);

  const next = () => {
    if (page < posts.total / 4) {
      setPage(page + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  console.log(userViewed);
  return (
    <div className="view">
      <Options />
      <div className="view_content">
        <div className="userInfo">
          <div>
            <div className="userPic">
              <img src={userViewed && userViewed.image} alt="userPic" />
            </div>
            <h2>Name: {userViewed.name}</h2>
            {userViewed && userViewed.createdAt && (
              <h2>
                Join at: {userViewed.createdAt.split("T")[0]} |{" "}
                {userViewed.createdAt.split("T")[1].split(".")[0]}
              </h2>
            )}
          </div>
        </div>
        <div>
          {loading && <Spinner />}
          <h1>All posts</h1>
          {posts.blogs &&
            posts.blogs.map((el) => (
              <div className="box" key={el._id}>
                <Post {...el} />
              </div>
            ))}
          <Pagenation
            {...{ next, prev, page }}
            total={posts.total}
            per={posts.perPage}
          />
        </div>
      </div>
    </div>
  );
}
