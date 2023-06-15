import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../featchers/auth/authActions";
import Spinner from "../components/Spinner";
import Input from "../components/Input";
import { IoAtOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
function Login() {
  const dispatch = useDispatch();
  const { user, islogin, loading, error } = useSelector((state) => state.auth);
  const navgite = useNavigate();

  const [Data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    if (user) {
      navgite("/");
    }
  }, [user, navgite, dispatch, islogin]);

  const getData = ({ target }) => {
    setData({ ...Data, [target.name]: target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    dispatch(login(Data));
  };

  const { email, password } = Data;

  return (
    <form onSubmit={submit}>
      {loading && <Spinner />}
      {<div className={`err ${error ? "active" : ""}`}>{error}</div>}
      <h1>Welcome, User!</h1>
      <p>Please Enter Your Data</p>
      <Input
        value={email}
        onChange={getData}
        type="email"
        name="email"
        id="loginEmail"
        Icone={<IoAtOutline />}
        required
        />
      <Input
        value={password}
        onChange={getData}
        type="password"
        name="password"
        id="loginPassword"
        Icone={<RiLockPasswordFill />}
        required
        />

      <input type="submit" value="LogIn" />
    </form>
  );
}

export default Login;
