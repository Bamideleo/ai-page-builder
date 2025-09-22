
import { motion } from 'framer-motion';
import { Plus, Search, Filter, BarChart3, Users, Globe, Settings, LogOut, Sparkles, Edit3, Eye, Calendar, ExternalLink, Trash2, Home, FolderOpen, CreditCard, TrendingUp, HelpCircle, Bell } from 'lucide-react';
import SideBar from "./SideBar"
import Header from './Header';
import { Link } from 'react-router-dom';
const FranchiseDashboard = () => {
  return (
    <>
      <div className="min-h-screen  bg-slate-50 text-gray-500">
      <div className="flex">
      <SideBar/>
  <main className="flex-1">
          {/* Header */}
       <Header title='Franchise'/>
        <div className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Step 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Step 1</h3>
              <img 
                src="https://humanifyapp.com/img/users/reseller-7ca33e91.jpg" 
                alt="Step 1 Image" 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <Link 
                to="https://warriorplus.com/user/new" 
                target="_blank" 
                rel="noopener noreferrer"
                 className="flex-1 text-white p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                Click Here To Create Your Warriorplus Account
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Step 2</h3>
              <img 
                src="https://humanifyapp.com/img/users/reseller1-b3375310.jpg" 
                alt="Step 2 Image" 
                className="w-full h-48 object-cover rounded-lg mb-8"
              />
              <Link 
                to="https://warriorplus.com/as/o/jn2klj" 
                target="_blank" 
                rel="noopener noreferrer"
                 className="flex-1 text-white p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                Click Here To Request For Your Humanify Link
              </Link>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Step 3</h3>
              <h4 className="text-lg font-medium mb-3">Enter The Message Below In The "Request Note" Box.</h4>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-red-800 text-base">
                  &gt;&gt; I purchased Humanify Reseller Plan With This Email Address<br />
                  ("Specify Your Email"). Pls Approve My Request & Set To 70% Commission.
                </p>
              </div>
              <img 
                src="https://humanifyapp.com/img/users/reseller2-de618784.jpg" 
                alt="Step 3 Image" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-red-800 text-base font-medium">
                Note - Your Request Will Be Approved Within 24 - 72 Hours
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Step 4</h3>
              <p className="text-base mb-4">
                Email Swipe, Bonuses and all the resources you need are inside the JV Doc -{' '}
                <Link 
                  to="https://cutt.ly/humanify-doc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                   className="flex-1 text-white p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  Click Here
                </Link>.
              </p>
              <p className="text-base mb-6">
                Viola! Start Selling Using Your Link & Bank 70% Commission Across All Funnels
              </p>
              <Link
                to="https://warriorplus.com/as/o/jn2klj" 
                target="_blank" 
                rel="noopener noreferrer"
                 className="flex-1 text-white p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                Click Here To Copy Your Link & Start Selling
              </Link>
              <div className="mt-4">
                <h4 className="text-base">
                  Need Help?{' '}
                  <Link
                    to="https://appclick.convertri.com/support" 
                    target="_blank" 
                    rel="noopener noreferrer"
                     className="flex-1 text-white p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    Click Here To Contact Support
                  </Link>
                </h4>
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

export default FranchiseDashboard
