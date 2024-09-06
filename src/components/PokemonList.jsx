import React, { useState, useCallback, useRef, useEffect } from 'react';
import Header from './list/Header';
import PokemonModal from './PokemonModal';
import TypeFilter from './list/TypeFilter';
import GenerationFilter from './list/GenerationFilter';
import PokemonCard from './list/PokemonCard';
import { useTypeFilter } from '../hooks/useTypeFilter';
import { useGenerationFilter } from '../hooks/useGenerationFilter';
import { useTheme } from '../utils/ThemeContext';

import { POKEMON_TYPES, GENERATIONS, API_BASE_URL, MAX_POKEMON_ID } from '../utils/constants';

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nextUrl, setNextUrl] = useState(`${API_BASE_URL}/pokemon-species?limit=50`);
    const [hasMore, setHasMore] = useState(true);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [totalPokemon, setTotalPokemon] = useState(MAX_POKEMON_ID);
    const [showFilters, setShowFilters] = useState(false);
    const scrollContainerRef = useRef(null);
    const observer = useRef();

    const { selectedTypes, toggleType, isTypeFiltered, getTypeMatchLevel } = useTypeFilter(POKEMON_TYPES);
    const { selectedGeneration, toggleGeneration, isGenerationFiltered } = useGenerationFilter(GENERATIONS);
    const { isDarkMode, toggleTheme } = useTheme();

    const isFiltered = useCallback((p) => {
        return isTypeFiltered(p.types) && isGenerationFiltered(p.generation);
    }, [isTypeFiltered, isGenerationFiltered]);

    const lastPokemonElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchPokemon();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const fetchPokemon = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const response = await fetch(nextUrl);
            const data = await response.json();
            const newPokemon = await Promise.all(data.results.map(async (species) => {
                const speciesResponse = await fetch(species.url);
                const speciesData = await speciesResponse.json();
                const pokemonResponse = await fetch(`${API_BASE_URL}/pokemon/${speciesData.id}`);
                const pokemonData = await pokemonResponse.json();
                
                const pokemon = {
                    id: speciesData.id,
                    name: speciesData.name,
                    types: pokemonData.types.map(t => t.type.name.toLowerCase()),
                    image: pokemonData.sprites.other['official-artwork'].front_default,
                    generation: parseInt(speciesData.generation.url.split('/')[6]),
                    uniqueId: `${speciesData.id}-${speciesData.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`
                };                
                return pokemon;
            }));

            setPokemon(prev => {
                const uniquePokemon = [...prev, ...newPokemon].reduce((acc, current) => {
                    const x = acc.find(item => item.uniqueId === current.uniqueId);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
                return uniquePokemon;
            });
            setNextUrl(data.next);
            setHasMore(data.next !== null && newPokemon[newPokemon.length - 1].id < MAX_POKEMON_ID);
        } catch (error) {
            console.error("Erreur lors de la récupération des espèces de Pokmon:", error);
            setError("Échec de la récupération des espèces de Pokémon");
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, nextUrl]);

    useEffect(() => {
        fetchPokemon();
    }, []);

    useEffect(() => {
        const fetchTotalPokemon = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/pokemon-species`);
                const data = await response.json();
                setTotalPokemon(data.count);
            } catch (error) {
                console.error("Error fetching total Pokemon count:", error);
                setError("Failed to fetch total Pokemon count");
            }
        };
        fetchTotalPokemon();
    }, []);

    const handlePokemonClick = useCallback(async (pokemon) => {
        try {
            const response = await fetch(`${API_BASE_URL}/pokemon/${pokemon.id}`);
            const detailedData = await response.json();
            
            const speciesResponse = await fetch(`${API_BASE_URL}/pokemon-species/${pokemon.id}`);
            const speciesData = await speciesResponse.json();

            const enhancedPokemon = {
                ...pokemon,
                height: detailedData.height,
                weight: detailedData.weight,
                abilities: detailedData.abilities.map(a => a.ability.name),
                stats: detailedData.stats.map(s => ({
                    name: s.stat.name,
                    value: s.base_stat
                })),
                description: speciesData.flavor_text_entries.find(entry => entry.language.name === 'fr')?.flavor_text || 'Description non disponible'
            };

            setSelectedPokemon(enhancedPokemon);
        } catch (error) {
            console.error("Erreur lors de la récupération des détails du Pokémon:", error);
        }
    }, []);

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
        
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
            <Header 
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
            />
            <div className={`md:sticky md:top-16 bg-gray-100 dark:bg-gray-900 z-10 p-4 ${showFilters ? 'block' : 'hidden'}`}>
                <div className="container mx-auto flex flex-col md:flex-row justify-between">
                    <TypeFilter selectedTypes={selectedTypes} toggleType={toggleType} />
                    <GenerationFilter selectedGeneration={selectedGeneration} toggleGeneration={toggleGeneration} />
                </div>
            </div>
            <div className="flex-grow overflow-auto " ref={scrollContainerRef}>
                <div className="container mx-auto px-2 sm:px-4 lg:px-8 pt-4 mb-8">
                    {loading && pokemon.length === 0 ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                            {pokemon.map((p, index) => {
                                const isFilteredOut = !isFiltered(p);
                                const typeMatchLevel = getTypeMatchLevel(p.types);
                                return (
                                    <PokemonCard
                                        key={p.uniqueId}
                                        pokemon={p}
                                        isFilteredOut={isFilteredOut}
                                        onClick={() => {
                                            if (!isFilteredOut) {
                                                handlePokemonClick(p);
                                            }
                                        }}
                                        ref={index === pokemon.length - 1 ? lastPokemonElementRef : null}
                                        typeMatchLevel={typeMatchLevel}
                                        isGenerationFiltered={isGenerationFiltered(p.generation)}
                                    />
                                );
                            })}
                        </div>
                    )}
                    {loading && pokemon.length > 0 && (
                        <div className="text-center">Loading more...</div>
                    )}
                </div>
            </div>
            {selectedPokemon && (
                <PokemonModal
                    pokemon={selectedPokemon}
                    onClose={() => {
                        setSelectedPokemon(null);
                    }}
                />
            )}
        </div>
    );
};

export default PokemonList;
