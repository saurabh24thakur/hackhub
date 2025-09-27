import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Edit, Trash2 } from 'lucide-react';
import { Team } from '../../types';

interface TeamCardProps {
  team: Team;
  onEdit?: () => void;
  onDelete?: () => void;
  canManage?: boolean;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team, onEdit, onDelete, canManage = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
        {canManage && (
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      <p className="text-gray-600 text-sm mb-4 flex-grow">{team.description}</p>
      
      {team.project && (
        <div className="mb-4">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Project</span>
          <p className="text-sm text-gray-900 mt-1">{team.project}</p>
        </div>
      )}
      
      <div className="flex items-center mb-4">
        <Users className="w-4 h-4 text-gray-400 mr-2" />
        <span className="text-sm text-gray-600">{team.members.length} members</span>
      </div>
      
      <div className="space-y-2">
        {team.members.map((member) => (
          <div key={member.id} className="flex items-center space-x-3">
            <img
              src={member.avatar || 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/32x32.png'}
              alt={member.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
              <p className="text-xs text-gray-500">{member.role}</p>
            </div>
            <a
              href={`mailto:${member.email}`}
              className="text-gray-400 hover:text-gray-600"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
