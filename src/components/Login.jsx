import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/Constants";

const Login = () => {
  const [email, setEmail] = useState("elon@gmail.com");
  const [password, setPassword] = useState("elon@#2424f$$$123");
  const dispatch = useDispatch() 
  const navigate = useNavigate()

  const onSubmit = async (e) => {
  e.preventDefault(); // ✅ Corrected7️⃣7️⃣
  console.log("submitting");
  console.log("hello this is data going in api", email, password);

  try {
    const response = await fetch(BASE_URL + "/login", {
      method: "POST",
      body: JSON.stringify({
        emailId: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    });

    const data = await response.json(); // 🔁 Parse the response
    console.log("login api response", data);
    dispatch(addUser(data));
    if (!response.ok) {
      console.error("Login failed:", data.message || "Unknown error");
    }
    return navigate("/feed");

  } catch (error) {
    console.error("Error during login:", error);
  }
};


  return (
    <div className="flex justify-center m-4">
      <div className="card card-border bg-base-300 w-100 h-70">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login Here </h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              className="input"
              value={email}
              placeholder="Type here"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              value={password}
              placeholder="Type here"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions flex justify-center">
            <button className="btn btn-primary" onClick={onSubmit}>
              Login In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
