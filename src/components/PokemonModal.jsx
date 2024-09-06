import React, { useState, useEffect, useCallback } from 'react';
import PokemonHeader from './modal/PokemonHeader';
import PokemonInfo from './modal/PokemonInfo';
import PokemonForms from './modal/PokemonForms';
import { TYPE_COLORS, SCROLLBAR_COLORS } from '../utils/constants';

const PokemonModal = ({ pokemon: initialPokemon, onClose }) => {
    const [pokemon, setPokemon] = useState(initialPokemon);
    const [forms, setForms] = useState([]);
    const [currentForm, setCurrentForm] = useState(null);
    const [englishDescription, setEnglishDescription] = useState('');
    const [speciesName, setSpeciesName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${initialPokemon.id}`);
                if (!speciesResponse.ok) throw new Error(`HTTP error! status: ${speciesResponse.status}`);
                const speciesData = await speciesResponse.json();

                // Récupérer le nom de l'espèce
                setSpeciesName(speciesData.name.toUpperCase());

                const englishFlavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
                const cleanDescription = englishFlavorText 
                    ? englishFlavorText.flavor_text.replace(/[\f\n\r\t\v]/g, ' ').replace(/\s+/g, ' ').trim()
                    : 'No English description available.';
                setEnglishDescription(cleanDescription);

                const formUrls = speciesData.varieties.map(variety => variety.pokemon.url);
                const formResponses = await Promise.all(formUrls.map(url => fetch(url)));
                const formData = await Promise.all(formResponses.map(async (res) => {
                    const data = await res.json();
                    return {
                        ...data,
                        image: data.sprites.other['official-artwork'].front_default ||
                               data.sprites.other.home.front_default ||
                               data.sprites.front_default ||
                               '/path/to/fallback-image.png'
                    };
                }));

                setForms(formData);

                const defaultForm = formData.find(form => form.is_default) || formData[0];
                setCurrentForm(defaultForm);
                setPokemon(prevPokemon => ({
                    ...prevPokemon,
                    name: defaultForm.name,
                    image: defaultForm.image,
                    types: defaultForm.types.map(t => t.type.name),
                    stats: defaultForm.stats
                }));
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
                setError("Unable to load Pokémon data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPokemonData();
    }, [initialPokemon.id]);

    const handleFormSelect = useCallback((form) => {
        setPokemon(prevPokemon => ({
            ...prevPokemon,
            name: form.name,
            image: form.image,
            types: form.types.map(t => t.type.name),
            stats: form.stats
        }));
        setCurrentForm(form);
    }, []);

    if (!pokemon) return null;

    const type = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0] : 'normal';
    const typeColor = TYPE_COLORS[type];
    const scrollbarColor = SCROLLBAR_COLORS[type];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] flex flex-col shadow-lg overflow-hidden">
                <div className="sticky top-0 z-10">
                    <PokemonHeader 
                        name={speciesName}
                        id={pokemon.id} 
                        type={type}
                        onClose={onClose} 
                        typeColor={typeColor}
                    />
                </div>
                <div className={`flex-grow overflow-y-auto scrollbar-custom ${scrollbarColor} mr-2 mt-2 mb-2`}>
                    <div className="h-full pr-2">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <p className="dark:text-white">Chargement...</p>
                            </div>
                        ) : error ? (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-red-500 dark:text-red-400">{error}</p>
                            </div>
                        ) : (
                            <div className="p-4 dark:text-white">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/2 p-4">
                                        <img 
                                            src={pokemon.image} 
                                            alt={pokemon.name} 
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                    <PokemonInfo 
                                        description={englishDescription}
                                        stats={pokemon.stats}
                                        types={pokemon.types}
                                    />
                                </div>
                                {forms.length > 1 && (
                                    <PokemonForms 
                                        forms={forms}
                                        onFormSelect={handleFormSelect}
                                        currentFormName={currentForm?.name || pokemon.name}
                                        typeColor={typeColor}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonModal;