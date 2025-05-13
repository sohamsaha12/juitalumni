import React, { useEffect, useState } from 'react';
import UGAchievementBatches from './UGAchievementBatches';
import PGAchievementBatches from './PGAchievementBatches';
import AchievementCards from './AchievementCards';

const Achievement = () => {
  const [ugAchievements, setUgAchievements] = useState([]);
  const [pgAchievements, setPgAchievements] = useState([]);
  const [showUG, setShowUG] = useState(false);
  const [showPG, setShowPG] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  useEffect(() => {
    fetch('/assets/achievement.json')
      .then((response) => response.json())
      .then((data) => {
        const ug = data.filter(achievement => achievement.ug_pg === 'ug');
        const pg = data.filter(achievement => achievement.ug_pg === 'pg');
        setUgAchievements(ug);
        setPgAchievements(pg);
      })
      .catch((error) => console.error('Error fetching achievements:', error));
  }, []);

  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch);
  };

  const renderBatchSelection = () => (
    <div className="flex justify-center space-x-4 mb-4">
      <button
        onClick={() => { setShowUG(!showUG); setShowPG(false); setSelectedBatch(null); }}
        className="text-white bg-gradient-to-r from-green-500 to-green-700 px-6 py-3 rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
      >
        UG Alumni Achievement
      </button>
      <button
        onClick={() => { setShowPG(!showPG); setShowUG(false); setSelectedBatch(null); }}
        className="text-white bg-gradient-to-r from-purple-500 to-purple-700 px-6 py-3 rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
      >
        PG Alumni Achievement
      </button>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-blue-800">Alumni Achievements</h1>
      {renderBatchSelection()}
      <div className="flex">
        <div className="w-1/3 pr-4">
          {showUG && <UGAchievementBatches onSelectBatch={handleBatchSelect} />}
          {showPG && <PGAchievementBatches onSelectBatch={handleBatchSelect} />}
        </div>
        <div className="w-2/3 pl-4">
          {selectedBatch && (
            <AchievementCards
              achievements={showUG ? ugAchievements : pgAchievements}
              batch={selectedBatch}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Achievement;