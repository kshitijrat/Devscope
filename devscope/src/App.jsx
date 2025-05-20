import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import RepoList from './components/RepoList';
import ThemeToggle from './components/ThemeToggle';
import LanguageChart from './components/LanguageChart';
import CompareProfiles from './components/CompareProfiles';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') return true;
    if (storedTheme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profile1, setProfile1] = useState(null);
  const [profile2, setProfile2] = useState(null);
  const [repos1, setRepos1] = useState([]);
  const [repos2, setRepos2] = useState([]);
  const [compareMode, setCompareMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const fetchUserData = async (username, isSecondProfile = false) => {
    setLoading(true);
    setError(null);

    try {
      const [profileResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`)
      ]);

      if (!profileResponse.ok || !reposResponse.ok) {
        throw new Error('User not found');
      }

      const profileData = await profileResponse.json();
      const reposData = await reposResponse.json();

      if (isSecondProfile) {
        setProfile2(profileData);
        setRepos2(reposData);
        setCompareMode(true);
      } else {
        setProfile1(profileData);
        setRepos1(reposData);
        setCompareMode(false);
      }
    } catch (err) {
      setError(err.message);
      if (isSecondProfile) {
        setProfile2(null);
        setRepos2([]);
      } else {
        setProfile1(null);
        setRepos1([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = () => {
    if (profile1 && !profile2) {
      setCompareMode(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center gap-2">
            <FaGithub className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DevScope</h1>
          </div>
          <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1">
            <SearchBar onSearch={(username) => fetchUserData(username, false)} placeholder="Search first profile..." />
          </div>
          {profile1 && (
            <div className="flex-1">
              <SearchBar onSearch={(username) => fetchUserData(username, true)} placeholder="Search second profile..." />
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mt-8"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {compareMode && profile1 && profile2 ? (
            <CompareProfiles profile1={profile1} profile2={profile2} />
          ) : (
            <>
              {profile1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProfileCard profile={profile1} />
                  <LanguageChart repos={repos1} />
                  <RepoList repos={repos1} />
                </motion.div>
              )}
              {profile2 && !compareMode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProfileCard profile={profile2} />
                  <LanguageChart repos={repos2} />
                  <RepoList repos={repos2} />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
