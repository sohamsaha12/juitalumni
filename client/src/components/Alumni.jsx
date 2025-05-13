import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UGBatches from "./UGBatches.jsx";
import PGBatches from "./PGBatches.jsx";
import PGSixSemesterBatches from "./PGSixSemesterBatches.jsx";
import StudentDetails from "./StudentDetails.jsx";

const Alumni = () => {
  const [showUG, setShowUG] = useState(false);
  const [showPG, setShowPG] = useState(false);
  const [showPGSixSemester, setShowPGSixSemester] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const navigate = useNavigate();

  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch);
  };

  const handleUGClick = () => {
    setShowUG(!showUG);
    setShowPG(false);
    setShowPGSixSemester(false);
    setSelectedBatch(null); // Reset selected batch
  };

  const handlePGClick = () => {
    setShowPG(!showPG);
    setShowUG(false);
    setShowPGSixSemester(false);
    setSelectedBatch(null); // Reset selected batch
  };

  const handlePGSixSemesterClick = () => {
    setShowPGSixSemester(!showPGSixSemester);
    setShowUG(false);
    setShowPG(false);
    setSelectedBatch(null); // Reset selected batch
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <section className="mb-8 p-4 md:p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-blue-800">Welcome to the Alumni Portal</h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
          Connect with fellow alumni, explore notable achievements, and stay updated with the latest events. Our alumni network is a vibrant community of graduates who are engaged, informed, and inspired to contribute to the growth and development of the department and the university.
        </p>
      </section>

      <div className="mb-8 text-center">
        <button
          onClick={() => navigate('/achievement')}
          className="text-white bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-3 rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105 mx-2"
        >
          Notable Alumni <br /> <span className="text-sm">Click to View</span>
        </button>
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={handleUGClick}
          className="text-white bg-gradient-to-r from-green-500 to-green-700 px-6 py-6 rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          UG Alumni <br /> <span className="text-sm">Click to expand</span>
        </button>
        <button
          onClick={handlePGClick}
          className="text-white bg-gradient-to-r from-purple-500 to-purple-700 px-6 py-6 rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          PG Alumni <br /> <span className="text-sm">Click to expand</span>
        </button>
        <button
          onClick={handlePGSixSemesterClick}
          className="text-white bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-6 rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          PG Six Semester <br /> <span className="text-sm">Click to expand</span>
        </button>
      </div>

      <div className="flex">
        <div className="w-1/3 pr-4">
          {showUG && <UGBatches onSelectBatch={handleBatchSelect} />}
          {showPG && <PGBatches onSelectBatch={handleBatchSelect} />}
          {showPGSixSemester && <PGSixSemesterBatches onSelectBatch={handleBatchSelect} />}
        </div>
        <div className="w-2/3 pl-4">
          {selectedBatch && <StudentDetails batch={selectedBatch} />}
        </div>
      </div>
    </div>
  );
};

export default Alumni;