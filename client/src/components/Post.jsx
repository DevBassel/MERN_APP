import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import PostFeatcher from "./PostFeatcher";
export default function Post({
  _id,
  tittle,
  content,
  image,
  author,
  createdAt,
}) {
  return (
    <>
      <div className="post-content">
        <div className="info">
          <span>
            <FaUserAlt />
          </span>
          <div>
            <Link to={`/users/${author.id}`}>{author.name}</Link>
            <p>
              {createdAt.split("T")[0]} |{" "}
              {createdAt.split("T")[1].split(".")[0]}
            </p>
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
