import React from 'react';

const AchievementCards = ({ achievements, batch }) => {
  const filteredAchievements = achievements.filter(achievement => achievement.batch === batch);

  return (
    <div className="flex flex-wrap">
      {filteredAchievements.map((achievement) => {
        const imagePath = achievement.ug_pg === 'ug'
          ? `/assets/achievementug/${achievement.photoFileName}`
          : `/assets/achievementpg/${achievement.photoFileName}`;

        return (
          <div key={achievement.name} className="bg-white p-2 rounded-lg shadow-lg m-2 w-full md:w-1/2 lg:w-1/3">
            <img
              src={imagePath}
              alt={achievement.name}
              className="w-full h-auto object-contain rounded-t-lg"
            />
            <div className="p-2">
              <h3 className="text-lg font-bold mb-1">{achievement.name}</h3>
              <p className="text-gray-700 mb-1">{achievement.description}</p>
              <p className="text-gray-500">{achievement.ug_pg.toUpperCase()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AchievementCards;