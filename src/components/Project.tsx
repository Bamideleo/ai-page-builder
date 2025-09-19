import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, BarChart3, Users, Globe, Settings, LogOut, Sparkles, Edit3, Eye, Calendar, ExternalLink, Trash2, Home, FolderOpen, CreditCard, TrendingUp, HelpCircle, Bell } from 'lucide-react';
import SideBar from "./SideBar"
import { Link} from 'react-router-dom';
import Header from './Header';

const Project = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
   <>
     <div className="min-h-screen bg-slate-50 text-gray-500">
      <div className="flex">
      <SideBar/>
       {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <Header title='Project'/>

          <div className="p-6">
          <div className="p-6 bg-white rounded-lg shadow-lg">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">Welcome back,  Admin!</h2>
          <p className="text-gray-400">Ready to create something amazing?</p>
        </motion.div>


        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
       
          <Link 
           to="/create-project"
            className="flex-1 text-white p-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Create New Project</span>
          </Link>
          <button 
           
            className="flex-1 p-4 border border-black/50 rounded-xl backdrop-blur-sm hover:bg-white/5 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Browse Templates</span>
          </button>
        </motion.div>
        </div>
        {/* Projects Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-xl font-semibold">Manage Projects</h3>
            
          </div>

        
          <div className="grid gap-4 inset-px rounded-lg bg-white lg:rounded-l-4xl shadow-lg">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * 1 }}
                className="group p-6 border border-white/10 rounded-xl hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 
                        className="text-lg font-semibold group-hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        Admin
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400`}>
                       pending
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Updated</span>
                      </span>
                      <span className="capitalize">One</span>
                      <span className="capitalize"> deployment</span>
                    </div>
                    
        
                      <div className="mt-2">
                        <a 
                          href="#"
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center space-x-1"
                        >
                          <Globe className="w-4 h-4" />
                          <span>one</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                   
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center space-x-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    
                      <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    
                    <button 
                      className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            
          </div>

          {/* {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-400 mb-4">
                {searchTerm ? 'No projects found' : 'No projects yet'}
              </p>
              <button 
                onClick={onCreateProject}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Create Your First Project
              </button>
            </div>
          )} */}
        </motion.div>
      </div>
        </main>
      </div>
    </div>
   </>
  )
}

export default Project
