import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"
import { FaRegMessage } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"

export const SignUp=()=>{
    const [showPassword,setShowPassword]=useState(false);
    const [user,setUser]=useState({
        fullName: "",
        email: "",
        password: ""
    })
    const {authUser,isSigningUp,signUp}=useAuthStore();
    const navigate=useNavigate()
    useEffect(()=>{
        if(authUser){
            navigate("/");
        }
    },[authUser])

    const validateForm=()=>{
        if(user.fullName.trim()==0){
            return toast.error("Full Name missing!")
        }
        if(user.email.trim()==0){
            return toast.error("Email missing!")
        }
        if(user.password.length < 6){
            return toast.error("Password must be atleast 6 characters!")
        }
        return true;
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        const success=validateForm();
        if(success===true){
            signUp(user);
        }
    }

    return (
        <main className="w-full min-h-screen bg-[#0f0f0f] text-white flex justify-center items-center">
            <div className="w-[450px] p-4 flex flex-col gap-8">
                <div className="flex flex-col items-center gap-2">
                    <FaRegMessage className="bg-[#28292a] text-6xl p-3 rounded-lg"/>
                    <h2 className="text-3xl">Create Account</h2>
                    <p>Get started with your free account</p>
                </div>
                <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="fullName">Full Name</label>
                        <div className="flex border-1 rounded-md items-center gap-2 px-2 py-1">
                            <FaRegUser />
                            <input type="text" name="fullName" id="fullName" placeholder="Aaditya Nigam" className="outline-none w-full" value={user.fullName} onChange={(e)=> setUser({...user,[e.target.name]: e.target.value})}/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <div className="flex border-1 rounded-md items-center gap-2 px-2 py-1">
                            <MdOutlineMailOutline />
                            <input type="email" name="email" id="email" placeholder="aaditya@email.com" className="outline-none w-full" value={user.email} onChange={(e)=> setUser({...user,[e.target.name]: e.target.value})}/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password</label>
                        <div className="flex border-1 rounded-md items-center gap-2 px-2 py-1">
                            <TbLockPassword />
                            <input type={showPassword?"text":"password"} name="password" id="password" placeholder="***********" className="outline-none w-full" value={user.password} onChange={(e)=> setUser({...user,[e.target.name]: e.target.value})}/>
                            {
                                showPassword==true?<FaEyeSlash onClick={()=> setShowPassword(!showPassword)} className="cursor-pointer"/>:<FaEye onClick={()=> setShowPassword(!showPassword)} className="cursor-pointer"/>
                            }
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="bg-sky-600 w-full py-1 text-xl rounded-md cursor-pointer" disabled={isSigningUp}>
                            {
                                isSigningUp?"Loading...":"Sign Up"
                            }
                        </button>
                    </div>
                </form>
                <p className="text-center">Already have an account? <NavLink to="/login" className="text-blue-300 hover:text-blue-400 hover:underline">Sign in</NavLink></p>
            </div>
            <Toaster/>
        </main>
    )
}