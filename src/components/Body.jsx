import {Outlet, useNavigate} from "react-router-dom"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { BASE_URL } from "../utils/Constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Body = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const userData = useSelector((store)=> store.user);
    
    const userLoad = async ()=>{
        try{
            const user = await fetch(BASE_URL + "/profile",{
            credentials: "include"
        })
        const userData = await user.json()
        dispatch(addUser(userData))
        }catch(error){
            if(error.status === 401){
                navigate("/login")
            }
            console.log(error);
        }   
    }

    useEffect(()=>{
        userLoad()
    },[]);

    return (
        <>
            <Navbar />
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Body;
