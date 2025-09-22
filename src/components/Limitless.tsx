import { motion } from 'framer-motion';
import { Plus, Search, Filter, BarChart3, Users, Globe, Settings, LogOut, Sparkles, Edit3, Eye, Calendar, ExternalLink, Trash2, Home, FolderOpen, CreditCard, TrendingUp, HelpCircle, Bell } from 'lucide-react';
import SideBar from "./SideBar"
import Header from './Header';
import { Link } from 'react-router-dom';

const Limitless = () => {
  return (
    <>
    <div className="min-h-screen  bg-slate-50 text-gray-500">
      <div className="flex">
      <SideBar/>
  <main className="flex-1">
          {/* Header */}
       <Header title='Limitless'/>
    <div className="w-full max-w-[1400px] mx-auto font-sans mt-8 px-8">  
        <div className="space-y-8">
          {/* Traffic Booster Method #1 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-bold mb-6">Traffic Booster Method #1</h3>
            <div className="space-y-4">
              <p className="flex items-center gap-2">
                <span className="font-semibold">Step 1 - </span>
                <Link 
                  to="https://www.addtoany.com/share" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Click Here To Start Driving Traffic
                </Link>
              </p>
              <p>
                <span className="font-semibold">Step 2 - </span>
                <span>Paste your Sales Engine URL & Share on Multiple Platforms</span>
              </p>
              <div className="mt-6">
                <img 
                  src="https://mybrainboxapp.com/images/login2.jpeg" 
                  alt="AddToAny sharing platform" 
                  className="max-w-4xl w-full object-contain rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Traffic Booster Method #2 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-bold mb-6">Traffic Booster Method #2</h3>
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Step 1 - </span>
                <span>Grab Your Facebook & Google Pixel</span>
              </p>
              <p>
                <span className="font-semibold">Step 2 - </span>
                <span>Send The Pixel Code To Our Support Desk</span>{' '}
                <Link 
                  to="https://appclick.convertri.com/support" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  (Click Here To Contact Support Desk.)
                </Link>
              </p>
              <p className="text-red-900 italic">
                (Note - Include your traffic booster purchase receipt in the ticket).
              </p>
              <p>
                <span className="font-semibold">Step 3 - </span>
                <span>We Will Implement Within 48 Hours & You Should See Your Pixels Fired Up With Activity.</span>
              </p>
            </div>
          </div>

          {/* Traffic Booster Method #3 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-bold mb-6">Traffic Booster Method #3</h3>
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Step - </span>
                <Link 
                  to="http://www.usnetads.com/post/post-free-ads.php" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Click here to Post Free Targeted Ads & Generate Traffic
                </Link>
              </p>
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

export default Limitless
