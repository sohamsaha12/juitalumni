import React from 'react';
import PropTypes from 'prop-types';

const NalumCard = ({ name, imageFileName, year }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img
        className="w-full object-contain"
        src={require(`../assets/homenotable/${imageFileName}`)}
        alt={name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <div className="text-gray-700 text-base">Batch of {year}</div>
      </div>
    </div>
  );
};

NalumCard.propTypes = {
  name: PropTypes.string.isRequired,
  imageFileName: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default NalumCard;