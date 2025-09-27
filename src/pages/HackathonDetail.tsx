import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Users, Trophy } from 'lucide-react';
import { TeamCard } from '../components/teams/TeamCard';
import { format } from 'date-fns';
import { mockHackathons, mockTeams } from '../data/mockData';
import { Hackathon, Team } from '../types';

export const HackathonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No hackathon ID provided.');
      setIsLoading(false);
      return;
    }

    const fetchData = () => {
      setIsLoading(true);
      const hackathonData = mockHackathons.find(h => h.id === id);
      if (hackathonData) {
        setHackathon(hackathonData);
        const teamsData = mockTeams.filter(t => t.hackathonId === id);
        setTeams(teamsData);
      } else {
        setError('Hackathon not found.');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div className="text-center py-12">Loading details...</div>;
  }

  if (error || !hackathon) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Hackathon not found'}</h1>
          <Link to="/hackathons" className="text-blue-600 hover:text-blue-800">
            Back to hackathons
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/hackathons"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to hackathons
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
        >
          <img
            src={hackathon.image || 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/800x300.png'}
            alt={hackathon.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(hackathon.status)}`}>
                {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
              </span>
              <div className="flex items-center text-lg font-semibold text-gray-900">
                <Trophy className="w-5 h-5 mr-2" />
                {hackathon.prize}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{hackathon.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{hackathon.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">
                    {format(new Date(hackathon.startDate), 'MMM dd')} - {format(new Date(hackathon.endDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{hackathon.location}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Participation</p>
                  <p className="font-medium">{hackathon.teamsCount} teams • {hackathon.participantsCount} participants</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Participating Teams</h2>
          
          {teams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <TeamCard team={team} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h3>
              <p className="text-gray-500">Teams will appear here once they are added by an admin.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};