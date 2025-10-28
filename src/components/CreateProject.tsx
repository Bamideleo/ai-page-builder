import React, { useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Sparkles, ArrowRight, Lightbulb, Zap, Globe, ShoppingBag, User as UserIcon, GraduationCap, Heart } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import {SamplePrompt, Project, Page } from '../types';
import { Link, useNavigate } from "react-router-dom";
import { isUserDetails } from '../utils/auth';
import logoI from "../asset/Icon.png";
interface CreateProjectProps {
  onCreateProject: (prompt: string) => void;
}





export const CreateProject: React.FC<CreateProjectProps> = ({ onCreateProject }) => {
  const [prompt, setPrompt] = useState('');
  const [user, setUser] = useState(isUserDetails);
  const [placeholderText, setPlaceholderText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('auth');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const samplePrompts: SamplePrompt[] = [
    {
      id: '1',
      title: 'E-commerce',
      description: ' Build a luxury modern eCommerce website',
      category: 'ecommerce',
      prompt_text: ' Build a luxury modern eCommerce website that sells wristwatch, fashion, shoes, bags, cloth and accessories. Include editorial-style product grids, hover-zoom effects, size and color filters, and automatic discount highlights. Make it modern, elegant, and conversion-focused.',
      is_active: true
    },
       {
      id: '2',
      title: 'Netflix',
      description: 'Clone the Netflix website with the exact layout',
      category: 'blog',
      prompt_text: 'Clone the Netflix website with the exact layout',
      is_active: true
    },
    {
      id: '5',
      title: 'Portfolio',
      description: 'Professional portfolio with projects and contact form',
      category: 'portfolio',
      prompt_text: 'Build a stunning portfolio website showing my work as a baker and event decorator — with a beautiful hero section, about me, event gallery, skills, testimonials, pricing table, and a contact form for bookings. Make it elegant, colorful, and classy.',
      is_active: true
    },
    {
      id: '3',
      title: 'Sales Page',
      description: 'Create a high-converting sales page',
      category: 'saas',
      prompt_text: 'Create a high-converting sales page to sell my Omni-Fat Burner weight loss product.',
      is_active: true
    },
    {
      id: '4',
      title: 'E-Learning Platform',
      description: 'Build a modern online learning website like Udemy or Coursera',
      category: 'education',
      prompt_text: 'Build a modern online learning website like Udemy or Coursera, with a clean homepage, course listings, instructor profiles, student testimonials, and a contact or enrollment section. Make it professional, responsive, and education-focused.',
      is_active: true
    },
    {
      id: '6',
      title: 'Real Estate Website',
      description: 'Create a live cinematic showcase site with fullscreen galleries',
      category: 'business',
      prompt_text: 'Create a live cinematic showcase site with fullscreen galleries, 3D property previews, and agent profiles',
      is_active: true
    }
  ];
const fullPlaceholder = "Create a modern eCommerce website that sells Rolex premium watches. Clone Netflix website, Create a landing page for a luxury real estate agency in Dubai, Build a stunning portfolio website, Design a social media platform.";
    

  useEffect(() => {
    if (transcript) {
      setPrompt(transcript);
    }

   if (currentIndex < fullPlaceholder.length) {
      const timeout = setTimeout(() => {
        setPlaceholderText(fullPlaceholder.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50); // Speed of typing (50ms per character)
      
      return () => clearTimeout(timeout);
    } else {
      // Optional: Reset and loop the animation
      const resetTimeout = setTimeout(() => {
        setCurrentIndex(0);
        setPlaceholderText('');
      }, 3000); // Wait 3 seconds before restarting
      
      return () => clearTimeout(resetTimeout);
    }

  }, [transcript, currentIndex]);

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

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
  
      // setCurrentProject(newProject);
      // setCurrentPrompt(prompt);
      setProjects(prev => [newProject, ...prev]);
     
     
      
      navigate('/workspace', { state: { project:newProject, prompt:prompt} })
      
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    handleCreateProject(prompt);
  };

  const handleSamplePromptClick = (samplePrompt: SamplePrompt) => {
    setPrompt(samplePrompt.prompt_text);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ecommerce': return ShoppingBag;
      case 'portfolio': return UserIcon;
      case 'saas': return Zap;
      case 'education': return GraduationCap;
      case 'blog': return Globe;
      case 'business': return Heart;
      default: return Lightbulb;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ecommerce': return 'from-green-400 to-emerald-500';
      case 'portfolio': return 'from-blue-400 to-cyan-500';
      case 'saas': return 'from-purple-400 to-pink-500';
      case 'education': return 'from-orange-400 to-red-500';
      case 'blog': return 'from-indigo-400 to-purple-500';
      case 'business': return 'from-rose-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen  bg-slate-50 text-gray-500">
      {/* Header */}
      <header className="border-b bg-slate-900 text-white  backdrop-blur-sm border-r border-slate-900/10 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/projects"
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              ←
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg flex items-center justify-center">
                <img src={logoI} alt="Logo" />
              </div>
              <h1 className="text-xl font-bold">Create New Project</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-slate-300">
           <img width="25" height="25" src="https://img.icons8.com/3d-fluency/94/user-male-circle.png" alt="user-male-circle"/>
            <span className="capitalize">{user.name}</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
           What would you like to build today?
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
           Simply type or talk your ideas — in any language — into reality.
          </p>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          <i>Kleva AI designs, codes, and launches it instantly.</i>
          </p>
        </motion.div>

        {/* Prompt Input */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={placeholderText}
                className="w-full h-32 px-6 py-4 bg-white/5 backdrop-blur-sm border border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-500 placeholder-slate-500 resize-none text-lg leading-relaxed"
                required
              />
              
              {/* Voice Input Button */}
              {browserSupportsSpeechRecognition && (
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  className={`absolute bottom-4 left-3/4 p-3 rounded-xl transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-white/20 hover:bg-white/20 text-slate-500'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={!prompt.trim() || isGenerating}
                className="absolute bottom-4 right-4 px-6 text-white py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            
            {/* Voice Status */}
            {isListening && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
              >
                <div className="flex items-center space-x-2 text-red-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm">Listening... Speak your idea</span>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Sample Prompts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">
            Or start with a sample prompt
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samplePrompts.map((sample, index) => {
              const IconComponent = getCategoryIcon(sample.category);
              const colorClass = getCategoryColor(sample.category);
              
              return (
                <motion.button
                  key={sample.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => handleSamplePromptClick(sample)}
                  className="group p-6 bg-white rounded-lg shadow-lg backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105 text-left"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${colorClass} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                    {sample.title}
                  </h4>
                  
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {sample.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-cyan-400 text-sm">
                    <span>Use this prompt</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto mt-16 p-8 bg-gradient-to-r from-cyan-200 to-purple-300/10 border border-cyan-500/20 rounded-2xl"
        >
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">💡 Pro Tips for Better Results</h4>
              <ul className="text-gray-500 space-y-2 text-sm">
                <li>• Be specific about your target audience and purpose</li>
                <li>• Mention desired features like contact forms, galleries, or e-commerce</li>
                <li>• Include style preferences (modern, minimalist, colorful, etc.)</li>
                {/* <li>• Specify any integrations needed (payments, social media, analytics)</li> */}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};