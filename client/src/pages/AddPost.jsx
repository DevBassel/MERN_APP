import { useEffect, useState } from "react";
import Input from "../components/Input";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../featchers/posts/postActions";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import Options from "../components/Options";
import { handleImage } from "../components/help";
import { addError, postreset } from "../featchers/posts/postSlice";

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
      navigate("/login");
    }
  }, [dispatch, navigate, user]);


  
  const submit = (e) => {
    e.preventDefault();

    dispatch(createPost(Data));
    setData({
      tittle: "",
      content: "",
      image: "",
    });
    // console.log(Data);
  };

  const img = async ({ target }) => {
    const file = target.files[0];
    handleImage(file, (result) => {
      if (result.includes("data:image")) {
        setData({
          ...Data,
          image: result,
        });
      } else {
        if (file) {
          dispatch(addError(result));
          setTimeout(() => {
            dispatch(postreset());
          }, 3000);
        }
      }
    });
  };

  const { tittle, content, image } = Data;
  console.log(image);
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
