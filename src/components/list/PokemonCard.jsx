import React from 'react';
import { TYPE_COLORS, GENERATION_BG_COLORS } from '../../utils/constants';
import Image from 'next/image';

const PokemonCard = React.forwardRef(({ pokemon, isFilteredOut, onClick, typeMatchLevel, isGenerationFiltered }, ref) => {
    const getTypeColor = (type) => {
        const normalizedType = type.toLowerCase();
        return TYPE_COLORS[normalizedType] || 'bg-gray-300';
    };

    const getGenerationColor = (generation) => {
        return GENERATION_BG_COLORS[generation] || 'bg-gray-300';
    };

    const primaryType = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0] : 'normal';
    const secondaryType = pokemon.types && pokemon.types.length > 1 ? pokemon.types[1] : primaryType;

    const primaryColor = getTypeColor(primaryType);
    const secondaryColor = getTypeColor(secondaryType);
    const generationColor = getGenerationColor(pokemon.generation);

    const glowColor = !isFilteredOut && isGenerationFiltered
        ? typeMatchLevel === 'full' 
            ? 'shadow-green-500' 
            : typeMatchLevel === 'partial' 
                ? 'shadow-yellow-500' 
                : ''
        : '';

    return (
        <div className={`transition-opacity duration-300 ${isFilteredOut ? 'opacity-30' : ''}`}>
            <div
                ref={ref}
                onClick={onClick}
                className={`bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-shadow duration-200 
                    ${isFilteredOut ? 'cursor-default' : 'cursor-pointer hover:shadow-lg'}
                    ${glowColor ? `shadow-lg ${glowColor}` : ''}`}
            >
                <div className={`p-4 flex text-white text-xl uppercase justify-start gap-2 items-center ${generationColor}`}>
                    <span className="">{pokemon.id}</span>
                    <span className="">
                        {pokemon.name}
                    </span>
                </div>
                <div className="p-4">
                    <div className="relative w-full pb-[100%]">
                        <Image
                            src={pokemon.image}
                            alt={pokemon.name}
                            layout="fill"
                            objectFit="contain"
                            className="absolute top-0 left-0 w-full h-full"
                        />
                    </div>
                    <div className="mt-2 flex justify-center space-x-2">
                        {pokemon.types && pokemon.types.map((type, index) => {
                            const typeColor = getTypeColor(type);
                            return (
                                <span key={index} className={`text-white text-xs px-2 py-1 rounded ${typeColor}`}>
                                    {type}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
});

PokemonCard.displayName = 'PokemonCard';

export default PokemonCard;