import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/Constants";
import {useLocation} from "react-router-dom";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("elon@gmail.com");
  const [password, setPassword] = useState("elon@#2424f$$$123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  
  useEffect(()=>{
    console.log("efdwsa", location.pathname)
  location.pathname === "login"? setIsLogin(true):setIsLogin(false);
  },isLogin);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");
    console.log("data going in api:", email, password);

    try {
      // Different endpoint or payload can be used for signup
      const endpoint = isLogin ? "/login" : "/signup";
      const payload = isLogin
        ? { emailId: email, password }
        : { firstName, lastName, age, emailId: email, password };

      const response = await fetch(BASE_URL + endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log(`${isLogin ? "Login" : "Signup"} api response`, data);

      if (!response.ok) {
        // Handle error message appropriately
        console.error(`${isLogin ? "Login" : "Signup"} failed:`, data.message || "Unknown error");
        return;
      }

      dispatch(addUser(data));
      navigate("/feed");
    } catch (error) {
      console.error("Error during", isLogin ? "login" : "signup", ":", error);
    }
  };

  return (
    <div className="flex justify-center m-4">
      <div className="card card-border bg-base-300 w-100 h-auto">
        <div className="card-body">
          <h2 className="card-title flex justify-center">{isLogin ? "Login Here" : "Sign Up Here"}</h2>
          <form onSubmit={onSubmit}>
            {/* Show these fields only when signing up */}
            {!isLogin && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    placeholder="Type here"
                    onChange={(e) => setFirstName(e.target.value)}
                    required={!isLogin}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    placeholder="Type here"
                    onChange={(e) => setLastName(e.target.value)}
                    required={!isLogin}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    className="input"
                    value={age}
                    placeholder="Type here"
                    onChange={(e) => setAge(e.target.value)}
                    required={!isLogin}
                  />
                </fieldset>
              </>
            )}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="email"
                className="input"
                value={email}
                placeholder="Type here"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                value={password}
                placeholder="Type here"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </fieldset>

            <div className="card-actions flex justify-center py-3">
              <button className="btn btn-primary" type="submit">
                {isLogin ? "Login In" : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="text-center">
            {isLogin ? (
              <p>
                New User?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => {setIsLogin(false)
                     navigate("/signup")}}
                >
                  Register Here
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => {setIsLogin(true)
                    navigate("/login")
                  }}
                >
                  Login Here
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
