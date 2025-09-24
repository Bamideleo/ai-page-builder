import { Plus, Search, Edit,  Trash2} from 'lucide-react';
import SideBar from "./SideBar"
import Header from './Header';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isUserDetails } from '../utils/auth';

const OTOUpgradeTable = () => {
const [user, setUser] = useState(isUserDetails);



    const otoOffers = [
    {
      id: '1',
      title: 'OTO 1 (Unlimited)',
      url: 'https://grabhumanify.com/unlimited-access'
    },
    {
      id: '2',
      title: 'OTO 2 (Done For You)',
      url: 'https://grabhumanify.com/dfy-access'
    },
    {
      id: '3',
      title: 'OTO 3 (Automation)',
      url: 'https://grabhumanify.com/automation-access'
    },
    {
      id: '4',
      title: 'OTO 4 (Swift Profit)',
      url: 'https://grabhumanify.com/swiftprofit-access'
    },
    {
      id: '5',
      title: 'OTO 5 (Limitless Traffic)',
      url: 'https://grabhumanify.com/limitlesstraffic-access'
    },
    {
      id: '6',
      title: 'OTO 6 (Agency)',
      url: 'https://grabhumanify.com/agency-access'
    },
    {
      id: '7',
      title: 'OTO 7 (Franchise)',
      url: 'https://grabhumanify.com/franchise-access'
    },
    {
      id: '8',
      title: 'OTO 8 (Multiple Income)',
      url: 'https://grabhumanify.com/multiincome-access'
    }
  ];

  return (
    <>
        <div className="min-h-screen  bg-slate-50 text-gray-500">
      <div className="flex">
      <SideBar/>
  <main className="flex-1">
          {/* Header */}
       <Header title='Upgrades'/>
     <div className="w-full max-w-4xl mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 mt-5 bg-white shadow-sm rounded-lg overflow-hidden">
          <tbody>
            {otoOffers
  // filter out all OTOs the user already has
  .filter((offer) => {
    const otoKey = `oto_${offer.id}`;
    return user[otoKey] !== 1; // only show if not owned
  })
  .map((offer) => (
    <tr 
      key={offer.id} 
      id={offer.id}
      className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
    >
      <th 
        scope="row" 
        className="px-6 py-4 text-left font-semibold text-gray-500 bg-gray-50 border-r border-gray-300 w-1/2"
      >
        {offer.title} -
      </th>
      <td className="px-6 py-4 text-center">
        <Link
          to={offer.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          CLICK HERE TO UPGRADE
        </Link>
      </td>
    </tr>
))}

          </tbody>
        </table>
      </div>
    </div>
    </main>
        </div>
      </div>
    </>
  )
}

export default OTOUpgradeTable
