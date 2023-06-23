import { Link } from "react-router-dom";
import PostFeatcher from "./PostFeatcher";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";

export default function Post({
  _id,
  tittle,
  content,
  image,
  author,
  createdAt,
}) {
  const [info, setInfo] = useState({});

  const { user } = useSelector((s) => s.auth);
  useEffect(() => {
    axios
      .get(`/api/me/users/${author}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setInfo(res.data));
  }, [author, user.token]);

  return (
    <>
      <div className="post-content">
        <div className="info">
          <span>
            {info && info.image ? (
              <img src={info.image} alt="userImg" />
            ) : (
              <FaUserAlt />
            )}
          </span>
          <div>
            <Link to={`/users/${author}`}>{info.name}</Link>
            {createdAt && (
              <p>
                {createdAt.split("T")[0]} |{" "}
                {createdAt.split("T")[1].split(".")[0]}
              </p>
            )}
          </div>
        </div>
        <div className="content">
          <h4>{tittle}</h4>
          <p>{content}</p>
        </div>
      </div>
      {image && (
        <div className="post-img">
          <img src={image} alt="postImage" />
        </div>
      )}
      <PostFeatcher id={_id} />
    </>
  );
}
