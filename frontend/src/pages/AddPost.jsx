import { useEffect, useState } from "react";
import Input from "../components/Input";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { convertImgToBase64 } from "../components/help";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../featchers/posts/postActions";
import Spinner from "../components/Spinner";
import { addError, reset } from "../featchers/posts/postSlice";
import { useNavigate } from "react-router-dom";
import Options from "../components/Options";

export default function AddPost() {
  const dispatch = useDispatch();
  const { success, loading, error } = useSelector((state) => state.posts);
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
    console.log(success);
  }, [success, navigate, dispatch]);

  const submit = (e) => {
    e.preventDefault();

    dispatch(createPost(Data));
    setTimeout(() => dispatch(reset()), 0);

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

    if (file.size / 1024 > maxSize) {
      dispatch(addError("file must be less than 1 MB"));

      setData({
        ...Data,
        image: "",
      });

      setTimeout(() => dispatch(reset()), 3000);
      return;
    }
    console.log(file.size / 1024);
    const base64 = await convertImgToBase64(file);
    setData({
      ...Data,
      image: base64,
    });
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
              fun={getData}
              val={tittle}
              name="tittle"
              id="postTittle"
            />
            <Input
              type="text"
              val={content}
              fun={getData}
              name="content"
              id="postContent"
            />
            <Input
              type="file"
              name="image"
              fun={img}
              id="img"
              lable="upload img"
              Icone={<RiImageAddFill />}
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
