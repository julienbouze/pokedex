import { useState, useCallback } from 'react';

export const useTypeFilter = (types) => {
    const [selectedTypes, setSelectedTypes] = useState([]);

    const toggleType = useCallback((type) => {
        setSelectedTypes(prev => {
            if (prev.includes(type)) {
                return prev.filter(t => t !== type);
            } else if (prev.length < 2) {
                return [...prev, type];
            } else {
                return [prev[1], type]; // Remplace le plus ancien type par le nouveau
            }
        });
    }, []);

    const isTypeFiltered = useCallback((pokemonTypes) => {
        if (selectedTypes.length === 0) return true;
        if (selectedTypes.length === 1) {
            return pokemonTypes.includes(selectedTypes[0]);
        }
        return pokemonTypes.some(t => selectedTypes.includes(t));
    }, [selectedTypes]);

    const getTypeMatchLevel = useCallback((pokemonTypes) => {
        if (selectedTypes.length === 0) return 'none';
        if (selectedTypes.length === 1) {
            if (pokemonTypes.length === 1 && pokemonTypes[0] === selectedTypes[0]) return 'full';
            if (pokemonTypes.includes(selectedTypes[0])) return 'partial';
            return 'none';
        }
        if (selectedTypes.length === 2) {
            if (pokemonTypes.includes(selectedTypes[0]) && pokemonTypes.includes(selectedTypes[1])) return 'full';
            if (pokemonTypes.some(t => selectedTypes.includes(t))) return 'partial';
            return 'none';
        }
    }, [selectedTypes]);

    return { selectedTypes, toggleType, isTypeFiltered, getTypeMatchLevel };
};
