
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { TeamForm } from '../../components/forms/TeamForm';
import { Team } from '../../types';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

export const TeamFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!id;

  const query = new URLSearchParams(location.search);
  const hackathonId = query.get('hackathonId');

  useEffect(() => {
    const fetchTeam = async () => {
      if (isEditing && id) {
        setIsLoading(true);
        try {
          const res = await axios.get(`/api/teams/${id}`);
          setTeam(res.data);
        } catch (error) {
          toast.error('Team not found.');
          navigate('/admin');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTeam();
  }, [id, isEditing, navigate]);

  const handleSubmit = async (data: Partial<Team>) => {
    if (!user) {
      toast.error('You must be logged in.');
      return;
    }

    if (!hackathonId && !isEditing) {
      toast.error('Hackathon ID is missing.');
      return;
    }

    const toastId = toast.loading(isEditing ? 'Updating team...' : 'Creating team...');

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const teamData = { ...data, hackathonId: isEditing ? team?.hackathonId : hackathonId };

    try {
      if (isEditing && id) {
        await axios.put(`/api/teams/${id}`, teamData, config);
      } else {
        await axios.post('/api/teams', teamData, config);
      }
      toast.success(`Team ${isEditing ? 'updated' : 'created'} successfully.`, { id: toastId });
      navigate('/admin');
    } catch (err: any) {
        const errorMsg = err.response?.data?.message || err.message || `Failed to ${isEditing ? 'update' : 'create'} team.`;
        toast.error(errorMsg, { id: toastId });
    }
  };

  if (isLoading && isEditing) {
    return <div className="text-center py-12">Loading form...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/admin" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {isEditing ? 'Edit Team' : 'Create New Team'}
        </h1>
        <TeamForm
          team={team || undefined}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin')}
        />
      </div>
    </div>
  );
};
