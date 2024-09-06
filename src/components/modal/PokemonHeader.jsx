import React from 'react';

const PokemonHeader = ({ name, id, onClose, typeColor }) => {
    return (
        <div className={`${typeColor} p-4 flex justify-between items-center rounded-t-lg`}>
            <div className="flex items-center">
                <h2 className="text-2xl font-bold text-white mr-2 uppercase">{name}</h2>
                <span className="text-lg text-white opacity-70">#{id.toString().padStart(3, '0')}</span>
            </div>
            <div className="flex items-center">
                <button onClick={onClose} className="text-white hover:text-gray-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PokemonHeader;
