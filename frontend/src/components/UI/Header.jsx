import { FaRegMessage, FaRegUser } from "react-icons/fa6"
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { useAuthStore } from "../../store/useAuthStore";
import { NavLink } from "react-router-dom";

export const Header=()=>{

    const {authUser,logout}=useAuthStore();

    return (
        <nav className="bg-[#0a0a0a] px-6 py-2 text-white flex justify-between items-center">
            <div className="flex gap-2 items-center text-xl">
                <FaRegMessage className="bg-[#28292a] text-4xl p-2 rounded-lg "/>
                <p>Talksy</p>
            </div>
            <div className="flex gap-8 cursor-pointer">
                <div className="flex gap-1 items-center">
                    <IoMdSettings className="text-xl"/>
                    <p className="text-sm">Setting</p>
                </div>
                {
                    authUser?
                    <>
                        <NavLink to="/profile" className="flex gap-1 items-center">
                            <FaRegUser className="text-lg cursor-pointer"/>
                            <p className="text-sm">Profile</p>
                        </NavLink>
                        <div className="flex gap-1 items-center cursor-pointer" onClick={()=> logout()}>
                            <TbLogout className="text-xl "/>
                            <p className="text-sm" >Logout</p>
                        </div>
                    </>: ""
                }
            </div>
        </nav>
    )
}