import { useEffect, useState } from 'react';
import { Plus, Search, Edit,  Trash2} from 'lucide-react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import SideBar from "./SideBar"
import Header from './Header';
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom";
import { allUsers, editUser, updateUser, CreateUser, deleteUser } from '../api/auth';




const ManageUsers = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoader, setisLoader] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null);


  const [formData, setFormData] = useState({
    name:  '',
    email: '',
    password: '',
    oto1: 0,
    oto2: 0,
    oto3: 0,
    oto4: 0,
    oto5: 0,
    oto6: 0,
    oto7: 0,
    oto8: 0
 
  });

  const fetchUsers = async () => {
    try {
      const res = await allUsers();
      setUsers(res.users);
    } catch (err) {
      console.error("Failed to fetch users details:", err);
    }
  ;
  };

  useEffect(()=>{
  setIsLoading(false)
  fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
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


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setSelectedUser((prev: any) => ({
    ...prev,
    [name]: value, // dynamically update field by name
  }));
};



  const handleSubmit = async (e: any) => {
    e.preventDefault();
     setisLoader(true);
      try {
              const res = await updateUser(selectedUser.id, selectedUser.name, 
                selectedUser.email, selectedUser.oto_1
              , selectedUser.oto_2, selectedUser.oto_3,
               selectedUser.oto_4, selectedUser.oto_5
              , selectedUser.oto_6, selectedUser.oto_7
            , selectedUser.oto_8, selectedUser.password);
              const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
              }
              });
              Toast.fire({
              icon: "success",
              title: res.message
              });
            
        
            } catch (err: any) {
              const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
              }
              });
              Toast.fire({
              icon: "error",
              title: err.message
              });
            }


    // Handle update logic here
    setOpenEdit(false);
    setisLoader(false);
  };

  const handleEdit = async (userId: string) => {
    try {
      const res = await editUser(userId);
      setSelectedUser(res.user);
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    }
    setOpenEdit(true);
  };


