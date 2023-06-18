import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deletePost, getUserPosts } from "../featchers/posts/postActions";
// import { useNavigate } from "react-router-dom";
import { postreset } from "../featchers/posts/postSlice";

export default function Pcontroll({ id }) {
  // console.log(id);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const del = () => {
    dispatch(deletePost(id));
    dispatch(postreset());
    setTimeout(() => dispatch(getUserPosts(1)), 100);
  };
  return (
    <ul className="postControll">
      <li onClick={() => del()}>
        <AiTwotoneDelete />
      </li>

      <li>
        <AiFillEdit />
      </li>
    </ul>
  );
}
