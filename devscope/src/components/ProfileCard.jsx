import React from 'react';
import { MapPin, Link as LinkIcon, Twitter, Users, Building } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8 mt-6 dark:bg-gray-800"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <motion.img
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          src={profile.avatar_url}
          alt={`${profile.login}'s avatar`}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full"
        />
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                @{profile.login}
              </a>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Joined {new Date(profile.created_at).toLocaleDateString()}
            </p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {profile.bio || 'This profile has no bio'}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-3 bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6"
          >
            <div>
              <p className="text-gray-600 dark:text-gray-400">Repos</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{profile.public_repos}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Followers</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{profile.followers}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Following</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{profile.following}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-5 h-5" />
              <span>{profile.location || 'Not Available'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Twitter className="w-5 h-5" />
              <span>{profile.twitter_username || 'Not Available'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <LinkIcon className="w-5 h-5" />
              <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {profile.blog || 'Not Available'}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Building className="w-5 h-5" />
              <span>{profile.company || 'Not Available'}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;