import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../featchers/posts/postActions";
import Spinner from "../components/Spinner";
import Post from "./Post";
import Options from "../components/Options";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const { posts, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserPosts(2));
  }, [dispatch]);
  console.log(posts.blogs)
  return (
    <>
      {loading && <Spinner />}
      {user && (
        <div className="view">
          <Options />

          <div className="view_content">
            {posts.blogs &&  posts.blogs.map((el) => (
              <div className="box" key={el._id}>
                <Post {...el} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
