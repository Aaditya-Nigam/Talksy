import { useEffect } from "react"
import { useChatStore } from "../../store/useChatStore"
import { FaRegMessage } from "react-icons/fa6"
import { RxCross1 } from "react-icons/rx";

export const ChatBox=()=>{

    const {selectedUser,isMessageLoading,getMessages,messages,setSelectedUser}=useChatStore()

    useEffect(()=>{
        if(selectedUser){
            getMessages(selectedUser._id);
        }
    },[selectedUser])
    console.log(messages);

    if(!selectedUser){
        return (
            <div className="w-[calc(100vw-15rem)] h-[calc(100vh-53px)] bg-zinc-800 text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <FaRegMessage className="bg-zinc-900 text-8xl p-4 rounded-xl "/>
                    <p className="text-xl">Welcome to Talksy!</p>
                    <p className="text-2xl">Start your conversation with friends!!</p>
                </div>
                    
            </div>
        )
    }

    return (
        <main className="w-[calc(100vw-15rem)] h-[calc(100vh-53px)] bg-zinc-800 text-white">
            <div className="flex justify-between items-center px-4 py-2 bg-zinc-900 border-b-1 border-zinc-600 h-1/13">
                <div className="flex items-center gap-2">
                    <img src={selectedUser?.profilePic || "/avatar.jpg"} alt="prfile" className="h-[2rem] w-[2rem] rounded-[50%] object-fill"/>
                    <p className="text-lg">{selectedUser?.fullName || "Ojas Nigam"}</p>
                </div>
                <RxCross1 className="cursor-pointer" onClick={()=> setSelectedUser(null)}/>
            </div>

            <div className="h-11/13 px-6 py-2 flex flex-col gap-1">
                {
                    messages.map((message)=>{
                        return (
                        <>
                            <p key={message._id} className={`text-black w-fit px-4 py-1 rounded-2xl ${selectedUser._id==message.senderId? "bg-white":"bg-lime-300 self-end"}`}>{message.text}</p>
                        </>
                        )
                    })
                }
            </div>

            <div className="h-1/13 bg-zinc-900">
                <form>
                    <input type="text" name="" id="" />
                </form>
            </div>
        </main>
    )
}