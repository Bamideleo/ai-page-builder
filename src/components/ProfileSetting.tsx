import {useState} from 'react';
import SideBar from './SideBar'
import Header from './Header'
import { Eye, EyeOff } from 'lucide-react';




const ProfileSetting = () => {
  const [basicDetails, setBasicDetails] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: 'appclicktech@gmail.com'
  });

  const [securityDetails, setSecurityDetails] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const handleBasicDetailsChange = (field, value) => {
    setBasicDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurityDetails(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleBasicDetailsSave = () => {
    console.log('Saving basic details:', basicDetails);
    // Handle save logic here
  };

  const handleSecuritySave = () => {
    console.log('Saving security details:', securityDetails);
    // Handle password change logic here
  };
  return (
    <>
    <div className="min-h-screen  bg-slate-50 text-gray-500">
      <div className="flex">
      <SideBar/>
  <main className="flex-1">
          {/* Header */}
       <Header title='Profile Settings'/>

    <div className="max-w-2xl mx-auto p-6 bg-white">
      {/* Basic Details Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Basic details</h2>
        <p className="text-gray-600 mb-6">Your profile details, this can be changed anytime</p>
        
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Firstname"
              value={basicDetails.firstname}
              onChange={(e) => handleBasicDetailsChange('firstname', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500"
            />
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Lastname"
              value={basicDetails.lastname}
              onChange={(e) => handleBasicDetailsChange('lastname', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500"
            />
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Username"
              value={basicDetails.username}
              onChange={(e) => handleBasicDetailsChange('username', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={basicDetails.email}
              onChange={(e) => handleBasicDetailsChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
            />
          </div>
        </div>
        
        <button
          onClick={handleBasicDetailsSave}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Changes
        </button>
      </div>

      {/* Security Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Security</h2>
        <p className="text-gray-600 mb-6">Change your account password here</p>
        
        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPasswords.old ? "text" : "password"}
              placeholder="Old Password"
              value={securityDetails.oldPassword}
              onChange={(e) => handleSecurityChange('oldPassword', e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('old')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white hover:text-gray-600"
            >
              {showPasswords.old ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="relative">
            <input
              type={showPasswords.new ? "text" : "password"}
              placeholder="New Password"
              value={securityDetails.newPassword}
              onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="relative">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={securityDetails.confirmPassword}
              onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <button
          onClick={handleSecuritySave}
           className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Changes
        </button>
      </div>
    </div>

    </main>
    </div>
    </div> 
    </>
  )
}

export default ProfileSetting
