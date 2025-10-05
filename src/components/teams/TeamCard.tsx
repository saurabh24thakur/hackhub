
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Edit, Trash2, PlusCircle, Settings } from 'lucide-react';
import { Team, User } from '../../types';
import { Link } from 'react-router-dom';

interface TeamCardProps {
  team: Team;
  onEdit?: () => void;
  onDelete?: () => void;
  onAddMember?: () => void;
  onRemoveMember?: (memberId: string) => void;
  canManage?: boolean;
  showManageButton?: boolean;
}

export const TeamCard: React.FC<TeamCardProps> = ({ 
  team, 
  onEdit, 
  onDelete, 
  onAddMember, 
  onRemoveMember, 
  canManage = false, 
  showManageButton = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">{team.name}</h3>
        <div className="flex items-center space-x-2">
          {canManage && showManageButton && (
            <Link to={`/teams/${team._id}/manage`} className="text-gray-600 dark:text-dark-muted hover:text-gray-800 dark:hover:text-dark-text text-sm font-medium">
              <Settings className="w-4 h-4" />
            </Link>
          )}
          {canManage && onEdit && (
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
          {canManage && onDelete && (
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-dark-muted text-sm mb-4 flex-grow">{team.description}</p>
      
      {team.project && (
        <div className="mb-4">
          <span className="text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wide">Project</span>
          <p className="text-sm text-gray-900 dark:text-dark-text mt-1">{team.project}</p>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Users className="w-4 h-4 text-gray-400 dark:text-dark-muted mr-2" />
          <span className="text-sm text-gray-600 dark:text-dark-muted">{team.members.length} members</span>
        </div>
        {canManage && onAddMember && (
           <button onClick={onAddMember} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center">
             <PlusCircle className="w-4 h-4 mr-1" />
             Add Member
           </button>
        )}
      </div>
      
      <div className="space-y-2">
        {team.members.map((member: User) => (
          <div key={member._id} className="flex items-center space-x-3">
            <img
              src={member.avatar || 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/32x32.png'}
              alt={member.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-dark-text truncate">{member.name}</p>
              <p className="text-xs text-gray-500 dark:text-dark-muted">{member.role}</p>
            </div>
            <a
              href={`mailto:${member.email}`}
              className="text-gray-400 dark:text-dark-muted hover:text-gray-600 dark:hover:text-dark-text"
            >
              <Mail className="w-4 h-4" />
            </a>
            {canManage && onRemoveMember && (
              <button 
                onClick={() => onRemoveMember(member._id)} 
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
