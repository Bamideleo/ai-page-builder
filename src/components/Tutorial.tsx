import { motion } from 'framer-motion';
import { Plus, Search, Filter, BarChart3, Users, Globe, Settings, LogOut, Sparkles, Edit3, Eye, Calendar, ExternalLink, Trash2, Home, FolderOpen, CreditCard, TrendingUp, HelpCircle, Bell } from 'lucide-react';
import SideBar from "./SideBar"
import Header from './Header';
import { Link } from 'react-router-dom';

const Tutorial = () => {

const videos = [
    {
      id: 1,
      src: "https://www.youtube.com/embed/oZDeqbqoRuw",
      type: "youtube"
    },
    {
      id: 2,
      src: "https://fast.wistia.com/embed/medias/wjz3kdb0q3",
      type: "wistia"
    },
    {
      id: 3,
      src: "https://www.youtube.com/embed/JdYGpbuoqU4",
      type: "youtube"
    },
    {
      id: 4,
      src: "https://www.youtube.com/embed/TgXlD1bMoXA",
      type: "youtube"
    },
    {
      id: 5,
      src: "https://www.youtube.com/embed/N-WMTe13AJs",
      type: "youtube"
    },
    {
      id: 6,
      src: "https://www.youtube.com/embed/UwuQBdLxU74",
      type: "youtube"
    },
    {
      id: 7,
      src: "https://www.youtube.com/embed/bY7fmohOtcc",
      type: "youtube"
    },
    {
      id: 8,
      src: "https://www.youtube.com/embed/3C72hlimUP8",
      type: "youtube"
    }
  ];
  return (
  <>
   <div className="min-h-screen  bg-slate-50 text-gray-500">
      <div className="flex">
      <SideBar/>
  <main className="flex-1">
          {/* Header */}
       <Header title='Tutorials'/>
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h5 className="text-red-900  mb-4 text-lg font-semibold">
            IMPORTANT: Pls Take Action - Voyseai Bonuses For All Members
          </h5>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="https://warriorplus.com/o2/a/m8r20xd/0/voysetutorial" 
              target="_blank" 
              rel="noopener noreferrer"
               className="flex-1 text-white p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              &gt;&gt; Click Here To Get Lifetime Access To 250+ Premium AI Model
            </Link>
            
            <Link 
              to="https://bit.ly/seyi-adeleke-channel" 
              target="_blank" 
              rel="noopener noreferrer"
             className="flex-1 text-white p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              &gt;&gt; Subscribe To Our Youtube Channel
            </Link>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4">
                <div className="relative w-full" style={{ paddingBottom: '79.17%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={video.src}
                    title={`Video ${video.id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Sections (currently empty in original) */}
        <div className="mt-12">
          <div id="search_aud_dis" className="mb-8">
            {/* This section was empty in the original HTML */}
          </div>
          
          <div className="mb-8">
            {/* This section was also empty in the original HTML */}
          </div>
        </div>
      </div>
    </div>
      </main>
    </div>
    </div>
  </>
  )
}

export default Tutorial
