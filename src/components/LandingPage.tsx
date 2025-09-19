import React, { useState, useEffect } from 'react';
import { Sparkles, Mic, Code, Globe, Zap, Users, Shield, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"
          style={{
            right: mousePosition.x / 15,
            bottom: mousePosition.y / 15,
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AIBuilder
          </span>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={onLogin}
            className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
          >
            Login
          </button>
          <button 
            onClick={onGetStarted}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Build Apps with
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"> AI Magic</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create stunning websites, web apps, and mobile apps instantly. Just type or speak your idea, 
            and watch AI transform it into reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Start Building</span>
            </button>
            <button className="px-8 py-4 border border-white/20 rounded-xl text-lg font-semibold backdrop-blur-sm hover:bg-white/5 transition-all duration-300 flex items-center justify-center space-x-2">
              <Mic className="w-5 h-5" />
              <span>Try Voice Mode</span>
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {[
            {
              icon: Code,
              title: "AI-Powered Generation",
              description: "Describe your app in plain English and watch AI generate complete projects with modern frameworks."
            },
            {
              icon: Globe,
              title: "Instant Deployment",
              description: "Publish your creations with custom domains, subdomains, or slugs. SSL certificates included automatically."
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description: "Work together in real-time with your team. Assign roles, manage permissions, and collaborate seamlessly."
            }
          ].map((feature, index) => (
            <div key={index} className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <feature.icon className="w-12 h-12 text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                features: ["1 Project", "Slug Deployment", "Basic Templates", "Community Support"],
                popular: false
              },
              {
                name: "Pro",
                price: "$29",
                features: ["Unlimited Projects", "Custom Subdomains", "Premium Templates", "Priority Support", "Team Collaboration"],
                popular: true
              },
              {
                name: "Enterprise",
                price: "$99",
                features: ["Everything in Pro", "Custom Domains", "White Label", "Advanced Analytics", "Dedicated Support"],
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`relative p-8 bg-white/5 backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:scale-105 ${plan.popular ? 'border-cyan-400 shadow-xl shadow-cyan-500/25' : 'border-white/10'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-300">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={onGetStarted}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/25' 
                      : 'border border-white/20 hover:bg-white/5'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { icon: TrendingUp, value: "50K+", label: "Apps Created" },
            { icon: Users, value: "10K+", label: "Active Users" },
            { icon: Globe, value: "99.9%", label: "Uptime" },
            { icon: Shield, value: "100%", label: "Secure" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-slate-300">{stat.label}</div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-sm p-6 text-center text-slate-400">
        <p>&copy; 2025 AIBuilder. Powered by AI, built for creators.</p>
      </footer>
    </div>
  );
};