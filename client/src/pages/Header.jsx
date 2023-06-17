import { Link, useNavigate } from "react-router-dom";
import { BiLogIn, BiUserPlus, BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../featchers/auth/authActions";
import { reset } from "../featchers/posts/postSlice";
function Header() {
  const navegate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const logOut = () => {
    dispatch(logout());
    dispatch(reset());
    navegate("/login");
    dispatch(reset())

  };
  return (
    <nav>
      <div>
        <Link to="/">Bolg App</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              Hi, {user.name}
            </li>
            <li onClick={logOut}>
              <BiLogOut /> logout
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <BiLogIn /> Login
              </Link>
            </li>
            <li className="bb">|</li>
            <li>
              <Link to="/signup">
                <BiUserPlus /> Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
