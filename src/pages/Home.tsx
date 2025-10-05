
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HackathonCard } from '../components/hackathons/HackathonCard';
import { Search, Filter } from 'lucide-react';
import { Hackathon } from '../types';
import axios from 'axios';

export const Home: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHackathons = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/hackathons?search=${searchTerm}`);
        setHackathons(res.data);
      } catch (err) {
        setError('Failed to fetch hackathons. Please try again later.');
      }
      setIsLoading(false);
    };

    const debounceFetch = setTimeout(() => {
      fetchHackathons();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-dark-text mb-4">
            Discover Amazing Hackathons
          </h1>
          <p className="text-xl text-gray-600 dark:text-dark-muted max-w-3xl mx-auto">
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
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-dark-muted" />
            <input
              type="text"
              placeholder="Search hackathons..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-card dark:border-dark-border dark:placeholder-dark-muted dark:text-dark-text dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-dark-border dark:hover:bg-dark-card dark:text-dark-muted">
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
                key={hackathon._id}
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
