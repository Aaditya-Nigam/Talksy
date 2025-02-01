import toast from "react-hot-toast";
import { create } from "zustand"

export const useAuthStore= create((set)=>({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    checkAuth: async()=>{
        try {
            const res=await fetch("http://localhost:5000/api/auth/check",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data=await res.json();
            if(!res.ok){
                set({authUser: null})
            }else{
                set({authUser: data});
            }
            set({isCheckingAuth:false});
        } catch (error) {
            set({authUser: null})
            set({isCheckingAuth:false});
        }
    },

    signUp: async (formData)=>{
        set({isSigningUp: true});
        try {
            const res=await fetch("http://localhost:5000/api/auth/signUp",{
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data=await res.json();
            if(res.ok){
                set({authUser: data});
                return toast.success("Acount created successfully!")
            }else{
                set({authUser: null});
                console.log(data.message)
                return toast.error(data.message)
            }
        } catch (error) {
            set({authUser: null})
            console.log(error)
            return toast.error("Invalid credentials")
        }finally{
            set({isSigningUp: false});
        }
    },

    login: async (formData)=>{
        set({isLoggingIn: true})
        try {
            const res=await fetch("http://localhost:5000/api/auth/login",{
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data=await res.json();
            if(res.ok){
                set({authUser: data})
                toast.success("Successfully logged in!");
            }else{
                set({authUser: null})
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error.message);
        }finally{
            set({isLoggingIn: false})
        }
    },

    logout: async ()=>{
        try {
            const res=await fetch("http://localhost:5000/api/auth/logout",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data=await res.json();
            if(res.ok){
                set({authUser: null});
                toast.success(data.message);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(data.message);
            console.log(error.message);
        }
    },

    updateProfilePic: async (data)=>{
        set({isUpdatingProfile: true});
        try {
            const res=await fetch("http://localhost:5000/api/auth/update-profile",{
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            const result=await res.json();
            if(res.ok){
                set({authUser: result});
                toast.success("Profile updated!");
            }else{
                toast.error(result.message)
                console.log(result.message);
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }finally{
            set({isUpdatingProfile: false});
        }
    }

}))