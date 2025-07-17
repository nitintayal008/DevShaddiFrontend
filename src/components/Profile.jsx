import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((store) => store.user);
  const user = userState?.user;

  // Local states for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [skills, setSkills] = useState("");
  const [about, setAbout] = useState("");

  // Populate form values when user data becomes available
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhotoUrl(user.photoUrl || "");
      setSkills(user.skills || "");
      setAbout(user.about || "");
    }
  }, [user]);

  const saveHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(BASE_URL + "/profile/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
          photoUrl,
          skills,
          about,
        }),
      });

      const result = await response.json();
      dispatch(addUser(result));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // ⏳ Show loading if user data not yet loaded
  if (!user) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="m-10">
        <div className="flex justify-center">
          <div className="card card-border bg-base-300 w-100 h-140">
            <div className="card-body">
              <h2 className="card-title flex justify-center">Edit Profile</h2>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  placeholder="Type here"
                  onChange={(e) => setFirstName(e.target.value)}
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
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL</legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  placeholder="Type here"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Skills</legend>
                <input
                  type="text"
                  className="input"
                  value={skills}
                  placeholder="Type here"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  className="input"
                  value={about}
                  placeholder="Type here"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>

              <div className="card-actions flex justify-center">
                <button className="btn btn-primary" onClick={saveHandler}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="m-10">
        <UserCard userData={user} />
      </div>
    </div>
  );
};

export default Profile;
