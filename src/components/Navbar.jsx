import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/Constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user  = useSelector((store)=> store.user);
  console.log("nav data", user);

  const handleLogout =()=>{
    try{
      fetch(BASE_URL + "/logout",{
        method: "POST",
        credentials: "include"
      })
      dispatch(removeUser());
      return navigate("/login");
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">DevTinder🙋‍♂️</Link>
        </div>
        {user && <div className="flex gap-2">
          <div className="flex m-2">Welcome, {user?.user?.firstName}</div>
          <div className="dropdown dropdown-end mx-7">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Photo"
                  src={user?.user?.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <Link to={"/connections"}>
                Connections
              </Link>
              <Link to={"/requests"}>
                Requests
              </Link>
              <li>
                <a onClick={handleLogout}> Logout</a>
              </li>
            </ul>
          </div>
        </div>}
      </div>
    </>
  );
};

export default Navbar;
