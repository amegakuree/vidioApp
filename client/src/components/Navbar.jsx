import logo from "../../public/logo1.png";
import { Link } from "react-router-dom";
function Navbar() {
  function handleLogout() {
    localStorage.removeItem("access_token");
  }

  return (
    <div className=" h-20 w-full bg-cyan-400 flex justify-evenly">
      <div>
        <img className="w-56 pl-10 pt-4" src={logo} alt="" />
      </div>
      <div></div>
      <div>
        <button className="bg-red-600">
          <Link
            onClick={handleLogout}
            to="/"
            className="text-base btn btn-warning px-5 absolute right-16 text-white bg-blue-800  py-1 rounded-md mt-2"
          >
            Logout
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
