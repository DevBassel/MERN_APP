import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../featchers/auth/authActions";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { addError, reset } from "../featchers/auth/authSlice";
import Input from "../components/Input";
import { BsFillFilePersonFill } from "react-icons/bs";
import { IoAtOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
function Signup() {
  const [Data, setData] = useState({
    Fname: "",
    Lname: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const navgite = useNavigate();

  const { user, isloading, error } = useSelector((state) => state.auth);
  const { Fname, Lname, email, password, password2 } = Data;

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
      dispatch(
        register({
          name: `${Fname}  ${Lname}`,
          email,
          password,
        })
      );
      dispatch(reset());
    } else {
      dispatch(addError("2 passwords  must be ==="));
      setTimeout(() => dispatch(reset()), 3000);
    }
  };
  console.log(error);

  return (
    <form onSubmit={submit}>
      {isloading && <Spinner />}
      {<div className={`err ${error ? "active" : ""}`}>{error}</div>}
      <h1>Welcome,</h1>
      <p>Please Enter Your Data</p>

      <div className="name">
        <Input
          value={Fname}
          onChange={getData}
          type="text"
          name="Fname"
          id="registerFName"
          Icone={<BsFillFilePersonFill />}
          required
        />
        <Input
          value={Lname}
          onChange={getData}
          type="text"
          name="Lname"
          id="registerLName"
          Icone={<BsFillFilePersonFill />}
          required
        />
      </div>
      <Input
        value={email}
        onChange={getData}
        type="email"
        name="email"
        id="registerEmail"
        Icone={<IoAtOutline />}
        required
      />

      <Input
        value={password}
        onChange={getData}
        type="password"
        name="password"
        id="regesterPass"
        Icone={<RiLockPasswordFill />}
        required
      />
      <Input
        value={password2}
        onChange={getData}
        type="password"
        name="password2"
        lable="password Agin"
        id="regesterPass2"
        Icone={<RiLockPasswordFill />}
        required
      />
      <input type="submit" value="Sign Up" />
    </form>
  );
}

export default Signup;
