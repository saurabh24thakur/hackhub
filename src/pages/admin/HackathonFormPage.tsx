import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { HackathonForm } from '../../components/forms/HackathonForm';
import { Hackathon } from '../../types';
import { mockHackathons } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

export const HackathonFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      const hackathonData = mockHackathons.find(h => h.id === id);
      if (hackathonData) {
        setHackathon(hackathonData);
      } else {
        toast.error('Hackathon not found.');
        navigate('/admin');
      }
      setIsLoading(false);
    }
  }, [id, isEditing, navigate]);

  const handleSubmit = async (data: Partial<Hackathon>) => {
    if (!user) {
      toast.error('You must be logged in.');
      return;
    }

    const toastId = toast.loading(isEditing ? 'Updating hackathon...' : 'Creating hackathon...');
    setTimeout(() => {
      if (isEditing && id) {
        console.log('Updating hackathon', id, data);
      } else {
        console.log('Creating hackathon', data);
      }
      toast.success(`Hackathon ${isEditing ? 'updated' : 'created'} successfully.`, { id: toastId });
      navigate('/admin');
    }, 1000);
  };

  if (isLoading) {
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