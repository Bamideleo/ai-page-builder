import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, BarChart3, Users, Globe, Settings, LogOut, Sparkles, Edit3, Eye, Calendar, ExternalLink, Trash2, Home, FolderOpen, CreditCard, TrendingUp, HelpCircle, Bell, Copy } from 'lucide-react';
import SideBar from "./SideBar"
import { Link, useNavigate} from 'react-router-dom';
import Header from './Header';
import { deleteWebPage, editProject, getPublishWeb } from '../api/auth';
import Swal from 'sweetalert2';
import { isUserDetails } from '../utils/auth';

const Project = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sitesData, setIsitesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(isUserDetails);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 10;
 const fetchProject = async () => {
        try {
          const res = await getPublishWeb(); 
          setIsitesData(res.message);
        } catch (err) {
          console.error("Failed to fetch project:", err);
        }
      };
  useEffect(()=>{
    fetchProject();
      setIsLoading(false);
  },[]);


  const filteredUsers = sitesData.filter(sites =>
    sites.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

 const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // reset to first page when filtering
    setCurrentPage(1); 
  };

  //Generate page numbers with ellipses
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if small
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // first page always
      pages.push(1); 

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      // last page always
      pages.push(totalPages); 
    }

    return pages;
  };

    const handleCopyLink = (link: any) => {
      navigator.clipboard.writeText(link);
     Swal.fire({
           toast: true,
           icon: "success",
           title: 'Link Copied',
           position: "top-end",
           showConfirmButton: false,
           timer: 3000,
         });
    };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setIsitesData((prev: any) => ({
    ...prev,
    [name]: value, // dynamically update field by name
  }));
};

const handleDelete = async (id: any) => {
  try {
          const res = await deleteWebPage(id); 
           Swal.fire({
           toast: true,
           icon: "success",
           title: res.message,
           position: "top-end",
           showConfirmButton: false,
           timer: 3000,
         });
         fetchProject();
        } catch (err) {
          console.error("Failed to delete project:", err);
        }
}

// const handleEditProject = async (slug: any) =>{
//     try {
//          const res = await editProject(slug);
//          window.open('http://localhost/Vvveb/admin/', '_blank');
//         } catch (err) {
//           console.error("Failed to delete project:", err);
//         }
// }

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
          <h2 className="text-3xl font-bold mb-2">Welcome back,  {user.name}!</h2>
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
          <Link 
          to={'/template'}
           
            className="flex-1 p-4 border border-black/50 rounded-xl backdrop-blur-sm hover:bg-white/5 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Browse Templates</span>
          </Link>
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
            <h3 className="text-xl font-semibold">Your Projects</h3>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-900 placeholder-slate-400 w-full sm:w-64"
                />
              </div>
              <button className="p-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
              {isLoading ? 
             <div className="flex-1 p-6">
        
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-300">Fetching your projects...</p>
                        <p className="text-sm text-slate-400 mt-2">
                          Processing...
                        </p>
                      </div>
                    </div>
          </div> 
          :
          <>
          <div className="grid gap-4">

            {currentItems.map((project, index) => (
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
                       
                      >
                        {project.title}
                      </h4>
                     <span className={`px-2 py-1 text-xs font-medium rounded-full 'bg-green-500/20 text-green-400`}>
                        Published
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Updated {new Date(project.created_at).toLocaleDateString()}</span>
                      </span>
                      {/* <span className="capitalize">{project.framework}</span>
                      <span className="capitalize">{project.deployment_type} deployment</span> */}
                    </div>
                    
                    {project.content && (
                      <div className="mt-2">
                        <Link 
                          to={project.content} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center space-x-1"
                        >
                          <Globe className="w-4 h-4" />
                          <span>{project.content}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                  
                  {/* <button 
                  onClick={() => handleEditProject(project.title)}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center space-x-2"
                  >
                  <Edit3 className="w-4 h-4" />
                  </button>   */}
                  

                  <div className="relative group inline-block">
                    <button 
                     onClick={() => handleCopyLink(project.content)}
                      className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center space-x-2"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    {/* Custom tooltip */}
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                                    px-2 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 
                                    group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                      Copy Link
                    </span>
                  </div>
                    
                    {project.content && (
                      <Link 
                        to={project.content} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">

                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                    <button 
                     onClick={() => handleDelete(project.id)}
                      className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {currentItems.length != 0 &&(
              <div className="flex items-center justify-center mt-6">
          <nav className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
              
           {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span key={idx} className="px-3 py-1">
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => handlePageChange(page as number)}
                className={`px-3 py-1 border rounded ${
                currentPage === page  ? "text-white bg-gradient-to-r from-cyan-400 to-blue-500" : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            )
          )}


            <button 
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </button>
          </nav>
                </div>
            )}
          
          </div>

      {currentItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-400 mb-4">
                {searchTerm ? 'No projects found' : 'No projects yet'}
              </p>
             
            </div>
          )}
    </>
}       
          
       
        </motion.div>
      </div>
       
        </main>
      </div>
    </div>
   </>
  )
}

export default Project
