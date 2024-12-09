import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { URL } from "../Url";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const { userr } = useContext(UserContext);
  const { setUserr } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      // console.log(res)
      setUserr(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-14 right-6 md:right-32 rounded-md p-4 space-y-4">
      {!userr && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/login">Login</Link>
        </h3>
      )}
      {!userr && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/register">Register</Link>
        </h3>
      )}
      {userr && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to={"/profile/" + userr._id}>Profile</Link>
        </h3>
      )}
      {userr && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/write">Write</Link>
        </h3>
      )}
      {userr && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to={"/myblogs/" + userr._id}>My blogs</Link>
        </h3>
      )}
      {userr && (
        <h3
          onClick={handleLogout}
          className="text-white text-sm hover:text-gray-500 cursor-pointer"
        >
          Logout
        </h3>
      )}
    </div>
  );
};

export default Menu;
