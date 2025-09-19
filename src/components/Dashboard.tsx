import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Project, Page } from '../types';
import { Plus, Search, Filter, BarChart3, Users, Globe, Settings, LogOut, Sparkles, Edit3, Eye, Calendar, ExternalLink, Trash2, Home, FolderOpen, CreditCard, TrendingUp, HelpCircle, Bell } from 'lucide-react';

interface DashboardProps {
  user: User;
  projects: Project[];
  onLogout: () => void;
  onCreateProject: () => void;
  onOpenProject: (project: Project) => void;
  onEditProject: (project: Project) => void;
  onNavigate: (page: Page) => void;
}

export const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'from-cyan-400 to-blue-500' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, color: 'from-purple-400 to-pink-500' },
    { id: 'billing', label: 'Billing', icon: CreditCard, color: 'from-green-400 to-emerald-500' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'from-orange-400 to-red-500' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'from-indigo-400 to-purple-500' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, color: 'from-teal-400 to-cyan-500' },
  ];
  
  // const stats = [
  //   { label: 'Total Projects', value: projects.length.toString(), icon: BarChart3, color: 'from-cyan-400 to-blue-500' },
  //   { label: 'Published', value: projects.filter(p => p.status === 'published').length.toString(), icon: Globe, color: 'from-green-400 to-emerald-500' },
  //   { label: 'Views', value: '1.2K', icon: Eye, color: 'from-purple-400 to-pink-500' },
  //   { label: 'Team Members', value: '1', icon: Users, color: 'from-orange-400 to-red-500' }
  // ];

  // const filteredProjects = projects.filter(project => 
  //   project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   project.framework.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleDeleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      // In a real app, this would call an API
      console.log('Deleting project:', projectId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 min-h-screen bg-slate-800/50 backdrop-blur-sm border-r border-white/10">
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
                  onClick={() => setActiveMenuItem(item.id)}
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
               
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-red-400"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <header className="border-b border-white/10 backdrop-blur-sm bg-slate-900/90 sticky top-0 z-50">
            <div className="px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>All systems operational</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                </button>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-xs font-semibold">
                     Admin
                  </div>
                  <span className="capitalize"> Admin Plan</span>
                </div>
              </div>
            </div>
          </header>

          <div className="p-6">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">Welcome back,  Admin!</h2>
          <p className="text-slate-300">Ready to create something amazing?</p>
        </motion.div>

        {/* Stats Grid */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <button 
           
            className="flex-1 p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Create New Project</span>
          </button>
          <button 
           
            className="flex-1 p-4 border border-white/20 rounded-xl backdrop-blur-sm hover:bg-white/5 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Browse Templates</span>
          </button>
        </motion.div>

        {/* Projects Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-xl font-semibold">Your Projects</h3>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-slate-400 w-full sm:w-64"
                />
              </div>
              <button className="p-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* <div className="grid gap-4">
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group p-6 border border-white/10 rounded-xl hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 
                        className="text-lg font-semibold group-hover:text-cyan-400 transition-colors cursor-pointer"
                        onClick={() => onOpenProject(project)}
                      >
                        {project.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.status === 'published' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Updated {new Date(project.updated_at).toLocaleDateString()}</span>
                      </span>
                      <span className="capitalize">{project.framework}</span>
                      <span className="capitalize">{project.deployment_type} deployment</span>
                    </div>
                    
                    {project.urls?.subdomain && (
                      <div className="mt-2">
                        <a 
                          href={`https://${project.urls.subdomain}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center space-x-1"
                        >
                          <Globe className="w-4 h-4" />
                          <span>{project.urls.subdomain}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onEditProject(project)}
                      className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center space-x-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    {project.urls?.subdomain && (
                      <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div> */}

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
  );
};