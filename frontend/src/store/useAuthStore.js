import { create } from "zustand"

export const useAuthStore= create((set)=>({
    authUser: null,
    isCheckingAuth: true,
    isSigningup: false,
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
        set({isSigningup: true});
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
            }else{
                set({authUser: null});
            }
        } catch (error) {
            set({authUser: null})
        }finally{
            set({isSigningup: false});
        }
    }

}))