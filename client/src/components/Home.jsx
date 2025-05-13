import React from "react";
import smcc from "../assets/smcc.jpg"; // Adjust the path as necessary
import Nota from "./Nota";
import peopleData from "./peopleData";
import { useNavigate } from "react-router-dom";

export default function Body() {
  const navigate = useNavigate();
  const handleLearnMoreClick = () => {
    navigate("/mission");
  };
  const handleDiscoverMoreClick = () => {
    navigate('/achievement');
  };
  const handleViewEventsClick = () => {
    navigate('/events');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Image with Text Overlay */}
      <section className="relative mb-8">
        <img
          src={smcc}
          alt="Welcome to the JU IT Alumni"
          className="w-full h-100 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white px-4 md:px-8 py-2 md:py-4 rounded-lg shadow-2xl bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent transform translate-y-1/4 font-poppins">
            Welcome to the JU IT Alumni
          </h1>
        </div>
      </section>

      <section className="mb-8 p-4 md:p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-blue-800">Our Mission</h1>
        <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
          The mission of the Alumni Management Association of Jadavpur University Department of Information Technology is to foster a lifelong relationship between the university and its alumni. We aim to create a vibrant community of graduates who are engaged, informed, and inspired to contribute to the growth and development of the department and the university. Through various initiatives, events, and programs, we strive to support the professional and personal growth of our alumni, while also promoting the values of excellence, innovation, and collaboration that define our institution.
        </p>
        <button
          className="mt-4 md:mt-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-md font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={handleLearnMoreClick}
        >
          Learn More
        </button>
      </section>

      <section className="mb-8 p-4 md:p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-blue-800">Notable Alumnis</h2>
        <Nota people={peopleData} />
      </section>

      <section className="mb-8 p-4 md:p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">Achievement</h1>
        <p className="text-lg text-gray-800">
          Jadavpur University Department of Information Technology has produced numerous distinguished alumni who have made significant contributions in various fields. Some notable achievements include:
          <ul className="list-disc list-inside mt-2">
            <li>Dr. Ujjawl Dutta, Computer Scientist at Adobe.</li>
            <li>Mr. Arnab Ghatak, a lead Software Engineer at Google.</li>
            <li>Mr. Anuran Chakraborty, software engineer II at Amazon.</li>
            <li>Ms. Sayandip Ghosh, software engineer at Microsoft.</li>
          </ul>
        </p>
        <button
          className="mt-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={handleDiscoverMoreClick}
        >
          Discover More
        </button>
      </section>

      <section className="p-4 md:p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">Events</h1>
        <p className="text-lg text-gray-800">
          The Jadavpur University Information Technology Alumni Association hosts a variety of events throughout the year to engage and connect alumni. These events include bi-annual reunions, networking sessions, guest lectures by distinguished alumni, workshops, and webinars on the latest trends in technology. These gatherings provide a platform for alumni to share their experiences, gain insights from industry leaders, and foster professional and personal growth. Join us at our next event to reconnect with old friends, make new connections, and stay updated with the advancements in the field of Information Technology.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={handleViewEventsClick}
        >
          View Events
        </button>
      </section>
    </div>
  );
}