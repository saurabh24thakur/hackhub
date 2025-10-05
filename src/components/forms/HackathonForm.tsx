import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Hackathon } from '../../types';

interface HackathonFormProps {
  hackathon?: Hackathon;
  onSubmit: (data: Partial<Hackathon>) => void;
  onCancel: () => void;
}

export const HackathonForm: React.FC<HackathonFormProps> = ({ hackathon, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: hackathon?.title || '',
    description: hackathon?.description || '',
    startDate: hackathon?.startDate ? new Date(hackathon.startDate).toISOString().split('T')[0] : '',
    endDate: hackathon?.endDate ? new Date(hackathon.endDate).toISOString().split('T')[0] : '',
    location: hackathon?.location || '',
    prize: hackathon?.prize || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString()
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Hackathon Title"
        name="title"
        value={formData.title}
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Start Date"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <Input
          label="End Date"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </div>
      
      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      
      <Input
        label="Prize Amount"
        name="prize"
        value={formData.prize}
        onChange={handleChange}
        placeholder="$10,000"
        required
      />
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {hackathon ? 'Update' : 'Create'} Hackathon
        </Button>
      </div>
    </form>
  );
};
