import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { BASE_URL } from "../utils/Constants";

const Requests = () => {
  const dispatch = useDispatch();
  const requestData = useSelector((store) => store.requests);
  console.log("requestData", requestData);

  const requestsData = async () => {
    console.log("i am called by useEffect");
    const response = await fetch(BASE_URL + "/user/requests/recieved", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    dispatch(addRequests(data.connectionRequest));
  };

  useEffect(() => {
    requestsData();
  }, []);

  const clickHandler = async (state, id) => {
    try {
      await fetch(`${BASE_URL}/request/review/${state}/${id}`, {
        method: "POST",
        credentials: "include",
      });
      dispatch(removeRequest(id));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="w-[800px] mx-auto m-10">
      <div className="p-4 pb-2 text-xl opacity-60 tracking-wide">Requests</div>
      {requestData &&
        requestData.map((request) => {
          return (
            <ul
              className="list m-2 bg-base-300 rounded-box shadow-md"
              key={request.fromUserId._id} // ✅ Key added here
            >
              <li className="list-row">
                <div>
                  <img
                    className="size-10 rounded-box"
                    src={request.fromUserId.photoUrl}
                    alt="profile"
                  />
                </div>
                <div>
                  <div>{request.fromUserId.lastName}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {request.fromUserId.firstName}
                  </div>
                </div>
                <button
                  className="btn btn-success"
                  onClick={() => clickHandler("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-error "
                  onClick={() => clickHandler("rejected", request._id)}
                >
                  Reject
                </button>
              </li>
            </ul>
          );
        })}
    </div>
  );
};

export default Requests;
