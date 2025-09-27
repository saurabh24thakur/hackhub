import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HackathonCard } from '../components/hackathons/HackathonCard';
import { Search, Filter } from 'lucide-react';
import { mockHackathons } from '../data/mockData';
import { Hackathon } from '../types';

export const Home: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>(mockHackathons);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Hackathons
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join innovative hackathons, collaborate with talented developers, and build the future together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search hackathons..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
        </motion.div>

        {isLoading && <div className="text-center">Loading hackathons...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        {!isLoading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {hackathons.map((hackathon, index) => (
              <motion.div
                key={hackathon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <HackathonCard hackathon={hackathon} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};