import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/auth";
import { setToken } from "../utils/auth";


export const AuthPage = () => {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call


    // Mock successful authentication
    try {
      const res = await loginApi(formData.email, formData.password);
      setToken(res.token);
      navigate("/tutorials");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: '10%', top: '10%' }}
        />
        <motion.div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ right: '10%', bottom: '10%' }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        {/* Auth Form */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                isLogin 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                !isLogin 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
              {/* for error message */}
               {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-slate-400 transition-all"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-slate-400 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-slate-400 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center space-x-2 text-slate-300">
                  <input type="checkbox" className="rounded border-white/20 bg-white/5" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};