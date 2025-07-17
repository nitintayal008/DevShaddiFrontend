import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { addFeed, removeFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feedData && feedData.length > 0) return;
    try {
      const response = await fetch(`${BASE_URL}/user/feed`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const feed = await response.json();
      console.log("Fetched feed:", feed);
      dispatch(addFeed(feed));
    } catch (error) {
      console.error("Fetch feed error:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feedData || feedData.length === 0) {
    return <div className="text-center mt-10">Loading feed...</div>;
  }

  const clickHandler =async (status, id)=>{
    try{
      await fetch(`${BASE_URL}/request/send/${status}/${id}`, {
      method:"POST",
      credentials:"include"
    });
    dispatch(removeFeed(id));
    }catch(error){
      console.log("Error:", error)
    }
  }

  const { photoUrl, firstName,lastName, _id } = feedData[0];

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-base-300 w-96 shadow-lg">
        <figure>
          <img src={photoUrl} alt={firstName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>
            A card component has a figure, a body part, and inside the body
            there are title and action parts.
          </p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={()=> clickHandler("ignored",_id ) }>Ignored</button>
            <button className="btn btn-primary"  onClick={()=> clickHandler("interested", _id) }>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
