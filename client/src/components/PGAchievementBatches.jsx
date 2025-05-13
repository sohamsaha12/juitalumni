import React from 'react';

const PGAchievementBatches = ({ onSelectBatch }) => {
  const batches = [];
  for (let year = 2000; year <= 2020; year ++) {
    batches.push(`${year}-${year + 2}`);
  }

  return (
    <div className="flex flex-wrap">
      {batches.map((batch) => (
        <div
          key={batch}
          className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer m-2"
          onClick={() => onSelectBatch(batch)}
        >
          <h3 className="text-xl font-bold mb-2">PG Batch {batch}</h3>
        </div>
      ))}
    </div>
  );
};

export default PGAchievementBatches;