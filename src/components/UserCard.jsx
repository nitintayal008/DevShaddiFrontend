const UserCard = ({userData}) => {
    console.log("Card data iis userData",userData)
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm h-140">
        <figure>
          <img
            src={userData?.photoUrl}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{userData?.firstName}</h2>
            <h2 className="card-title">{userData?.lastName}</h2>
            <p>
           {userData?.skills}
          </p>
          <p>
           {userData?.about}
          </p>
          <div className="card-actions justify-end">
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
