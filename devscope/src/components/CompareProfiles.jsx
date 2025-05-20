import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, GitBranch, Code } from 'lucide-react';

const CompareProfiles = ({ profile1, profile2 }) => {
  if (!profile1 || !profile2) return null;

  const calculateScore = (profile) => {
    return (
      profile.public_repos * 2 +
      profile.followers * 3 +
      profile.following +
      (profile.public_gists || 0)
    );
  };

  const score1 = calculateScore(profile1);
  const score2 = calculateScore(profile2);

  const getWinner = () => {
    if (score1 > score2) return profile1.login;
    if (score2 > score1) return profile2.login;
    return 'tie';
  };

  const winner = getWinner();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8 mt-6 dark:bg-gray-800"
    >
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Profile Comparison
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile 1 */}
        <div className="relative">
          <div className="flex flex-col items-center">
            <img
              src={profile1.avatar_url}
              alt={`${profile1.login}'s avatar`}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{profile1.name}</h3>
            <a
              href={profile1.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              @{profile1.login}
            </a>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Repos</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{profile1.public_repos}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Followers</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{profile1.followers}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Following</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{profile1.following}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Score</span>
              <span className="font-bold text-gray-900 dark:text-white">{score1}</span>
            </div>
          </div>
        </div>

        {/* VS Divider */}
        <div className="hidden md:flex items-center justify-center">
          <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="absolute">
            <span className="text-2xl font-bold text-gray-400">VS</span>
          </div>
        </div>

        {/* Profile 2 */}
        <div className="relative">
          <div className="flex flex-col items-center">
            <img
              src={profile2.avatar_url}
              alt={`${profile2.login}'s avatar`}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{profile2.name}</h3>
            <a
              href={profile2.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              @{profile2.login}
            </a>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Repos</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{profile2.public_repos}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Followers</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{profile2.followers}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Following</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{profile2.following}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Score</span>
              <span className="font-bold text-gray-900 dark:text-white">{score2}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Winner Announcement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 text-center"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {winner === 'tie' ? (
            "It's a tie!"
          ) : (
            <>
              <span className="text-blue-500">@{winner}</span> wins!
            </>
          )}
        </h3>
      </motion.div>
    </motion.div>
  );
};

export default CompareProfiles; 