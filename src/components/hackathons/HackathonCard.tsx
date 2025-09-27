import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Trophy } from 'lucide-react';
import { Hackathon } from '../../types';
import { format } from 'date-fns';

interface HackathonCardProps {
  hackathon: Hackathon;
}

export const HackathonCard: React.FC<HackathonCardProps> = ({ hackathon }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
    >
      <Link to={`/hackathons/${hackathon.id}`}>
        <img
          src={hackathon.image || 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200.png'}
          alt={hackathon.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(hackathon.status)}`}>
              {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <Trophy className="w-4 h-4 mr-1" />
              {hackathon.prize}
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{hackathon.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hackathon.description}</p>
          
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(hackathon.startDate), 'MMM dd, yyyy')} - {format(new Date(hackathon.endDate), 'MMM dd, yyyy')}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {hackathon.location}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              {hackathon.teamsCount} teams • {hackathon.participantsCount} participants
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
