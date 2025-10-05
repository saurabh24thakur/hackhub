
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
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';
      case 'ongoing': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-dark-card dark:text-dark-muted';
      default: return 'bg-gray-100 text-gray-800 dark:bg-dark-card dark:text-dark-muted';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg border border-transparent dark:border-dark-border"
    >
      <Link to={`/hackathons/${hackathon._id}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
          {hackathon.status && (<span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(hackathon.status)}`}>
              {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
            </span>)}
            <div className="flex items-center text-sm text-gray-500 dark:text-dark-muted">
              <Trophy className="w-4 h-4 mr-1" />
              {hackathon.prize}
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-dark-text mb-2">{hackathon.name}</h3>
          <p className="text-gray-600 dark:text-dark-muted text-sm mb-4 line-clamp-2">{hackathon.description}</p>
          
          <div className="space-y-2 text-sm text-gray-500 dark:text-dark-muted">
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
