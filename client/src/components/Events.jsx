import React, { useState } from 'react';
import Illumine22 from './illumine/Illumine22';
import Illumine24 from './illumine/Illumine24';
import Illumine18 from './illumine/Illumine18';
import Illumine04 from './illumine/Illumine04';
import Illumine06 from './illumine/Illumine06';
import Illumine08 from './illumine/Illumine08';
import Illumine10 from './illumine/Illumine10';
import Illumine12 from './illumine/Illumine12';
import Illumine14 from './illumine/Illumine14';
import Illumine16 from './illumine/Illumine16';
import AlumniDay from './AlumniDay';

const illumineEvents = [
  { year: '2024', component: Illumine24 },
  { year: '2022', component: Illumine22 },
  { year: '2018', component: Illumine18 },
  { year: '2016', component: Illumine16 },
  { year: '2014', component: Illumine14 },
  { year: '2012', component: Illumine12 },
  { year: '2010', component: Illumine10 },
  { year: '2008', component: Illumine08 },
  { year: '2006', component: Illumine06 },
  { year: '2004', component: Illumine04 },
];

const Events = () => {
  const [selectedMainEvent, setSelectedMainEvent] = useState(null);
  const [selectedIllumineEvent, setSelectedIllumineEvent] = useState(null);

  const handleMainEventClick = (event) => {
    if (selectedMainEvent === event) {
      setSelectedMainEvent(null);
      setSelectedIllumineEvent(null);
    } else {
      setSelectedMainEvent(event);
      setSelectedIllumineEvent(null);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto flex">
        <div className="w-full md:w-1/3 pr-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Events</h2>
          <div className="flex flex-col space-y-4">
            <div
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleMainEventClick('Illumine')}
            >
              <h3 className="text-xl font-bold mb-2">Illumine</h3>
              <p className="text-gray-700">Click to view Illumine events by year.</p>
            </div>
            {selectedMainEvent !== 'Illumine' && (
              <div
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleMainEventClick('Alumni Day')}
              >
                <h3 className="text-xl font-bold mb-2">Alumni Day</h3>
                <p className="text-gray-700">Click to view Alumni Day event.</p>
              </div>
            )}
          </div>
          {selectedMainEvent === 'Illumine' && (
            <div className="mt-6 flex flex-col space-y-4">
              {illumineEvents.map((event) => (
                <div
                  key={event.year}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => setSelectedIllumineEvent(event)}
                >
                  <h3 className="text-xl font-bold mb-2">ILLUMINE {event.year}</h3>
                  <p className="text-gray-700">Click to view photos and details of ILLUMINE {event.year}.</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full md:w-2/3 pl-4">
          {selectedMainEvent === 'Alumni Day' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Alumni Day</h3>
              <AlumniDay />
            </div>
          )}
          {selectedMainEvent === 'Illumine' && selectedIllumineEvent && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">ILLUMINE {selectedIllumineEvent.year}</h3>
              <selectedIllumineEvent.component />
            </div>
          )}
          {!selectedMainEvent && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Select an event to view details</h3>
              <p className="text-gray-700">Click on an event from the list on the left to view photos and details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;