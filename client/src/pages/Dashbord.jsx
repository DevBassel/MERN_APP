import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Options from "../components/Options";

function Dashbord() {
  const { loading, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      {user && (
        <div className="view">
          <Options/>
          <div className="view_content">time line</div>
        </div>
      )}
    </>
  );
}

export default Dashbord;
