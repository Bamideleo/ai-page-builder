import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { User, Project, Component } from '../types';
import { ArrowLeft, Save, Eye, Share, Mic, MicOff, Play, Layers, Type, Image, Square, Grid3X3, Palette, Settings, Undo, Redo, Download } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { aiService } from '../lib/ai';

interface EditorProps {
  user: User;
  project: Project;
  onBack: () => void;
}

export const Editor: React.FC<EditorProps> = ({ user, project, onBack }) => {
  const [isPreview, setIsPreview] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [components, setComponents] = useState<Component[]>([]);
  const [voiceCommand, setVoiceCommand] = useState('');
  const canvasRef = useRef<HTMLDivElement>(null);

  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const componentTypes = [
    { id: 'header', icon: Type, label: 'Header', color: 'from-blue-400 to-cyan-500' },
    { id: 'text', icon: Type, label: 'Text', color: 'from-green-400 to-emerald-500' },
    { id: 'image', icon: Image, label: 'Image', color: 'from-purple-400 to-pink-500' },
    { id: 'button', icon: Square, label: 'Button', color: 'from-orange-400 to-red-500' },
    { id: 'grid', icon: Grid3X3, label: 'Grid', color: 'from-indigo-400 to-purple-500' },
    { id: 'form', icon: Square, label: 'Form', color: 'from-teal-400 to-cyan-500' },
  ];

  const handleVoiceToggle = async () => {
    if (isListening) {
      stopListening();
      if (transcript) {
        setVoiceCommand(transcript);
        // Process voice command
        const result = await aiService.generateFromVoice(transcript);
        console.log('Voice command result:', result);
        resetTranscript();
      }
    } else {
      resetTranscript();
      startListening();
    }
  };

  const addComponent = (componentType: string) => {
    const newComponent: Component = {
      id: Date.now().toString(),
      project_id: project.id,
      type: componentType as any,
      position: {
        x: Math.random() * 300,
        y: Math.random() * 200,
        width: 200,
        height: 100
      },
      content: getDefaultContent(componentType),
      styles: getDefaultStyles(componentType),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setComponents(prev => [...prev, newComponent]);
    setSelectedComponent(newComponent.id);
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'header':
        return { text: 'Your Header Text', level: 'h1' };
      case 'text':
        return { text: 'Your text content goes here...' };
      case 'button':
        return { text: 'Click Me', action: 'alert("Button clicked!")' };
      case 'image':
        return { src: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Placeholder image' };
      case 'form':
        return { fields: ['name', 'email', 'message'] };
      default:
        return {};
    }
  };

  const getDefaultStyles = (type: string) => {
    return {
      backgroundColor: '#ffffff',
      color: '#333333',
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    };
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setComponents(items);
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setComponents(prev => prev.map(comp => 
      comp.id === id ? { ...comp, ...updates, updated_at: new Date().toISOString() } : comp
    ));
  };

  const deleteComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  const handleSave = async () => {
    // Simulate saving to database
    console.log('Saving project:', { project, components });
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
    notification.textContent = 'Project saved successfully!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const handleExport = () => {
    // Generate HTML from components
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.slug}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateHTML = () => {
    const componentHTML = components.map(comp => {
      switch (comp.type) {
        case 'header':
          return `<${comp.content.level} style="${stylesToCSS(comp.styles)}">${comp.content.text}</${comp.content.level}>`;
        case 'text':
          return `<p style="${stylesToCSS(comp.styles)}">${comp.content.text}</p>`;
        case 'button':
          return `<button style="${stylesToCSS(comp.styles)}" onclick="${comp.content.action}">${comp.content.text}</button>`;
        case 'image':
          return `<img src="${comp.content.src}" alt="${comp.content.alt}" style="${stylesToCSS(comp.styles)}" />`;
        default:
          return '';
      }
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.title}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    </style>
</head>
<body>
    ${componentHTML}
</body>
</html>`;
  };

  const stylesToCSS = (styles: Record<string, any>) => {
    return Object.entries(styles)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
      .join('; ');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-slate-900/90 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">
            Editing: {project.title}
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Undo className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Redo className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center space-x-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>{isPreview ? 'Edit' : 'Preview'}</span>
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
            <Share className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left Sidebar - Components & Voice */}
        {!isPreview && (
          <aside className="w-80 border-r border-white/10 bg-slate-800/50 backdrop-blur-sm p-6">
            {/* Voice Commands */}
            {browserSupportsSpeechRecognition && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">
                  Voice Commands
                </h3>
                
                <button
                  onClick={handleVoiceToggle}
                  className={`w-full p-4 rounded-lg transition-all flex items-center justify-center space-x-2 ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  <span>{isListening ? 'Stop Listening' : 'Start Voice Command'}</span>
                </button>

                {isListening && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-2 text-red-400">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-sm">Listening for commands...</span>
                    </div>
                    {transcript && (
                      <p className="text-sm text-white mt-2">"{transcript}"</p>
                    )}
                  </motion.div>
                )}

                <div className="mt-4 text-xs text-slate-400">
                  <p>Try saying:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• "Add a header"</li>
                    <li>• "Make the navbar red"</li>
                    <li>• "Add contact form"</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Components Library */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">
                Components
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {componentTypes.map((component) => (
                  <motion.button
                    key={component.id}
                    onClick={() => addComponent(component.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all flex flex-col items-center space-y-2"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${component.color} rounded-lg flex items-center justify-center`}>
                      <component.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">{component.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Layers Panel */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide flex items-center space-x-2">
                <Layers className="w-4 h-4" />
                <span>Layers</span>
              </h3>
              
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="layers">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {components.map((component, index) => (
                        <Draggable key={component.id} draggableId={component.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 bg-white/5 border border-white/10 rounded-lg text-sm cursor-pointer transition-all ${
                                selectedComponent === component.id ? 'bg-cyan-500/20 border-cyan-500/50' : 'hover:bg-white/10'
                              } ${snapshot.isDragging ? 'opacity-50' : ''}`}
                              onClick={() => setSelectedComponent(component.id)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="capitalize">{component.type}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteComponent(component.id);
                                  }}
                                  className="text-red-400 hover:text-red-300 text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </aside>
        )}

        {/* Canvas */}
        <main className="flex-1 bg-slate-800 p-6">
          <div 
            ref={canvasRef}
            className="h-full bg-white rounded-lg shadow-2xl overflow-hidden relative"
          >
            {isPreview ? (
              <div className="h-full p-8">
                <div className="space-y-6">
                  {components.map((component) => (
                    <div key={component.id} style={component.styles}>
                      {component.type === 'header' && (
                        React.createElement(
                          component.content.level,
                          { className: 'text-gray-800' },
                          component.content.text
                        )
                      )}
                      {component.type === 'text' && (
                        <p className="text-gray-600">{component.content.text}</p>
                      )}
                      {component.type === 'button' && (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                          {component.content.text}
                        </button>
                      )}
                      {component.type === 'image' && (
                        <img 
                          src={component.content.src} 
                          alt={component.content.alt}
                          className="max-w-full h-auto rounded"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                {components.length === 0 ? (
                  <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Type className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-slate-800 text-xl font-semibold mb-3">
                      Start Building
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Add components from the sidebar or use voice commands to build your website.
                    </p>
                    <div className="space-y-3">
                      <button 
                        onClick={() => addComponent('header')}
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Add Header
                      </button>
                      <button 
                        onClick={() => addComponent('text')}
                        className="w-full py-2 px-4 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Add Text
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full p-8 space-y-6">
                    {components.map((component) => (
                      <motion.div
                        key={component.id}
                        className={`relative p-4 border-2 border-dashed transition-all cursor-pointer ${
                          selectedComponent === component.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setSelectedComponent(component.id)}
                        style={component.styles}
                      >
                        {component.type === 'header' && (
                          React.createElement(
                            component.content.level,
                            { className: 'text-gray-800' },
                            component.content.text
                          )
                        )}
                        {component.type === 'text' && (
                          <p className="text-gray-600">{component.content.text}</p>
                        )}
                        {component.type === 'button' && (
                          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            {component.content.text}
                          </button>
                        )}
                        {component.type === 'image' && (
                          <img 
                            src={component.content.src} 
                            alt={component.content.alt}
                            className="max-w-full h-auto rounded"
                          />
                        )}
                        
                        {selectedComponent === component.id && (
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs cursor-pointer hover:bg-red-600"
                               onClick={(e) => {
                                 e.stopPropagation();
                                 deleteComponent(component.id);
                               }}>
                            ×
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar - Properties */}
        {!isPreview && selectedComponent && (
          <aside className="w-80 border-l border-white/10 bg-slate-800/50 backdrop-blur-sm p-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Properties</span>
            </h3>
            
            {(() => {
              const component = components.find(c => c.id === selectedComponent);
              if (!component) return null;

              return (
                <div className="space-y-6">
                  {/* Content Properties */}
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Content</label>
                    {component.type === 'header' && (
                      <>
                        <input 
                          type="text" 
                          value={component.content.text}
                          onChange={(e) => updateComponent(component.id, {
                            content: { ...component.content, text: e.target.value }
                          })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm mb-2"
                        />
                        <select
                          value={component.content.level}
                          onChange={(e) => updateComponent(component.id, {
                            content: { ...component.content, level: e.target.value }
                          })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                        >
                          <option value="h1">H1</option>
                          <option value="h2">H2</option>
                          <option value="h3">H3</option>
                        </select>
                      </>
                    )}
                    {component.type === 'text' && (
                      <textarea 
                        value={component.content.text}
                        onChange={(e) => updateComponent(component.id, {
                          content: { ...component.content, text: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm h-20 resize-none"
                      />
                    )}
                    {component.type === 'button' && (
                      <input 
                        type="text" 
                        value={component.content.text}
                        onChange={(e) => updateComponent(component.id, {
                          content: { ...component.content, text: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                      />
                    )}
                  </div>
                  
                  {/* Style Properties */}
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Background Color</label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-8 h-8 rounded border border-white/20 cursor-pointer"
                        style={{ backgroundColor: component.styles.backgroundColor }}
                      />
                      <input 
                        type="text" 
                        value={component.styles.backgroundColor}
                        onChange={(e) => updateComponent(component.id, {
                          styles: { ...component.styles, backgroundColor: e.target.value }
                        })}
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Text Color</label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-8 h-8 rounded border border-white/20 cursor-pointer"
                        style={{ backgroundColor: component.styles.color }}
                      />
                      <input 
                        type="text" 
                        value={component.styles.color}
                        onChange={(e) => updateComponent(component.id, {
                          styles: { ...component.styles, color: e.target.value }
                        })}
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Padding</label>
                    <input 
                      type="text" 
                      value={component.styles.padding}
                      onChange={(e) => updateComponent(component.id, {
                        styles: { ...component.styles, padding: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Border Radius</label>
                    <input 
                      type="text" 
                      value={component.styles.borderRadius}
                      onChange={(e) => updateComponent(component.id, {
                        styles: { ...component.styles, borderRadius: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                    />
                  </div>
                </div>
              );
            })()}
          </aside>
        )}
      </div>
    </div>
  );
};