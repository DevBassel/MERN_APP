import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Comment({ content, createdAt, author }) {
  const [info, setInfo] = useState({});
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    axios
      .get(`/api/me/users/${author}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setInfo(res.data));
  }, [author, user.token]);
  return (
    <>
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
        <p>{content}</p>
      </div>
    </>
  );
}
