import { useEffect, useState } from "react";
import Input from "../components/Input";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { convertImgToBase64 } from "../components/help";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../featchers/posts/postActions";
import Spinner from "../components/Spinner";
import { addError, postreset } from "../featchers/posts/postSlice";
import { useNavigate } from "react-router-dom";
import Options from "../components/Options";
import { logout } from "../featchers/auth/authActions";

export default function AddPost() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [Data, setData] = useState({
    tittle: "",
    content: "",
    image: "",
  });

  const getData = ({ target }) => {
    setData({
      ...Data,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    if (!user) {
      dispatch(logout());
      navigate("/login");
    }
  }, [dispatch, navigate, user]);

  const submit = (e) => {
    e.preventDefault();

    dispatch(createPost(Data));
    setTimeout(() => dispatch(postreset()), 0);

    setData({
      tittle: "",
      content: "",
      image: "",
    });
    // console.log(Data);
  };

  const img = async ({ target }) => {
    const file = target.files[0];
    const maxSize = 1048; // 1 MB

    const base64 = await convertImgToBase64(file);
    if (!(file.size / 1024 > maxSize) && base64.includes("data:image/")) {
      setData({
        ...Data,
        image: base64,
      });
    } else {
      dispatch(addError("only images and must be less than 1 MB"));
      setData({
        ...Data,
        image: "",
      });
      setTimeout(() => dispatch(postreset()), 3000);
      return;
    }
  };
  const { tittle, content, image } = Data;
  return (
    <>
      <div className="view">
        <Options />
        <div className="view_content">
          <form onSubmit={submit}>
            {<div className={`err ${error ? "active" : ""}`}>{error}</div>}
            {loading && <Spinner />}
            <h1>
              <BsFillFileEarmarkPostFill /> Add Post
            </h1>
            <Input
              type="text"
              onChange={getData}
              value={tittle}
              name="tittle"
              id="postTittle"
              required
            />
            <Input
              type="text"
              value={content}
              onChange={getData}
              name="content"
              id="postContent"
              required
            />
            <Input
              type="file"
              name="image"
              onChange={img}
              id="img"
              lable="upload img"
              icone={<RiImageAddFill />}
              accept="image/*"
            />
            <div className={`postImg ${image ? " active" : ""}`}>
              <img src={image} alt="PostImage" />
            </div>
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    </>
  );
}
