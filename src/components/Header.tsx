import { useEffect, useState } from 'react';
import {Users } from 'lucide-react';
import {isUserDetails, setUserData, startAutoPurge} from "../utils/auth";
import { getUserDetails } from '../api/auth';


interface HeaderProps {
  title: string;
}
const Header = ({title}:HeaderProps) => {
const [user, setUser] = useState(isUserDetails);
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await getUserDetails();
      setUserData(res.user);
      setUser(isUserDetails);
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    }
  };
  fetchUser();
 startAutoPurge();
}, []);




  return (
    <>
     <header className="border-b  border-slate-50 backdrop-blur-sm bg-slate-50 sticky top-0 z-50">
            <div className="px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-40">{title}</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-40">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>All systems operational</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
                  {/* <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" /> */}
                </button>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  {/* <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-xs font-semibold">
                    <Users className='text-white text-xs'/>
                  </div> */}
                  <img width="25" height="25" src="https://img.icons8.com/3d-fluency/94/user-male-circle.png" alt="user-male-circle"/>
                  <span className="capitalize">{user.name}</span>
                </div>
              </div>
            </div>
          </header> 
    </>
  )
}

export default Header
