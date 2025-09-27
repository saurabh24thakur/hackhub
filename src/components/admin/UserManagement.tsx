import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, RefreshCw } from 'lucide-react';
import { mockProfiles } from '../../data/mockData';
import { Profile } from '../../types';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Button } from '../ui/Button';

export const UserManagement: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

  const fetchProfiles = () => {
    setIsLoading(true);
    setTimeout(() => {
        setProfiles(mockProfiles);
        setIsLoading(false);
    }, 1000);
  };

  const handleRoleChange = async (profile: Profile, newRole: Profile['role']) => {
    if (profile.id === currentUser?.id) {
      toast.error("You cannot change your own role.");
      return;
    }

    setUpdatingIds(prev => new Set(prev).add(profile.id));
    const toastId = toast.loading(`Updating ${profile.name}'s role...`);

    setTimeout(() => {
        toast.success('Role updated successfully.', { id: toastId });
        setProfiles(prev => 
            prev.map(p => p.id === profile.id ? { ...p, role: newRole } : p)
        );
        setUpdatingIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(profile.id);
            return newSet;
        });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
        <Button variant="ghost" size="sm" onClick={fetchProfiles} disabled={isLoading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {isLoading && !profiles.length ? (
        <div className="text-center py-8">Loading users...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {profiles.map((profile) => (
                <tr key={profile.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={profile.avatar_url || `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/40x40.png`} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{profile.name || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{profile.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      profile.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {profile.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {profile.role === 'admin' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleRoleChange(profile, 'user')}
                        disabled={updatingIds.has(profile.id) || profile.id === currentUser?.id}
                      >
                        <User className="w-4 h-4 mr-1" />
                        Demote to User
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleRoleChange(profile, 'admin')}
                        disabled={updatingIds.has(profile.id)}
                      >
                        <Shield className="w-4 h-4 mr-1" />
                        Promote to Admin
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};