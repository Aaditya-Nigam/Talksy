import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore";

export const Home=()=>{
    const {authUser}=useAuthStore()
    const navigate=useNavigate();
    if(!authUser){
        navigate("/login");
    }

    return <h1>Home</h1>
}