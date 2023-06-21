import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./Input";
import { RiImageAddFill } from "react-icons/ri";
import { handleImage } from "./help";
import { useDispatch, useSelector } from "react-redux";
import { addError, postreset } from "../featchers/posts/postSlice";
import axios from "axios";
import Spinner from "./Spinner";
import { updatePost } from "../featchers/posts/postActions";

export default function UpdatePost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    tittle: "",
    content: "",
    image: "",
  });
  const { user, loading, error } = useSelector((state) => state.auth);

  const getData = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    axios
      .get(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setData(res.data));
  }, [id, navigate, user, user.token]);

  const img = async ({ target }) => {
    const file = target.files[0];
    handleImage(file, (result) => {
      if (result.includes("data:image")) {
        setData({
          ...data,
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
  const submit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ id, data }));
    navigate("/")
    console.log(data);
  };
  const { tittle, content, image } = data;
  return (
    <div className="popup">
      {<div className={`err ${error ? "active" : ""}`}>{error}</div>}
      <div className="popupContent">
        <button className="x" onClick={() => navigate("/")}>
          X
        </button>
        <form onSubmit={submit}>
          {loading && <Spinner />}
          <h1>Update Post Data</h1>
          <Input name="tittle" id="tittle" onChange={getData} value={tittle} />
          <Input
            name="content"
            id="content"
            onChange={getData}
            value={content}
          />

          <div>
            <Input
              type="file"
              name="image"
              onChange={img}
              id="img"
              lable="update image"
              icone={<RiImageAddFill />}
              accept="image/*"
            />
            {image && (
              <div className={`postImg ${image ? " active" : ""}`}>
                <img src={image} alt="UserPic" />
              </div>
            )}
          </div>
          <input type="submit" value="Update Post" />
        </form>
      </div>
    </div>
  );
}
