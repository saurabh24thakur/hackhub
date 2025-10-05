
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Users, Trophy, Plus } from 'lucide-react';
import { TeamCard } from '../components/teams/TeamCard';
import { TeamForm } from '../components/forms/TeamForm';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { format } from 'date-fns';
import { Hackathon, Team } from '../types';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { getTeamsByHackathon, createTeam } from '../api/teams';
import { getHackathon } from '../api/hackathons';

export const HackathonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('No hackathon ID provided.');
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const hackathonData = await getHackathon(id);
        setHackathon(hackathonData);

        const teamsData = await getTeamsByHackathon(id);
        setTeams(teamsData);
      } catch (err) {
        setError('Hackathon not found.');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const handleCreateTeam = async (teamData: Partial<Team>) => {
    if (!id) return;
    if (!user) {
      toast.error('You must be logged in to create a team.');
      return;
    }
    
    const toastId = toast.loading('Creating team...');

    try {
      const newTeam = await createTeam({ ...teamData, hackathonId: id });
      setTeams(prev => [...prev, newTeam]);
      setIsModalOpen(false);
      toast.success('Team created successfully!', { id: toastId });
    } catch (err: any) {
      console.error('Failed to create team:', err);
      const errorMsg = err.response?.data?.message || 'Failed to create team. Please try again.';
      toast.error(errorMsg, { id: toastId });
    }
  };

  if (isLoading) {
    return <div className="text-center py-12 dark:text-dark-text">Loading details...</div>;
  }

  if (error || !hackathon) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">{error || 'Hackathon not found'}</h1>
          <Link to="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            Back to hackathons
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'ongoing': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to hackathons
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden mb-8"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
            {hackathon.status && (<span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(hackathon.status)}`}>
                {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
              </span>)}
              <div className="flex items-center text-lg font-semibold text-gray-900 dark:text-dark-text">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                {hackathon.prize}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-4">{hackathon.name}</h1>
            <p className="text-gray-600 dark:text-dark-muted text-lg mb-6">{hackathon.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-400 dark:text-dark-muted" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-dark-muted">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-dark-text">
                    {format(new Date(hackathon.startDate), 'MMM dd')} - {format(new Date(hackathon.endDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-gray-400 dark:text-dark-muted" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-dark-muted">Location</p>
                  <p className="font-medium text-gray-900 dark:text-dark-text">{hackathon.location}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-3 text-gray-400 dark:text-dark-muted" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-dark-muted">Participation</p>
                  <p className="font-medium text-gray-900 dark:text-dark-text">{hackathon.teamsCount} teams • {hackathon.participantsCount} participants</p>
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text">Participating Teams</h2>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </div>
          
          {teams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team, index) => {
                  const canManage = user?.role === 'admin' || user?._id === team.leader?._id;
                  return (
                    <motion.div
                      key={team._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <TeamCard 
                        team={team} 
                        canManage={canManage}
                        showManageButton={true}
                      />
                    </motion.div>
                  )
              }) }
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 dark:text-dark-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-2">No teams yet</h3>
              <p className="text-gray-500 dark:text-dark-muted">Be the first to create a team for this hackathon!</p>
            </div>
          )}
        </motion.div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create a New Team">
        <TeamForm 
          onSubmit={handleCreateTeam} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
};
