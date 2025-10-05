import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Users, Trophy, Calendar, Shield, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Landing: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Event Management',
      description: 'Create and manage hackathons with detailed scheduling, location tracking, and participant management.'
    },
    {
      icon: Users,
      title: 'Team Organization',
      description: 'Efficiently organize teams, manage members, and track participant roles and contributions.'
    },
    {
      icon: Shield,
      title: 'Admin Control',
      description: 'Comprehensive admin dashboard with role-based access control and secure authentication.'
    },
    {
      icon: Trophy,
      title: 'Competition Tracking',
      description: 'Track competitions, manage prizes, and monitor hackathon progress in real-time.'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Get instant updates on team formations, project submissions, and event announcements.'
    },
    {
      icon: Code2,
      title: 'Developer Friendly',
      description: 'Built with modern technologies and best practices for seamless user experience.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Hackathons Managed' },
    { number: '10k+', label: 'Participants' },
    { number: '2k+', label: 'Teams Formed' },
    { number: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 dark:bg-dark-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-dark-text mb-6">
                Manage Hackathons
                <span className="text-blue-600 dark:text-blue-400"> Like a Pro</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-dark-muted mb-8 max-w-3xl mx-auto">
                The ultimate platform for organizing, managing, and running successful hackathons. 
                From team formation to project submission, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <Button variant="primary" size="lg" className="group">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/hackathons">
                  <Button variant="secondary" size="lg">
                    View Hackathons
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-dark-muted font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-dark-text mb-4">
              Everything You Need to Run Amazing Hackathons
            </h2>
            <p className="text-xl text-gray-600 dark:text-dark-muted max-w-3xl mx-auto">
              Comprehensive tools and features designed to make hackathon management effortless and efficient.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card rounded-lg p-6 border border-transparent dark:border-dark-border"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-dark-muted">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 dark:text-dark-muted mb-8 max-w-2xl mx-auto">
              Join thousands of organizers who trust HackHub to manage their hackathons. 
              Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-50 dark:bg-gray-200 dark:text-blue-700 dark:hover:bg-gray-300">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/hackathons">
                <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600 dark:border-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
                  Explore Features
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 dark:bg-dark-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Code2 className="w-8 h-8 text-blue-400 dark:text-blue-500" />
              <span className="text-xl font-bold">HackHub</span>
            </div>
            <div className="text-gray-400 dark:text-dark-muted">
              © 2025 HackHub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
