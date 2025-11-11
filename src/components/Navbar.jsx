import { Link } from "react-router";
import { useAuthContext } from "../providers/AuthProvider";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

const NavBar = () => {
  const { user, logout } = useAuthContext();
  return (
    <header className="absolute inset-x-0 top-0 z-50 mx-10">
      <nav aria-label="Global" className="flex items-start justify-between p-6 lg:px-8">
        {user && (
          <div className="font-bold flex gap-2 items-center text-6xl text-black">
            <FaUser className="text-4xl" />
            <span>{user.username}</span>
          </div>
        )}
        <div className="flex flex-1 justify-end">
          {user ? (
            <span
              className="text-sm flex gap-1 items-center font-semibold cursor-pointer"
              aria-label="logout button"
              onClick={logout}
            >
              Logout <FaSignOutAlt />
            </span>
          ) : (
            <Link to={"/login"} className="text-sm font-semibold">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
