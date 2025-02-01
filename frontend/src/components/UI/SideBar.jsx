import { FiUsers } from "react-icons/fi";
import { useChatStore } from "../../store/useChatStore";
import { useEffect } from "react";

export const SideBar=()=>{

    const {users,getUsers,selectedUser,setSelectedUser,isUsersLoading}=useChatStore();
    useEffect(()=>{
        getUsers();
    },[]);
    console.log(users);

    return (
        <aside className="w-[15rem] bg-[#0f0f0f] h-[calc(100vh-53px)] text-white flex flex-col gap-4 border-r-1 border-zinc-700">
            {
                isUsersLoading?
                <>
                    <div className="flex gap-2 items-center px-4 py-2">
                        <FiUsers className="text-xl"/>
                        <p className="text-lg">Contacts</p>
                    </div>
                    <div className="flex flex-col">
                        {
                            users.map((user)=>{
                                return (
                                    <div key={user._id} className={`flex gap-2 items-center px-4 py-2 ${selectedUser?._id===user._id? 'bg-zinc-800': ""}`} onClick={()=> setSelectedUser(user)}>
                                            <div>
                                                <img src={user.profilePic || "/avatar.jpg"} alt="profile" className="h-[2.2rem] w-[2.2rem] rounded-[50%]"/>
                                            </div>
                                            <div>
                                                <p className="text-sm">{user.fullName}</p>
                                                <p className="text-xs">Offline</p>
                                            </div>
                                        </div>
                                )
                            })
                        }
                        
                    </div>
                </>
                    :
                <p>Loading..</p>
            }
        </aside>
    )
}