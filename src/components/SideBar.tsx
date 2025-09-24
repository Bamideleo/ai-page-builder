import { useState } from 'react';
import { motion, AnimatePresence} from 'framer-motion';
import { Link, useNavigate, useLocation} from "react-router-dom";
import {ChevronDown, Plus, Search, Filter, BarChart3, Users, Globe, Settings, LogOut, Sparkles, Edit3, Eye, Calendar, ExternalLink, Trash2, Home, FolderOpen, CreditCard, TrendingUp, HelpCircle, Bell, Flame, ArrowDownUp, DollarSign, BanknoteIcon, Workflow, UserPlus, HandMetal, Activity, WalletIcon, Gift, ArrowUpFromLine, User, Cog } from 'lucide-react';
import { logout } from "../utils/auth";
import {isUserDetails} from "../utils/auth";

const SideBar = () => {
    const [activeMenuItem, setActiveMenuItem] = useState('tutorial');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState(isUserDetails);
    const navigate = useNavigate();
  

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
          <nav className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800 mb-32">
            <div className="space-y-2">
               <Link to="/tutorials"
                 onClick={() =>setActiveMenuItem('tutorial')}
               >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeMenuItem === 'tutorial'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeMenuItem === 'tutorial'
                      ? `bg-gradient-to-r from-cyan-400 to-blue-500` 
                      : 'bg-white/5'
                  }`}>
                    <Home className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Tutorial</span>
                </motion.button>
                </Link>

                <Link to="/projects" 
                onClick={() =>setActiveMenuItem('projects')}
                className='py-3'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeMenuItem === 'projects'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeMenuItem === 'projects'
                      ? `bg-gradient-to-r from-purple-400 to-pink-500` 
                      : 'bg-white/5'
                  }`}>
                    <FolderOpen className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Projects</span>
                </motion.button>
                </Link>

            {user.oto_2 === 1 &&
          
        <div className="py-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
            activeMenuItem === "dfy"
              ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                activeMenuItem === "dfy"
                  ? "bg-gradient-to-r from-red-400 to-pink-500"
                  : "bg-white/5"
              }`}
            >
             
              <Flame className="w-4 h-4" />
            </div>
            <span className="font-medium">DFY</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </motion.button>

        {/* Dropdown items */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="ml-12 mt-2 space-y-2 overflow-hidden"
            >
              <Link
                to="/projects/active"
                onClick={() => setActiveMenuItem("active-projects")}
                className={`block px-3 py-2 rounded-lg text-sm ${
                  activeMenuItem === "active-projects"
                    ? "bg-cyan-500/20 text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
               Marketplace
              </Link>
              <Link
                to="/hot-dfy-offers"
                onClick={() => setActiveMenuItem("archived-projects")}
                className={`block px-3 py-2 rounded-lg text-sm ${
                  activeMenuItem === "archived-projects"
                    ? "bg-cyan-500/20 text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
               Hot DFY Offer
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      }

                {user.oto_5 === 1 &&
                 <Link to="/limitless" 
                onClick={() =>setActiveMenuItem('traffic')}
                className='py-3'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeMenuItem === 'traffic'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeMenuItem === 'traffic'
                      ? `bg-gradient-to-r from-green-400 to-emerald-500` 
                      : 'bg-white/5'
                  }`}>
                    <ArrowDownUp className="w-4 h-4"/>
                  </div>
                  <span className="font-medium">Limitless</span>
                </motion.button>
                </Link>
                }

                {user.oto_4 === 1 &&
                 <Link to="https://profit.mysuperaiapp.com/login" 
                 target='_blank'
                onClick={() =>setActiveMenuItem('profit')}
                className='py-3'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeMenuItem === 'profit'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeMenuItem === 'profit'
                      ? `bg-gradient-to-r from-purple-400 to-pink-500` 
                      : 'bg-white/5'
                  }`}>
                    <DollarSign className="w-4 h-4"/>
                  </div>
                  <span className="font-medium">Swift Profit</span>
                </motion.button>
                </Link>
                }

                {user.oto_8 === 1 &&
                 <Link to="/multiple-income" 
                onClick={() =>setActiveMenuItem('income')}
                className='py-3'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeMenuItem === 'income'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeMenuItem === 'income'
                      ? `bg-gradient-to-r from-orange-400 to-red-500` 
                      : 'bg-white/5'
                  }`}>
                    <BanknoteIcon className="w-4 h-4"/>
                  </div>
                  <span className="font-medium">Multiple Income</span>
                </motion.button>
                </Link>
                }

                {user.oto_3 === 1 &&
                 <Link to="https://profit.mysuperaiapp.com/login" 
                 target='_blank'
                onClick={() =>setActiveMenuItem('automation')}
                className='py-3'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeMenuItem === 'automation'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeMenuItem === 'automation'
                      ? `bg-gradient-to-r from-purple-400 to-pink-500` 
                      : 'bg-white/5'
                  }`}>
                    <Workflow className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Automation</span>
                </motion.button>
                </Link>
                }

                {user.oto_6 === 1 &&
                 <Link to="/agency" 
                onClick={() =>setActiveMenuItem('agency')}
                className='py-3'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeMenuItem === 'agency'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeMenuItem === 'agency'
                      ? `bg-gradient-to-r from-purple-400 to-blue-500` 
                      : 'bg-white/5'
                  }`}>
                    <Activity className="w-4 h-4"/>
                  </div>
                  <span className="font-medium">Agency</span>
                </motion.button>
                </Link>
                  }
                  {user.oto_7 === 1 &&
                 <Link to="/franchise" 
                onClick={() =>setActiveMenuItem('franchise')}
                className='py-3'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeMenuItem === 'franchise'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeMenuItem === 'franchise'
                      ? `bg-gradient-to-r from-green-400 to-purple-500` 
                      : 'bg-white/5'
                  }`}>
                  
                    <WalletIcon className="w-4 h-4"/>
                  </div>
                  <span className="font-medium">Franchise</span>
                </motion.button>
                </Link>
                  }
                 <Link to="/Bonus" 
                onClick={() =>setActiveMenuItem('Bonus')}
                target='_blank'
                className='py-3'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeMenuItem === 'Bonus'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeMenuItem === 'Bonus'
                      ? `bg-gradient-to-r from-purple-400 to-pink-500` 
                      : 'bg-white/5'
                  }`}>
                    <Gift className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Bonus</span>
                </motion.button>
                </Link>

                 <Link to="/Upgrade" 
                onClick={() =>setActiveMenuItem('Upgrade')}
                className='py-3'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeMenuItem === 'Upgrade'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeMenuItem === 'Upgrade'
                      ? `bg-gradient-to-r from-blue-900 to-pink-800` 
                      : 'bg-white/5'
                  }`}>
                    <ArrowUpFromLine className="w-4 h-4"/>
                  </div>
                  <span className="font-medium">Upgrade</span>
                </motion.button>
                </Link>

                {user.role === 'admin' &&
                  <Link to="/users" 
                onClick={() =>setActiveMenuItem('user')}
                className='py-3'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeMenuItem === 'user'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeMenuItem === 'user'
                      ? `bg-gradient-to-r from-purple-400 to-yellow-500` 
                      : 'bg-white/5'
                  }`}>
                    <UserPlus className="w-4 h-4"/>
                  </div>
                  <span className="font-medium">Users</span>
                </motion.button>
                </Link>
                }
                

                   <Link to="/profile-settings" 
                onClick={() =>setActiveMenuItem('profile')}
                className='py-3'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeMenuItem === 'profile'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeMenuItem === 'profile'
                      ? `bg-gradient-to-r from-cyan-600 to-yellow-500` 
                      : 'bg-white/5'
                  }`}>
                  
                    <Cog className="w-4 h-4"/>
                  </div>
                  <span className="font-medium">Porfile Settings</span>
                </motion.button>
                </Link>
            </div>
          </nav>

          {/* User Profile */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-sm font-semibold">
              <Users/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 capitalize">{user.name}</p>
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
