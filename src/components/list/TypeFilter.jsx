import React from 'react';
import { POKEMON_TYPES, TYPE_COLORS } from '../../utils/constants';

const TypeFilter = ({ selectedTypes, toggleType }) => (
    <div className="mb-4 md:mb-0 w-full md:w-auto">
        <h3 className="text-lg dark:text-white font-semibold mb-2">Type</h3>
        <div className="flex flex-wrap gap-2">
            {POKEMON_TYPES.map(type => (
                <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors
                        ${selectedTypes.includes(type) 
                            ? `${TYPE_COLORS[type]} text-white` 
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}
                        ${selectedTypes.length === 2 && !selectedTypes.includes(type) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={selectedTypes.length === 2 && !selectedTypes.includes(type)}
                >
                    {type}
                </button>
            ))}
        </div>
    </div>
);

export default TypeFilter;
