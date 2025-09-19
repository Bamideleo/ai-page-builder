import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation} from "react-router-dom";
import { Plus, Search, Filter, BarChart3, Users, Globe, Settings, LogOut, Sparkles, Edit3, Eye, Calendar, ExternalLink, Trash2, Home, FolderOpen, CreditCard, TrendingUp, HelpCircle, Bell } from 'lucide-react';
import { logout } from "../utils/auth";

const SideBar = () => {
    const location = useLocation();
    const path = location.pathname;
    const segments = path.split("/").filter(Boolean);
    const currentRoute = segments[0];
    const [activeMenuItem, setActiveMenuItem] = useState('tutorial');
    const navigate = useNavigate();
    // useEffect(()=>{
    // setActiveMenuItem(currentRoute);
    // }, ['tutorial']);
    const menuItems = [
        { id: 'tutorial', label: 'Tutorial', icon: Home, color: 'from-cyan-400 to-blue-500', link:'tutorials'},
        { id: 'projects', label: 'Projects', icon: FolderOpen, color: 'from-purple-400 to-pink-500', link:'projects'},
        { id: 'billing', label: 'Billing', icon: CreditCard, color: 'from-green-400 to-emerald-500', link:'#'},
        { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'from-orange-400 to-red-500', link:'#'},
        { id: 'settings', label: 'Settings', icon: Settings, color: 'from-indigo-400 to-purple-500', link:'#'},
        { id: 'help', label: 'Help & Support', icon: HelpCircle, color: 'from-teal-400 to-cyan-500', link:'#'},
      ];

const handleSideBarLink = (id: string, link: string) =>{
    if (currentRoute === id) {
    setActiveMenuItem(id);  
    }
    navigate(`/${link}`);
}
      
const handleLogout = () =>  {
    logout();
    navigate("/");
  };

  return (
    <>
     <aside className="w-64 min-h-screen bg-slate-900 text-white  backdrop-blur-sm border-r border-slate-900/10">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  AIBuilder
                </h1>
                <p className="text-xs text-slate-400">Next-Gen Builder</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleSideBarLink(item.id, item.link)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeMenuItem === item.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeMenuItem === item.id 
                      ? `bg-gradient-to-r ${item.color}` 
                      : 'bg-white/5'
                  }`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </nav>

          {/* User Profile */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-sm font-semibold">
               Admin
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate"> Admin</p>
                <p className="text-xs text-slate-400 capitalize"> Admin Plan</p>
              </div>
              <button 
               onClick={handleLogout}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-red-400"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
    </>
  )
}

export default SideBar
