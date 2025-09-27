import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Hackathon, Team } from '../types';
import { format } from 'date-fns';
import { mockHackathons, mockTeams } from '../data/mockData';
import toast from 'react-hot-toast';
import { UserManagement } from '../components/admin/UserManagement';

interface HackathonWithTeams extends Hackathon {
  teams: Team[];
}

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState<HackathonWithTeams[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    setIsLoading(true);
    const hackathonData = mockHackathons.map(h => ({
      ...h,
      teams: mockTeams.filter(t => t.hackathonId === h.id)
    }));
    setHackathons(hackathonData as HackathonWithTeams[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteHackathon = (id: string) => {
    if (confirm('Are you sure you want to delete this hackathon and all its teams?')) {
      toast.success('Hackathon deleted successfully.');
    }
  };

  const handleDeleteTeam = (hackathonId: string, teamId: string) => {
    if (confirm('Are you sure you want to delete this team?')) {
      toast.success('Team deleted successfully.');
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.name}. Manage hackathons, teams, and participants.</p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Hackathons</h2>
              <Button variant="primary" onClick={() => navigate('/admin/hackathons/new')}>
                <Plus className="w-4 h-4 mr-2" />
                Create Hackathon
              </Button>
            </div>

            <div className="space-y-4">
              {hackathons.map((hackathon) => (
                <div key={hackathon.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{hackathon.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/teams/new?hackathonId=${hackathon.id}`)}>
                        <Users className="w-4 h-4 mr-1" />
                        Add Team
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/hackathons/edit/${hackathon.id}`)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteHackathon(hackathon.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {format(new Date(hackathon.startDate), 'MMM dd, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {hackathon.teams.length} teams
                    </div>
                  </div>

                  {hackathon.teams.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Teams:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {hackathon.teams.map((team) => (
                          <div key={team.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{team.name}</span>
                              <div className="flex items-center space-x-1">
                                <button onClick={() => navigate(`/admin/teams/edit/${team.id}?hackathonId=${hackathon.id}`)} className="text-blue-600 hover:text-blue-800">
                                  <Edit className="w-3 h-3" />
                                </button>
                                <button onClick={() => handleDeleteTeam(hackathon.id, team.id)} className="text-red-600 hover:text-red-800">
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{team.members.length} members</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <UserManagement />
        </div>
      </div>
    </div>
  );
};