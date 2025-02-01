import toast from "react-hot-toast";
import {create} from "zustand"

export const useChatStore=create((set)=> ({
    isUsersLoading: false,
    isMessageLoading: false,
    users: [],
    messages: [],
    selectedUser:null,

    getUsers: async ()=>{
        set({isUsersLoading: true})
        try {
            const res=await fetch("http://localhost:5000/api/messages/user",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            const result=await res.json();
            if(res.ok){
                set({users: result});
            }else{
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
        }
    },

    setSelectedUser: async (user)=>{
        
        set({selectedUser: user})
    },

    getMessages: async(userId)=>{
        set({isMessageLoading: true})
        try {
            const res=await fetch(`http://localhost:5000/api/messages/${userId}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            const result=await res.json();
            if(res.ok){
                set({messages: result})
            }else{
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }
}))