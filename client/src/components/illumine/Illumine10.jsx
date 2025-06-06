import React from 'react';

const Illumine10 = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">ILLUMINE 2010</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <img src="/assets/illumine10/photo1.jpg" alt="ILLUMINE 2010" className="w-full h-64 object-cover rounded-lg shadow-lg" />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <img src="/assets/illumine10/photo2.jpg" alt="ILLUMINE 2010" className="w-full h-64 object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Illumine10;