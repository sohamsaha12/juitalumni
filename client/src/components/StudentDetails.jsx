import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const StudentDetails = ({ batch }) => {
  const [pdfExists, setPdfExists] = useState(true);
  const pdfPath = `/assets/student_details/${batch}.pdf`;

  useEffect(() => {
    const checkPdfExists = async () => {
      try {
        const response = await fetch(pdfPath);
        if (!response.ok) {
          throw new Error('PDF not found');
        }
        setPdfExists(true);
      } catch (error) {
        setPdfExists(false);
      }
    };

    checkPdfExists();
  }, [pdfPath]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Student Details for {batch}</h2>
      <div className="h-96 overflow-auto">
        {pdfExists ? (
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer fileUrl={pdfPath} onError={() => setPdfExists(false)} />
          </Worker>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-700">
            Coming soon
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;