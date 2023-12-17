import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import UserAvatar from "../assets/images/avatar.png";

import { changeUserLoggedInStatus } from "../redux/slices/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUserName = useSelector((s) => s.user.name);

  const handleLogout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("USER_NAME");
    localStorage.removeItem("USER_EMAIL");

    dispatch(changeUserLoggedInStatus(false));
    navigate("/login");
  };

  return (
    <header className="bg-blue-500 p-4 text-white">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold cursor-pointer">
          Task Manager
        </Link>
        <div className="flex space-x-4 items-center">
          <img src={UserAvatar} alt="avatar" className="w-[36px] h-[36px]" />
          <h2 className="text-center">{loggedInUserName}</h2>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
