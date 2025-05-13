import React from "react";
import { useNavigate } from "react-router-dom";
import missionImage from "../assets/mission.jpg"; // Adjust the path as necessary

const Mission = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <section className="relative mb-8">
        <img
          src={missionImage}
          alt="Mission of JU IT Alumni"
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-200 px-4 md:px-8 py-2 md:py-4 rounded-lg shadow-2xl bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent transform translate-y-1/4 font-poppins animate-pulse">
            Our Mission
          </h1>
        </div>
      </section>

      <section className="mb-8 p-4 md:p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-blue-600">Empowering Alumni</h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          The mission of the Alumni Management Association of Jadavpur University Department of Information Technology is to foster a lifelong relationship between the university and its alumni. We aim to create a vibrant community of graduates who are engaged, informed, and inspired to contribute to the growth and development of the department and the university.
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
          Through various initiatives, events, and programs, we strive to support the professional and personal growth of our alumni, while also promoting the values of excellence, innovation, and collaboration that define our institution.
        </p>
      </section>

      <section className="mb-8 p-4 md:p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-blue-600">Our Goals</h2>
        <ul className="list-disc list-inside text-lg md:text-xl text-gray-700 leading-relaxed">
          <li>To build a strong network of alumni who can support each other professionally and personally.</li>
          <li>To provide opportunities for alumni to stay connected with the university and contribute to its growth.</li>
          <li>To organize events and programs that promote professional development and lifelong learning.</li>
          <li>To recognize and celebrate the achievements of our alumni.</li>
        </ul>
      </section>

      <section className="mb-8 p-4 md:p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-blue-600">Join Us</h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          We invite all alumni of the Jadavpur University Department of Information Technology to join our association and be a part of this vibrant community. Together, we can make a difference and contribute to the continued success of our alma mater.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-md font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Join Now
        </button>
      </section>
    </div>
  );
};

export default Mission;