import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Team, TeamMember } from '../../types';
import { Plus, X } from 'lucide-react';

interface TeamFormProps {
  team?: Team;
  onSubmit: (data: Partial<Team>) => void;
  onCancel: () => void;
}

export const TeamForm: React.FC<TeamFormProps> = ({ team, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: team?.name || '',
    description: team?.description || '',
    project: team?.project || ''
  });

  const [members, setMembers] = useState<Partial<TeamMember>[]>(
    team?.members || [{ name: '', email: '', role: '' }]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      members: members.filter(m => m.name && m.email) as TeamMember[]
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addMember = () => {
    setMembers(prev => [...prev, { name: '', email: '', role: '' }]);
  };

  const removeMember = (index: number) => {
    setMembers(prev => prev.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    setMembers(prev => prev.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Team Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <Input
        label="Project Name (Optional)"
        name="project"
        value={formData.project}
        onChange={handleChange}
      />
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Team Members
          </label>
          <Button type="button" variant="ghost" size="sm" onClick={addMember}>
            <Plus className="w-4 h-4 mr-1" />
            Add Member
          </Button>
        </div>
        
        <div className="space-y-4">
          {members.map((member, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-900">Member {index + 1}</h4>
                {members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Full Name"
                  value={member.name || ''}
                  onChange={(e) => updateMember(index, 'name', e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={member.email || ''}
                  onChange={(e) => updateMember(index, 'email', e.target.value)}
                  required
                />
                <Input
                  placeholder="Role"
                  value={member.role || ''}
                  onChange={(e) => updateMember(index, 'role', e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {team ? 'Update' : 'Create'} Team
        </Button>
      </div>
    </form>
  );
};
