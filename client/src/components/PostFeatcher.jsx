import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiLike, BiDislike, BiCommentDots } from "react-icons/bi";
import Spinner from "../components/Spinner";
export default function PostFeatcher({ id }) {
  // console.log(id);
  const token = useSelector((state) => state.auth.user.token);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [actions, setActions] = useState({
    likes: 0,
    disLikes: 0,
  });

  useEffect(() => {
    // console.log(token)
    axios
      .get(`/api/blogs/totalActions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setActions(res.data));

    ifuser();

    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
  }, [id, token, loading]);

  const like = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    axios
      .post(`/api/blogs/like/${id}`, {}, config)
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };
  const dislike = () => {
    setLoading(true);
    axios
      .post(`/api/blogs/dislike/${id}`, {}, config)
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };
  const ifuser = async () => {
    const res = await axios.get(`/api/blogs/ifuser/${id}`, config);
    setActive(res.data.msg);
    console.log(res.data);
  };

  // console.log(actions)
  return (
    <div className="post-featcher">
      {loading && <Spinner />}
      <ul>
        <li className={`${active === "like" ? "active" : ""}`} onClick={like}>
          <BiLike /> {actions.likes}
        </li>
        <li
          className={`${active === "dislike" ? "active" : ""}`}
          onClick={dislike}
        >
          <BiDislike /> {actions.disLikes}
        </li>
        <li className="commint">
          <BiCommentDots />
        </li>
      </ul>
    </div>
  );
}
