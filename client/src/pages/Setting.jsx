import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { RiImageAddFill } from "react-icons/ri";
import { handleImage } from "../components/help";
import { addError, postreset } from "../featchers/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../featchers/auth/authActions";
import { useNavigate } from "react-router-dom";
export default function Setting() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [Data, setData] = useState({
    name: "",
    email: "",
    pass1: "",
    image: "",
  });

  useEffect(() => {
    if (!user) {
      dispatch(logout());
      navigate("/login");
    }
  }, [dispatch, navigate, user]);

  const getData = ({ target }) => {
    setData({
      ...Data,
      [target.name]: target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(Data);
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
  const { name, email, pass1, image } = Data;
  return (
    <div className="setting">
      <div>
        <form onSubmit={submit}>
          <h1>Update Your Profile</h1>
          <div>
            <Input
              type="file"
              name="image"
              onChange={img}
              id="img"
              lable="upload profile img"
              icone={<RiImageAddFill />}
              accept="image/*"
            />
            <div className={`postImg ${image ? " active" : ""}`}>
              <img src={image} alt="PostImage" />
            </div>
          </div>
          <Input name="name" onChange={getData} id="updateName" value={name} />
          <Input
            name="email"
            id="updateEmail"
            onChange={getData}
            value={email}
          />
          <Input
            name="pass1"
            id="pass1"
            lable="password"
            onChange={getData}
            value={pass1}
          />
          
          <input type="submit" value="Update" />
        </form>
      </div>
    </div>
  );
}
