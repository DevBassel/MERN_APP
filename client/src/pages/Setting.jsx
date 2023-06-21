import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { RiImageAddFill } from "react-icons/ri";
import { handleImage } from "../components/help";
import { postreset } from "../featchers/posts/postSlice";
import { addError } from "../featchers/auth/authSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { UpdataProfile, logout } from "../featchers/auth/authActions";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
export default function Setting() {
  const dispatch = useDispatch();
  const { user, loading, some, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [Data, setData] = useState({
    name: some && some.name,
    email: some && some.email,
    password: "",
    image: some && some.image,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(postreset());
  }, [dispatch, error, navigate, user]);

  const getData = ({ target }) => {
    setData({
      ...Data,
      [target.name]: target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(UpdataProfile(Data));
    setTimeout(() => dispatch(addError("")), 3000);
  };
  const deletProfile = async () => {
    await axios.delete("/api/me/delete", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    dispatch(postreset());
    dispatch(logout());

    // console.log(res.data);
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
  const { name, email, password, image } = Data;
  return (
    <div className="setting">
      {<div className={`err ${error ? "active" : ""}`}>{error}</div>}
      <div className="settingContent">
        <button onClick={() => navigate("/")}>Go to Home</button>

        <form onSubmit={submit}>
          {loading && <Spinner />}
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
            {image && (
              <div
                style={{ width: 150, height: 150 }}
                className={`postImg ${image ? " active" : ""}`}
              >
                <img src={image} alt="UserPic" />
              </div>
            )}
          </div>
          <Input name="name" onChange={getData} id="updateName" value={name} />
          <Input
            name="email"
            id="updateEmail"
            onChange={getData}
            value={email}
          />
          <Input
            name="password"
            id="pass1"
            lable="password"
            onChange={getData}
            value={password}
            required
          />

          <input type="submit" value="Update" />
          <button className="del" onClick={deletProfile}>
            <AiTwotoneDelete />
            Delete Profile
          </button>
        </form>
      </div>
    </div>
  );
}
