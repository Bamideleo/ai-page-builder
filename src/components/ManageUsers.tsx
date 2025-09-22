
import { Plus, Search, Edit,  Trash2} from 'lucide-react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import SideBar from "./SideBar"
import Header from './Header';
import { useState } from 'react';



const ManageUsers = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [formData, setFormData] = useState({
    name:  '',
    email: '',
    password: '',
    otoAccess: {
      oto1: true,
      oto2: true,
      oto3: true,
      oto4: false,
      oto5: false,
      oto6: false,
      oto7: false,
      oto8: false
    }
  });

  const users = [
    {
      id: 1,
      username: 'Seun Admin',
      email: 'uuaineji@spacehotline.com',
      role: 'user',
      createdAt: 'Jun 18, 2022, 1:19 AM'
    },
    {
      id: 2,
      username: 'Demo App',
      email: 'test@gmail.com',
      role: 'user',
      createdAt: 'Dec 19, 2023, 12:24 PM'
    },
    {
      id: 3,
      username: 'Admin',
      email: 'appclicktech@gmail.com',
      role: 'admin',
      createdAt: 'Dec 24, 2023, 10:13 PM'
    },
    {
      id: 4,
      username: 'Vincent Oladimeji',
      email: 'v@gmail.com',
      role: 'user',
      createdAt: 'Jan 30, 2025, 9:58 AM'
    },
    {
      id: 5,
      username: 'test superai',
      email: 'supperai@gmail.com',
      role: 'user',
      createdAt: 'Apr 29, 2025, 1:53 PM'
    },
    {
      id: 6,
      username: 'dex',
      email: 'demoandtest111@gmail.com',
      role: 'user',
      createdAt: 'Apr 29, 2025, 3:30 PM'
    },
    {
      id: 7,
      username: 'Seyi Adeleke',
      email: 'oluwaseyifunmi111@gmail.com',
      role: 'user',
      createdAt: 'May 3, 2025, 2:21 PM'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (userId: string) => {
    setOpenEdit(true);
  };

  const handleDelete = (userId: string) => {
    console.log('Delete user:', userId);
  };




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOTOChange = (oto) => {
    setFormData(prev => ({
      ...prev,
      otoAccess: {
        ...prev.otoAccess,
        [oto]: !prev.otoAccess[oto]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated user data:', formData);
    // Handle update logic here
    setOpenEdit(false);
  };


  return (
    <>
     <div className="min-h-screen  bg-slate-50 text-gray-500">
      <div className="flex">
      <SideBar/>
  <main className="flex-1">
          {/* Header */}
       <Header title='Users'/>
      <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
    
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-slate-500">Admin Users</h1>
          <button
            onClick={() => setOpen(true)}
            
            className="gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            Add New User
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full max-w-md pl-10 pr-3 py-3 bg-gray-100 border-0 rounded-lg text-slate-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="text-blue-500 hover:text-blue-700 p-1"
                        title="Edit user"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-6">
          <nav className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-500 rounded-md">
              1
            </button>
            <button className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              2
            </button>
            <span className="px-3 py-2 text-sm text-gray-500">...</span>
            <button className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              85
            </button>
            <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>


 <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto shadow-xl">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-slate-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
             
                    
                 <div className="p-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Password (Optional)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* OTO Access */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-3">
                OTO Access
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'oto1', label: 'OTO 1' },
                  { key: 'oto2', label: 'OTO 2' },
                  { key: 'oto3', label: 'OTO 3' },
                  { key: 'oto4', label: 'OTO 4' },
                  { key: 'oto5', label: 'OTO 5' },
                  { key: 'oto6', label: 'OTO 6' },
                  { key: 'oto7', label: 'OTO 7' },
                  { key: 'oto8', label: 'OTO 8' }
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.otoAccess[key]}
                        onChange={() => handleOTOChange(key)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          formData.otoAccess[key]
                            ? 'bg-cyan-500 border-cyan-500'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {formData.otoAccess[key] && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <span className="ml-2 text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
                  
              </div>
              <div className="gap-3 bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
            onClick={handleSubmit}
          className=" bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            Add User
          </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className=" px-4 py-2 text-sm border border-gray-400 rounded-lg hover:bg-black/25 hover:border-bg-black/25  hover:text-white transition-colors"
                >
                  Cancel
                </button>
                
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>



 <Dialog open={openEdit} onClose={setOpenEdit} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto shadow-xl">
           <div className="fixed inset-0 z-10 w-screen overflow-y-auto shadow-xl">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-slate-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
             
                    
                 <div className="p-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Password (Optional)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* OTO Access */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-3">
                OTO Access
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'oto1', label: 'OTO 1' },
                  { key: 'oto2', label: 'OTO 2' },
                  { key: 'oto3', label: 'OTO 3' },
                  { key: 'oto4', label: 'OTO 4' },
                  { key: 'oto5', label: 'OTO 5' },
                  { key: 'oto6', label: 'OTO 6' },
                  { key: 'oto7', label: 'OTO 7' },
                  { key: 'oto8', label: 'OTO 8' }
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.otoAccess[key]}
                        onChange={() => handleOTOChange(key)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          formData.otoAccess[key]
                            ? 'bg-cyan-500 border-cyan-500'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {formData.otoAccess[key] && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <span className="ml-2 text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
                  
              </div>
              <div className="gap-3 bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
            onClick={handleSubmit}
          className=" bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            Update User
          </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpenEdit(false)}
                  className=" px-4 py-2 text-sm border border-gray-400 rounded-lg hover:bg-black/25 hover:border-bg-black/25  hover:text-white transition-colors"
                >
                  Cancel
                </button>
                
              </div>
            </DialogPanel>
          </div>
        </div>
        </div>
      </Dialog>



    </main>
    </div>
    </div>  
    </>
  )
}



export default ManageUsers
