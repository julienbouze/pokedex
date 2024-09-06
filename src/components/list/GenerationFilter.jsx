import React from 'react';
import { GENERATIONS, GENERATION_BG_COLORS } from '../../utils/constants';

const GenerationFilter = ({ selectedGeneration, toggleGeneration }) => (
    <div className="mb-4 md:mb-0 w-full md:w-auto">
        <h3 className="text-lg dark:text-white font-semibold mb-2">Generation</h3>
        <div className="flex flex-wrap gap-2">
            {GENERATIONS.map(gen => (
                <button
                    key={gen}
                    onClick={() => toggleGeneration(gen)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors
                        ${selectedGeneration === gen 
                            ? `${GENERATION_BG_COLORS[gen]} text-white` 
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                >
                    Gen {gen}
                </button>
            ))}
        </div>
    </div>
);

export default GenerationFilter;