import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Setting } from "./pages/Setting";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

const App=()=>{

  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  if(isCheckingAuth && !authUser){
    return <h1>Loading...</h1>
  }

  const router=createBrowserRouter([{
    path: "/",
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/signUp",
        element: <SignUp/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/profile",
        element: <Profile/>
      },
      {
        path: "/setting",
        element: <Setting/>
      }
    ]
  }])


  return (
    <RouterProvider router={router}/>
  )
}

export default App;