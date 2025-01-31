import { FaRegUser } from "react-icons/fa6";
import { useAuthStore } from "../store/useAuthStore"
import { IoCameraOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export const Profile=()=>{

    const {authUser,updateProfilePic,isUpdatingProfile}=useAuthStore()
    const [selectedImage,setSelectedImage]=useState(null)
    const navigate=useNavigate();
    useEffect(()=>{
        if(!authUser){
            navigate("/login");
        }
    },[authUser])

    const handleProfilePic=(e)=>{
        const file=e.target.files[0];
        if(!file){
            toast.error("Please select an image!");
            return ;
        }
        const reader=new FileReader();

        reader.readAsDataURL(file);
        reader.onload=async ()=>{
            const base64Image=reader.result;
            setSelectedImage(base64Image);
            await updateProfilePic({profilePic: base64Image})
        }
    }

    return (
        <main className="w-full min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
            <div className="w-[450px] p-4 flex flex-col gap-8 bg-zinc-900 rounded-xl">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl">Profile</h2>
                        <p>Your profile information</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={selectedImage || authUser?.profilePic || "/avatar.jpg"} alt="avatar" className="rounded-[50%] h-[125px] w-[125px] border-4"/>
                        <label htmlFor="upload_profile">
                            <IoCameraOutline className="bg-yellow-300 p-1 text-2xl rounded-[50%] text-black relative bottom-[30px] left-[40px] cursor-pointer"/>
                            <input type="file" name="upload_profile" id="upload_profile" className="hidden" onChange={handleProfilePic} disabled={isUpdatingProfile}/>
                        </label>
                        {
                            isUpdatingProfile? <p>Updating..</p>:<p>Click the camera icon to update your photo</p>
                        }    
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <FaRegUser />
                            <p>Full Name</p>
                        </div>
                        <p className="border-1 rounded-md px-4 py-1 bg-zinc-800">{authUser?.fullName}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <MdOutlineMailOutline />
                            <p>Email</p>
                        </div>
                        <p className="border-1 rounded-md px-4 py-1 bg-zinc-800">{authUser?.email}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-xl font-bold">Account Information</p>
                    <div className="flex justify-between">
                        <p>Member Since</p>
                        <p>{authUser?.createdAt.split('T')[0]}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Account Status</p>
                        <p className="text-green-400">Active</p>
                    </div>
                </div>
            </div>
        </main>
    )
}