const handleAddUser = async (e: React.FormEvent) => {
  e.preventDefault();
  setisLoader(true);

  try {
    const res = await CreateUser(
      formData.name,
      formData.email,
      formData.password,
      formData.oto1,
      formData.oto2,
      formData.oto3,
      formData.oto4,
      formData.oto5,
      formData.oto6,
      formData.oto7,
      formData.oto8
    );

    Swal.fire({
      toast: true,
      icon: "success",
      title: res.message,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });

    // reset form after success
    setFormData({
      name: '',
      email: '',
      password: '',
      oto1: 0, oto2: 0, oto3: 0, oto4: 0,
      oto5: 0, oto6: 0, oto7: 0, oto8: 0,
    });

  } catch (err: any) {
    Swal.fire({
      toast: true,
      icon: "error",
      title: err.message,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  setisLoader(false);
  setOpen(false);
};


  const handleDelete = async (userId: string) => {
    try {
    const res = await deleteUser(userId);
    Swal.fire({
      toast: true,
      icon: "success",
      title: res.message,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });

  
  } catch (err: any) {
    Swal.fire({
      toast: true,
      icon: "error",
      title: err.message,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  fetchUsers();
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
            onChange={handleFilterChange}
            className="block w-full max-w-md pl-10 pr-3 py-3 bg-gray-100 border-0 rounded-lg text-slate-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        {/* Table */}
        {isLoading?
         <div className="flex-1 p-6">
        
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-300">Fetching your users...</p>
                        <p className="text-sm text-slate-400 mt-2">
                          Processing...
                        </p>
                      </div>
                    </div>
          </div> 
        : 
        <>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
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
          

            {currentItems.length > 0 ?(

              currentItems.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">
                    {user.name}
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
                    {new Date(user.created_at).toDateString()}
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
              )))
            : 
          (
          <li className="p-2 text-gray-500">No results found</li>
          )
            }
            </tbody>
          </table>
        </div>
       
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
        </>
         }
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
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Password 
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              {/* OTO checkboxes */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-3">
                  OTO Access
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 8 }, (_, i) => {
                    const key = `oto${i + 1}` as keyof typeof formData;
                    return (
                      <label
                        key={key}
                        className="flex items-center cursor-pointer"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={formData[key] === 1}
                            onChange={() =>
                              setFormData((prev) => ({
                                ...prev,
                                [key]: prev[key] === 1 ? 0 : 1,
                              }))
                            }
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors 
                              ${
                                formData[key] === 1
                                  ? "bg-cyan-500 border-cyan-500"
                                  : "bg-white border-gray-300"
                              }
                            `}
                          >
                            {formData[key] === 1 && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <span className="ml-2 text-sm text-gray-700">
                          OTO {i + 1}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="gap-3 bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            onClick={handleAddUser}
            disabled={isLoader}
            className=" bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
             {isLoader? 
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              :
               'Add User'
            }
            
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
                value={selectedUser?.name ||''}
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
                value={selectedUser?.email ||''}
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
               value={selectedUser?.password || ''}
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
               
     <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={selectedUser?.oto_1 === 1}
          onChange={
       
            () =>
        setSelectedUser((prev: any) => ({
          ...prev,
          oto_1: prev.oto_1 === 1 ? 0 : 1,
      }))

          }
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors 
            ${selectedUser?.oto_1 === 1
               ? 'bg-cyan-500 border-cyan-500'
                : 'bg-white border-gray-300'
             }
          `}
        >
          {selectedUser?.oto_1 === 1 && <div className="w-2 h-2 bg-white rounded-full"></div>}
        </div>
      </div>
      <span className="ml-2 text-sm text-gray-700">OTO 1</span>
    </label>

      <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={selectedUser?.oto_2}
          onChange={
            () =>
        setSelectedUser((prev: any) => ({
          ...prev,
          oto_2: prev.oto_2 === 1 ? 0 : 1,
      }))
      }
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors 
            ${selectedUser?.oto_2 ===1 
               ? 'bg-cyan-500 border-cyan-500'
                : 'bg-white border-gray-300'
             }
          `}
        >
          {selectedUser?.oto_2 ===1 && <div className="w-2 h-2 bg-white rounded-full"></div>}
        </div>
      </div>
      <span className="ml-2 text-sm text-gray-700">OTO 2</span>
    </label>

      <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={selectedUser?.oto_3 === 1}
          onChange={
             () =>
        setSelectedUser((prev: any) => ({
          ...prev,
          oto_3: prev.oto_3 === 1 ? 0 : 1,
      }))
          }
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors 
            ${selectedUser?.oto_3 === 1
               ? 'bg-cyan-500 border-cyan-500'
                : 'bg-white border-gray-300'
             }
          `}
        >
          {selectedUser?.oto_3 === 1 && <div className="w-2 h-2 bg-white rounded-full"></div>}
        </div>
      </div>
      <span className="ml-2 text-sm text-gray-700">OTO 3</span>
    </label>

      <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={selectedUser?.oto_4 ===1 }
          onChange={
              () =>
        setSelectedUser((prev: any) => ({
          ...prev,
          oto_4: prev.oto_4 === 1 ? 0 : 1,
      }))
          }
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors 
            ${selectedUser?.oto_4 === 1 
               ? 'bg-cyan-500 border-cyan-500'
                : 'bg-white border-gray-300'
             }
          `}
        >
          {selectedUser?.oto_4 === 1 && <div className="w-2 h-2 bg-white rounded-full"></div>}
        </div>
      </div>
      <span className="ml-2 text-sm text-gray-700">OTO 4</span>
    </label>


      <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={selectedUser?.oto_5 === 1}
          onChange={
              () =>
        setSelectedUser((prev: any) => ({
          ...prev,
          oto_5: prev.oto_5 === 1 ? 0 : 1,
      }))
          }
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors 
            ${selectedUser?.oto_5 === 1
               ? 'bg-cyan-500 border-cyan-500'
                : 'bg-white border-gray-300'
             }
          `}
        >
          {selectedUser?.oto_5 === 1 && <div className="w-2 h-2 bg-white rounded-full"></div>}
        </div>
      </div>
      <span className="ml-2 text-sm text-gray-700">OTO 5</span>
    </label>


      <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={selectedUser?.oto_6 === 1}
          onChange={
             () =>
        setSelectedUser((prev: any) => ({
          ...prev,
          oto_6: prev.oto_6 === 1 ? 0 : 1,
      }))
          }
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors 
            ${selectedUser?.oto_6 === 1
               ? 'bg-cyan-500 border-cyan-500'
                : 'bg-white border-gray-300'
             }
          `}
        >
          {selectedUser?.oto_6 === 1 && <div className="w-2 h-2 bg-white rounded-full"></div>}
        </div>
      </div>
      <span className="ml-2 text-sm text-gray-700">OTO 6</span>
    </label>


      <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={selectedUser?.oto_7 === 1}
          onChange={
               () =>
        setSelectedUser((prev: any) => ({
          ...prev,
          oto_7: prev.oto_7 === 1 ? 0 : 1,
      }))
          }
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors 
            ${selectedUser?.oto_7 === 1
               ? 'bg-cyan-500 border-cyan-500'
                : 'bg-white border-gray-300'
             }
          `}
        >
          {selectedUser?.oto_7 === 1 && <div className="w-2 h-2 bg-white rounded-full"></div>}
        </div>
      </div>
      <span className="ml-2 text-sm text-gray-700">OTO 7</span>
    </label>


      <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={selectedUser?.oto_8 === 1}
          onChange={
            () =>
        setSelectedUser((prev: any) => ({
          ...prev,
          oto_8: prev.oto_8 === 1 ? 0 : 1,
      }))

          }
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors 
            ${selectedUser?.oto_8 === 1
               ? 'bg-cyan-500 border-cyan-500'
                : 'bg-white border-gray-300'
             }
          `}
        >
          {selectedUser?.oto_8 === 1 && <div className="w-2 h-2 bg-white rounded-full"></div>}
        </div>
      </div>
      <span className="ml-2 text-sm text-gray-700">OTO 8</span>
    </label>

    
              </div>
            </div>
          </div>
        </div>
                  
              </div>
              <div className="gap-3 bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
            onClick={handleSubmit}
            disabled={isLoader}
          className=" bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            {isLoader? 
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              :
               'Update User'
            }
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
