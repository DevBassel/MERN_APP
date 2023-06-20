import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Options from "../components/Options";
import { getNews } from "../featchers/posts/postActions";
import Pagenation from "../components/Pagenation";
import Post from "../components/Post";
import { logout } from "../featchers/auth/authActions";
import { postreset } from "../featchers/posts/postSlice";
function Dashbord() {
  const { user } = useSelector((state) => state.auth);
  const { posts, loading, error } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (error) {
      dispatch(logout());
    }

    if (!user) {
      navigate("/login");
    } else dispatch(getNews(page));

    return () => {
      dispatch(postreset());
    };
  }, [dispatch, navigate, page, user, error]);

  const next = () => {
    if (page < posts.total / posts.perPage) {
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
  console.log(error);

  // console.log(posts);
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
            <Pagenation
              {...{ next, prev }}
              page={page}
              total={posts.total}
              per={posts.perPage}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Dashbord;
