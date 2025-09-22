import { motion } from 'framer-motion';
import { Plus, Search, Filter, BarChart3, Users, Globe, Settings, LogOut, Sparkles, Edit3, Eye, Calendar, ExternalLink, Trash2, Home, FolderOpen, CreditCard, TrendingUp, HelpCircle, Bell } from 'lucide-react';
import SideBar from "./SideBar"
import Header from './Header';
import { Link } from 'react-router-dom';

const MultipleIncome = () => {
  return (
    <>
       <div className="min-h-screen  bg-slate-50 text-gray-500">
      <div className="flex">
      <SideBar/>
  <main className="flex-1">
          {/* Header */}
    <Header title='Multiple Income'/>
    <iframe src="https://2pdf.codesterra.com/" className="w-full h-[calc(100vh-73px)]" allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone" 
    style={{border: "none", 
    display: "block"}}></iframe>
    </main>
    </div>
    </div>
    </>
  )
}

export default MultipleIncome
