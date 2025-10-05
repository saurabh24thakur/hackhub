
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { HackathonForm } from '../../components/forms/HackathonForm';
import { Hackathon } from '../../types';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

export const HackathonFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!id;

  useEffect(() => {
    const fetchHackathon = async () => {
      if (isEditing && id) {
        setIsLoading(true);
        try {
          const res = await axios.get(`/api/hackathons/${id}`);
          setHackathon(res.data);
        } catch (error) {
          toast.error('Hackathon not found.');
          navigate('/admin');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchHackathon();
  }, [id, isEditing, navigate]);

  const handleSubmit = async (data: Partial<Hackathon>) => {
    if (!user) {
      toast.error('You must be logged in.');
      return;
    }

    const toastId = toast.loading(isEditing ? 'Updating hackathon...' : 'Creating hackathon...');
    
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      if (isEditing && id) {
        await axios.put(`/api/hackathons/${id}`, data, config);
      } else {
        await axios.post('/api/hackathons', data, config);
      }
      toast.success(`Hackathon ${isEditing ? 'updated' : 'created'} successfully.`, { id: toastId });
      navigate('/admin');
    } catch (err: any) {
        const errorMsg = err.response?.data?.message || err.message || `Failed to ${isEditing ? 'update' : 'create'} hackathon.`;
        toast.error(errorMsg, { id: toastId });
    }
  };

  if (isLoading && isEditing) {
    return <div className="text-center py-12 dark:text-dark-text">Loading form...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/admin" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-6">
          {isEditing ? 'Edit Hackathon' : 'Create New Hackathon'}
        </h1>
        <HackathonForm
          hackathon={hackathon || undefined}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin')}
        />
      </div>
    </div>
  );
};
