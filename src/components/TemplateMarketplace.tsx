import React, { useState } from 'react';
import { User, Project } from '../App';
import { ArrowLeft, Search, Filter, Star, Download, Eye, Crown, Zap, ShoppingBag, Briefcase, User as UserIcon, Heart } from 'lucide-react';

interface TemplateMarketplaceProps {
  user: User;
  onBack: () => void;
  onSelectTemplate: (project?: Project) => void;
}

export const TemplateMarketplace: React.FC<TemplateMarketplaceProps> = ({ user, onBack, onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Templates', icon: Star },
    { id: 'portfolio', label: 'Portfolio', icon: UserIcon },
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingBag },
    { id: 'saas', label: 'SaaS', icon: Zap },
    { id: 'landing', label: 'Landing Page', icon: Crown },
  ];

  const templates = [
    {
      id: '1',
      title: 'Modern Portfolio',
      category: 'portfolio',
      premium: false,
      rating: 4.8,
      downloads: '2.3k',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Clean and modern portfolio template perfect for designers and developers.'
    },
    {
      id: '2',
      title: 'SaaS Landing Pro',
      category: 'saas',
      premium: true,
      rating: 4.9,
      downloads: '1.8k',
      thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'High-converting SaaS landing page with pricing tables and testimonials.'
    },
    {
      id: '3',
      title: 'E-commerce Store',
      category: 'ecommerce',
      premium: true,
      rating: 4.7,
      downloads: '3.1k',
      thumbnail: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Complete e-commerce solution with cart, checkout, and payment integration.'
    },
    {
      id: '4',
      title: 'Corporate Business',
      category: 'business',
      premium: false,
      rating: 4.6,
      downloads: '1.5k',
      thumbnail: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Professional corporate website template with team and services sections.'
    },
    {
      id: '5',
      title: 'Creative Agency',
      category: 'portfolio',
      premium: true,
      rating: 4.9,
      downloads: '2.7k',
      thumbnail: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Bold and creative agency template with stunning animations and effects.'
    },
    {
      id: '6',
      title: 'Startup Landing',
      category: 'landing',
      premium: false,
      rating: 4.8,
      downloads: '4.2k',
      thumbnail: 'https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Perfect landing page for startups with hero section and feature highlights.'
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-slate-900/90 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">Template Marketplace</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-slate-400 w-64"
              />
            </div>
            <button className="p-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              {/* Template Preview */}
              <div className="relative aspect-video bg-slate-800 overflow-hidden">
                <img 
                  src={template.thumbnail} 
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                  <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => onSelectTemplate()}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    Use Template
                  </button>
                </div>

                {/* Premium Badge */}
                {template.premium && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center space-x-1 text-xs font-semibold">
                    <Crown className="w-3 h-3" />
                    <span>Pro</span>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors">
                    {template.title}
                  </h3>
                  <button className="p-1 hover:text-red-400 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>{template.downloads}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {template.premium ? (
                      <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded text-xs font-semibold text-black">
                        Pro Only
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold">
                        Free
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-400 mb-4">No templates found</p>
            <p className="text-sm text-slate-500">
              Try adjusting your search or category filter
            </p>
          </div>
        )}

        {/* Upgrade CTA for Free Users */}
        {user.plan === 'free' && (
          <div className="mt-12 p-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl text-center">
            <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Unlock Premium Templates</h3>
            <p className="text-slate-300 mb-6">
              Get access to our entire collection of premium templates and advanced features.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              Upgrade to Pro
            </button>
          </div>
        )}
      </div>
    </div>
  );
};