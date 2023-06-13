import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../featchers/auth/authActions";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { reset } from "../featchers/auth/authSlice";
import Input from "../components/Input";
import { BsFillFilePersonFill } from "react-icons/bs";
import { IoAtOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
function Signup() {
  const [Data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const navgite = useNavigate();

  const { user, isloading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (user) {
      navgite("/");
      console.log(user);
    }
  }, [navgite, user, error]);

  const getData = ({ target }) => {
    setData({ ...Data, [target.name]: target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    if (Data.password === Data.password2) {
      dispatch(register(Data));
      dispatch(reset());
    }
  };

  const { name, email, password, password2 } = Data;
  return (
    <form onSubmit={submit} >
      {isloading && <Spinner />}
      {<div className={`err ${error ? "active" : ""}`}>{error}</div>}
      <h1>Welcome,</h1>
      <p>Please Enter Your Data</p>

      <Input
        val={name}
        fun={getData}
        type="text"
        name="name"
        id="registerName"
        Icone={<BsFillFilePersonFill />}
      />
      <Input
        val={email}
        fun={getData}
        type="email"
        name="email"
        id="registerEmail"
        Icone={<IoAtOutline />}
      />

      <Input
        val={password}
        fun={getData}
        type="password"
        name="password"
        id="regesterPass"
        Icone={<RiLockPasswordFill />}
      />
      <Input
        val={password2}
        fun={getData}
        type="password"
        name="password2"
        lable="password Agin"
        id="regesterPass2"
        Icone={<RiLockPasswordFill />}
      />
      <input type="submit" value="Sign Up" />
    </form>
  );
}

export default Signup;
