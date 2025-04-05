import React from 'react';
import { Star, GitFork } from 'lucide-react';
import { motion } from 'framer-motion';

const RepoList = ({ repos }) => {
  if (!repos?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mt-6"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Top Repositories</h3>
      <div className="grid gap-4">
        {repos.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline font-semibold"
              >
                {repo.name}
              </a>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600 dark:text-gray-400">{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{repo.forks_count}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{repo.description}</p>
            {repo.language && (
              <div className="mt-4">
                <span className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
                  {repo.language}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RepoList;