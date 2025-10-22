import { useState } from 'react';
import { Eye, Check, MapPin, Calendar } from 'lucide-react';
import SideBar from './SideBar';
import Header from './Header';

export default function Template() {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [previewEvent, setPreviewEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: "Chatbots And Virtual Assistants",
      category: "IMMERSIVE",
      date: "2024-03-16",
      location: "4821 RIDGE TOP CIR, ANCHORAGE",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Modern Marketing Summit Sydney",
      category: "HIGH QUALITY",
      date: "2023-11-08",
      location: "4821 RIDGE TOP, LOS ANGELES CTY",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Registration For Opening Workshop",
      category: "CONCENTRATED",
      date: "2023-11-21",
      location: "314 AIME AVE, WHITEMAN",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop"
    },
    {
      id: 4,
      title: "How Immersive is Revitalising The Cultural...",
      category: "IMMERSIVE",
      date: "2021-11-29",
      location: "4821 RIDGE TOP CIR, ANCHORAGE",
      image: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Machine Learning Night Fastly Part 2",
      category: "LEARNING",
      date: "2023-11-11",
      location: "3536 PICNIC AVE, ANCHORAGE",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"
    },
    {
      id: 6,
      title: "Mac'Excellent partnering France Pavillon",
      category: "CONFERENCE",
      date: "2023-11-11",
      location: "706 MAPLELEAF CT, SJL, ANCHORAGE",
      image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&h=400&fit=crop"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'IMMERSIVE': 'bg-purple-600',
      'HIGH QUALITY': 'bg-purple-600',
      'CONCENTRATED': 'bg-purple-600',
      'LEARNING': 'bg-purple-600',
      'CONFERENCE': 'bg-purple-600'
    };
    return colors[category] || 'bg-purple-600';
  };

  const toggleSelect = (eventId) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const openPreview = (event) => {
    setPreviewEvent(event);
  };

  const closePreview = () => {
    setPreviewEvent(null);
  };

  return (
    <div className="min-h-screen  bg-slate-50 text-gray-500">
      <div className="flex">
      <SideBar/>
  <main className="flex-1">
          {/* Header */}
       <Header title='Template'/>
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h1>
          <p className="text-gray-600">
            {selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''} selected
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
                selectedEvents.includes(event.id) ? 'ring-4 ring-purple-500' : ''
              }`}
            >
              {/* Image Container with Overlay Icons */}
              <div className="relative group">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* Overlay with Icons */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-4">
                  {/* Eye Icon - Preview */}
                  <button
                    onClick={() => openPreview(event)}
                    className="opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 bg-white text-gray-900 p-3 rounded-full hover:bg-purple-600 hover:text-white shadow-lg"
                    title="Preview"
                  >
                    <Eye size={20} />
                  </button>

                  {/* Check Icon - Select */}
                  <button
                    onClick={() => toggleSelect(event.id)}
                    className={`opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 p-3 rounded-full shadow-lg ${
                      selectedEvents.includes(event.id)
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-900 hover:bg-purple-600 hover:text-white'
                    }`}
                    title={selectedEvents.includes(event.id) ? 'Deselect' : 'Select'}
                  >
                    <Check size={20} />
                  </button>
                </div>

                {/* Selected Badge */}
                {selectedEvents.includes(event.id) && (
                  <div className="absolute top-3 right-3 bg-purple-600 text-white p-2 rounded-full shadow-lg">
                    <Check size={16} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className={`${getCategoryColor(event.category)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                    {event.category}
                  </span>
                  <span className="text-gray-400 text-xs ml-2">{event.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                  {event.title}
                </h3>

                {/* Location */}
                <div className="flex items-start text-gray-500 text-sm">
                  <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0 text-purple-600" />
                  <span className="line-clamp-2">{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {previewEvent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closePreview}
        >
          <div 
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative">
              <img
                src={previewEvent.image}
                alt={previewEvent.title}
                className="w-full h-96 object-cover"
              />
              <button
                onClick={closePreview}
                className="absolute top-4 right-4 bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 shadow-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="mb-4">
                <span className={`${getCategoryColor(previewEvent.category)} text-white text-sm font-semibold px-4 py-2 rounded-full`}>
                  {previewEvent.category}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {previewEvent.title}
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar size={20} className="mr-3 text-purple-600" />
                  <span>{previewEvent.date}</span>
                </div>
                <div className="flex items-start text-gray-600">
                  <MapPin size={20} className="mr-3 mt-0.5 text-purple-600 flex-shrink-0" />
                  <span>{previewEvent.location}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    toggleSelect(previewEvent.id);
                    closePreview();
                  }}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                    selectedEvents.includes(previewEvent.id)
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {selectedEvents.includes(previewEvent.id) ? 'Deselect Event' : 'Select Event'}
                </button>
                <button
                  onClick={closePreview}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
</main>
</div>
</div>
  );
}