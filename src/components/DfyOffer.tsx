import { Link } from "react-router-dom";
import Header from "./Header"
import SideBar from "./SideBar"
import { ExternalLink, Mail, Copy, Globe } from 'lucide-react';
import Swal from "sweetalert2";
const DfyOffer = () => {

 const affiliateProducts = [
    {
      id: 1,
      name: "VAi",
      image: "https://mybrainboxapp.com/images/vai.jpg",
      affiliateLink: "https://warriorplus.com/as/o/nw2jl0"
    },
    {
      id: 2,
      name: "Dzign",
      image: "https://mybrainboxapp.com/images/dzign.jpg",
      affiliateLink: "https://warriorplus.com/as/o/qgycy0"
    },
    {
      id: 3,
      name: "Swirl",
      image: "https://mybrainboxapp.com/images/swirl.png",
      affiliateLink: "https://warriorplus.com/as/o/bg260c"
    },
    {
      id: 4,
      name: "Edge",
      image: "https://mybrainboxapp.com/images/edge.jpg",
      affiliateLink: "https://warriorplus.com/as/o/m2h56f"
    },
    {
      id: 5,
      name: "AI Genius",
      image: "https://mybrainboxapp.com/images/ai-gen.jpg",
      affiliateLink: "https://warriorplus.com/aff-offer/o/n6csmf"
    },
    {
      id: 6,
      name: "Proto",
      image: "https://api.humanaiapp.com/public/images/proto.png",
      affiliateLink: "https://warriorplus.com/as/o/zyqgrm"
    },
    {
      id: 7,
      name: "Vox AI",
      image: "https://mybrainboxapp.com/images/vox-ai.jpg",
      affiliateLink: "https://warriorplus.com/as/o/j8jxhv"
    }
  ];

  const handleCopyLink = (link: any) => {
    navigator.clipboard.writeText(link);
   Swal.fire({
         toast: true,
         icon: "success",
         title: 'Link Copied',
         position: "top-end",
         showConfirmButton: false,
         timer: 3000,
       });
  };

  const handleEmailSupport = () => {
    window.open('mailto:hello@appclicksupportdesk.com?subject=Affiliate Commission Bump Request', '_blank');
  };

  return (
    <>
       <div className="min-h-screen  bg-slate-50 text-gray-500">
      <div className="flex">
      <SideBar/>
  <main className="flex-1">
          {/* Header */}
       <Header title='Upgrades'/>

     <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Instructions Section */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center">
            <span className="mr-2">⚠️</span>
            INSTRUCTIONS
          </h2>
          
          <div className="space-y-4 text-red-700">
            <div className="flex items-start">
              <span className="bg-red-200 text-red-800 text-sm font-semibold px-2 py-1 rounded-full mr-3 mt-0.5">Step 1</span>
              <p className="font-medium">Click on "Affiliate Link" below to get your affiliate link</p>
            </div>
            
            <div className="flex items-start">
              <span className="bg-red-200 text-red-800 text-sm font-semibold px-2 py-1 rounded-full mr-3 mt-0.5">Step 2</span>
              <div className="flex-1">
                <p className="font-medium mb-2">Contact support desk via a ticket and request to get bumped to 70% across the funnel</p>
                <Link
                to="http://appclicksupportdesk.com/"
                target="_blank"
                  className="inline-flex items-center px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
                >
                  <Globe className="w-4 h-4 mr-2" />
                 http://appclicksupportdesk.com/
                </Link>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="bg-red-200 text-red-800 text-sm font-semibold px-2 py-1 rounded-full mr-3 mt-0.5">Step 3</span>
              {/* <p className="font-medium">Paste your Affiliate Link into your Marketplace banner URL in "Monetize"</p> */}
              <p className="font-medium">Copy your Affiliate Link</p>
            </div>
          </div>
        </div>

        {/* Affiliate Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {affiliateProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                  {product.name}
                </h3>
                
                <div className="mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDM2MCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNjAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xODAgMTI1TDE5NSAxNDBIMTY1TDE4MCAxMjVaIiBmaWxsPSIjOUI5QkEwIi8+Cjx0ZXh0IHg9IjE4MCIgeT0iMTgwIiBmaWxsPSIjOUI5QkEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPg==';
                    }}
                  />
                </div>

                <div className="space-y-3">
                  <Link
                    to={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Affiliate Link
                  </Link>
                  
                  <button
                    onClick={() => handleCopyLink(product.affiliateLink)}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Need help with your affiliate setup? Contact support at{' '}
            <button
              onClick={handleEmailSupport}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              hello@appclicksupportdesk.com
            </button>
          </p>
        </div>
      </div>
    </div>

    </main>
    </div>
    </div>
    </>
  )
}

export default DfyOffer
