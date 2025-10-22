import {create} from 'zustand';
import {axiosInstance} from '../lib/axios.js'
import { toast } from 'react-hot-toast';
import {io} from 'socket.io-client';
const BASE_URL=import.meta.env.MODE==="development" ? "http://localhost:5001":"/";

export const useAuthStore=create((set,get)=>({
  authUser:null,
  isSigningUp:false,
  isLogging:false,
  isUpdatingProfile:false,
  onlineUsers:[], 
  isCheckingAuth:true,
  socket:null,

  checkAuth:async()=>{
    try {
        const res=await axiosInstance.get('/auth/check')
        set({authUser:res.data})
         get().connectSocket();
    } catch (error) {

        console.log('Error in checkAuthStore :',error)
        set({authUser:null})
    }
    finally{
        set({isCheckingAuth:false})
    }
  },

  signup:async(data)=>{
    set({isSigningUp:true});
    try {
      const res=await axiosInstance.post('/auth/signup',data);
      toast.success("Account created successfully");
      set({authUser:res.data})
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in useAuthStore signup");
    }
    finally{
      set({isSigningUp:false});
    }
  },

  logout:async()=>{
    try {
       await axiosInstance.post('/auth/logout');
       set({authUser:null})
       toast.success("Logged Out Successfully")
       get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in useAuthStore Logout");
    }
  },

  login:async(data)=>{
    try {
       const res=await axiosInstance.post('/auth/login',data);
       toast.success("Logged In successfully");
       set({authUser:res.data})
       get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in useAuthStore login");
    }
    finally{
      set({isLogging:false})
    }
  },

  updateProfile:async(data)=>{
   set({isUpdatingProfile:true})
  
   try {
      const res=await axiosInstance.put('/auth/update-profile',data);
      set({authUser:res.data});
      toast.success("Profile Updated Successfully")
   } catch (error) {
    toast.error(error.response.data.message);
      console.log("Error in useAuthStore updationProfile");
   }
   finally{
    set({isUpdatingProfile:false})
   }
  },

  connectSocket:()=>{
   const {authUser}=get();
   if(!authUser || get().socket?.connected) return;

   const socket=io(BASE_URL,{
  query: {
    userId: authUser._id, // or whatever field is your user ID
  },
});

   socket.connect();

   set({socket:socket});
socket.on("getOnlineUsers",(usersId)=>{
    set({onlineUsers:usersId});

   })
  },


  disconnectSocket:()=>{
    if(get().socket?.connect) get().socket.disconnect();
  }
}))