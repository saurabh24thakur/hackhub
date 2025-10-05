
import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { User } from '../../types';
import axios from 'axios';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (email: string) => void;
  teamId: string;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose, onAddMember, teamId }) => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  
  const handleSearch = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`/api/users/search?name=${search}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    setUsers(response.data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 bg-white dark:bg-dark-card">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-dark-text">Add a new member</h3>
        <div className="flex space-x-2 mb-4">
          <Input 
            type="text"
            placeholder="Search for a user..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-grow dark:bg-dark-background dark:text-dark-text dark:border-dark-border"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <div className="space-y-2">
          {users.map(user => (
            <div key={user._id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-background">
              <p className="text-gray-900 dark:text-dark-text">{user.name}</p>
              <Button onClick={() => onAddMember(user.email)}>Add</Button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
