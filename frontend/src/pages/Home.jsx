import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

export const Home=()=>{
    const {authUser}=useAuthStore()
    const navigate=useNavigate();
    useEffect(()=>{
        if(!authUser){
            navigate("/login");
        }
    },[authUser])

    return <h1>Home</h1>
}