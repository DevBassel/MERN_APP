import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiLike, BiDislike, BiCommentDots } from "react-icons/bi";
import Spinner from "../components/Spinner";
export default function PostFeatcher({ id }) {
  // console.log(id);
  const token = useSelector((state) => state.auth.user.token);
  const [loading, setLoading] = useState(false);

  const [actions, setActions] = useState({
    likes: 0,
    disLikes: 0,
    useris: "none",
  });

  useEffect(() => {
    // console.log(token)
    (async () => { 
      const res = await axios.get(`/api/blogs/totalActions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setActions(res.data);
    })();
  }, [id, token,loading]);
  // console.log(actions);
  const like = () => {
    setLoading(true);
    axios
      .put(
        `/api/blogs/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };
  const dislike = () => {
    setLoading(true);
    axios
      .put(
        `/api/blogs/dislike/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };
  // const ifuser =

  // console.log(actions)
  return (
    <div className="post-featcher">
      {loading && <Spinner />}
      {actions && actions.useris && (
        <ul>
          <li
            className={`${actions.useris === "like" ? "active" : ""}`}
            onClick={like}
          >
            <BiLike /> {actions.likes}
          </li>
          <li
            className={`${actions.useris === "dislike" ? "active" : ""}`}
            onClick={dislike}
          >
            <BiDislike /> {actions.disLikes}
          </li>
          <li className="commint">
            <BiCommentDots />
          </li>
        </ul>
      )}
    </div>
  );
}
