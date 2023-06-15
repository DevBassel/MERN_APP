import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Options from "../components/Options";
import { getNews } from "../featchers/posts/postActions";
import Pagenation from "../components/Pagenation";
import Post from "../components/Post";
import { reset } from "../featchers/posts/postSlice";
// import { reset } from "../featchers/posts/postSlice";

function Dashbord() {
  const { user } = useSelector((state) => state.auth);
  const { posts, loading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getNews(page));
  }, [dispatch, navigate, page, user]);

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
  console.log(posts);
  return (
    <>
      {user && (
        <div className="view">
          <Options />
          <div className="view_content">
            {loading && <Spinner />}
            {posts.news &&
              posts.news.map((el) => (
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

export default Dashbord;
