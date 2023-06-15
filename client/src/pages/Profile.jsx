import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../featchers/posts/postActions";
import Spinner from "../components/Spinner";
import Post from "../components/Post";
import Options from "../components/Options";
import Pagenation from "../components/Pagenation";
import reset from "../featchers/posts/postSlice";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const { posts, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getUserPosts(page));

  }, [dispatch, page]);

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
  console.log(page);

  return (
    <>
      {user && (
        <div className="view">
          <Options />

          <div className="view_content">
            {loading && <Spinner />}

            {posts.blogs &&
              posts.blogs.map((el) => (
                <div className="box" key={el._id}>
                  <Post {...el} />
                </div>
              ))}
            <Pagenation {...{ next, prev }} />
          </div>
        </div>
      )}
    </>
  );
}
