import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { motion, AnimatePresence } from 'framer-motion';
import { AuthPage } from './components/AuthPage';
import { CreateProject } from './components/CreateProject';
import { Workspace } from './components/Workspace';
import { Project, Page } from './types';
import Tutorial from './components/Tutorial';
import Projected from './components/Project';
import Limitless from './components/Limitless';
import MultipleIncome from './components/MultipleIncome';
import FranchiseDashboard from './components/FranchiseDashboard';
import ManageUsers from './components/ManageUsers';
import Agency from './components/Agency';
import OTOUpgradeTable from './components/OTOUpgradeTable';
import { ForgetPassword } from './components/ForgetPassword';
import ProfileSetting from './components/ProfileSetting';
import DfyOffer from './components/DfyOffer';
import { ResetPassword } from './components/ResetPassword';
import Template from './components/Template';


function App() {
  const [currentPage, setCurrentPage] = useState<Page>('auth');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);



  const handleCreateProject = (prompt: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      user_id: 'test',
      title: generateProjectTitle(prompt),
      slug: generateSlug(prompt),
      status: 'draft',
      framework: 'vanilla',
      deployment_type: 'slug',
      description: prompt.substring(0, 100) + '...',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setCurrentProject(newProject);
    setCurrentPrompt(prompt);
    setProjects(prev => [newProject, ...prev]);
   
    
  };

  const handleOpenProject = (project: Project) => {
    setCurrentProject(project);
    setCurrentPage('workspace');
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setCurrentPage('editor');
  };

  const generateProjectTitle = (prompt: string): string => {
    const words = prompt.split(' ').slice(0, 3);
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const generateSlug = (prompt: string): string => {
    return prompt
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(' ')
      .slice(0, 3)
      .join('-');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
      <Router>
      <Routes>
        <Route path="/" element={<AuthPage/>} /> 
        <Route
          path="/tutorials"
          element={
            <PrivateRoute>
              <Tutorial/>
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
            <Projected/>
            </PrivateRoute>
          }
        /> 
        
        <Route
          path="/create-project"
          element={
            <PrivateRoute>
            <CreateProject
            onCreateProject={handleCreateProject}
            />
            </PrivateRoute>
          }
        />

         <Route
          path="/hot-dfy-offers"
          element={
            <PrivateRoute>
            <DfyOffer/>
            </PrivateRoute>
          }
        />



          <Route
          path="/workspace"
          element={
            <PrivateRoute>
            <Workspace/>
            </PrivateRoute>
          }
        />
        <Route
          path="/limitless"
          element={
            <PrivateRoute>
              <Limitless/>
            </PrivateRoute>
          }
        />

        <Route
          path="/multiple-income"
          element={
            <PrivateRoute>
              <MultipleIncome/>
            </PrivateRoute>
          }
        />


        <Route
          path="/franchise"
          element={
            <PrivateRoute>
              <FranchiseDashboard/>
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <ManageUsers/>
            </PrivateRoute>
          }
        />

       <Route
          path="/agency"
          element={
            <PrivateRoute>
              <Agency/>
            </PrivateRoute>
          }
        />

          <Route
          path="/profile-settings"
          element={
            <PrivateRoute>
              <ProfileSetting/>
            </PrivateRoute>
          }
        />

         <Route
          path="/Upgrade"
          element={
            <PrivateRoute>
              <OTOUpgradeTable/>
            </PrivateRoute>
          }
        />

        <Route
          path="/forget-password"
          element={
              <ForgetPassword/>
          }
        />

        <Route
          path="/reset-password"
          element={
              <ResetPassword/>
          }
        />


      <Route
          path="/template"
          element={
              <Template/>
          }
        />


      </Routes>
      
    </Router>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;