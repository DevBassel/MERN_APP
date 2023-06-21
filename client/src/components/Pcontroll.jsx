import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deletePost } from "../featchers/posts/postActions";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function Pcontroll({ id }) {
  // console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const del = () => {
    dispatch(deletePost(id));
    navigate("/");
  };
  return (
    <ul className="postControll">
      <li onClick={() => del()}>
        <AiTwotoneDelete />
      </li>

      <li onClick={() => navigate(`/profile/updatePost/${id}`)}>
        <AiFillEdit />
      </li>
    </ul>
  );
}
