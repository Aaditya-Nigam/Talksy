import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { SideBar } from "../components/UI/SideBar";
import { ChatBox } from "../components/UI/ChatBox";

export const Home=()=>{
    const {authUser}=useAuthStore()
    const navigate=useNavigate();
    useEffect(()=>{
        if(!authUser){
            navigate("/login");
        }
    },[authUser])

    return (
        <main className="flex">
            <SideBar/>
            <ChatBox/>
        </main>
    )
}