import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { addConnections } from "../utils/connectionsSlice";
import { useEffect } from "react";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionsData = useSelector((store) => store.connections);
  console.log("connectionsData", connectionsData)
  const fetchConnections = async () => {
    try {
      const response = await fetch(BASE_URL + "/user/connections", {
        method: "GET",
        credentials: "include",
      });
      console.log("response", response);
      const data = await response.json();
      console.log("hello data", data);
      dispatch(addConnections(data.data));
    } catch (error) {
      console.error("Failed to fetch connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="w-[800px] mx-auto m-10">
      <div className="p-4 pb-2 text-xl opacity-60 tracking-wide">Connections</div>

      {connectionsData?.map((item) => (
        <div key={item.id} className="w-[800px] mx-auto m-2">
          <ul className="list bg-base-300 rounded-box shadow-md">

            <li className="list-row flex items-center gap-4 p-4">
              <div>
                <img className="size-10 rounded-box" src={item.photoUrl} alt="profile" />
              </div>
              <div>
                <div className="font-semibold">{item.firstName} {item.lastName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {item.role}
                </div>
              </div>
              <p className="ml-auto text-xs max-w-xs truncate">{item.about}</p>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Connections;
