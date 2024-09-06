import { useState, useCallback } from 'react';

export const useGenerationFilter = (generations) => {
    const [selectedGeneration, setSelectedGeneration] = useState(null);

    const toggleGeneration = useCallback((gen) => {
        setSelectedGeneration(prev => prev === gen ? null : gen);
    }, []);

    const isGenerationFiltered = useCallback((pokemonGeneration) =>
        selectedGeneration === null || selectedGeneration === pokemonGeneration,
    [selectedGeneration]);

    return { selectedGeneration, toggleGeneration, isGenerationFiltered };
};
