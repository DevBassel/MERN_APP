import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashbord from "./pages/Dashbord";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./pages/Header";
import Profile from "./pages/Profile";
import AddPost from "./pages/AddPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashbord />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/addPost" element={<AddPost />} />
            <Route path="*" element={<><h1>Not Found</h1></>} />

          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
