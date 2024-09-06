import React from 'react';
import StatBar from '../ui/StatBar';
import TypeBadge from '../ui/TypeBadge';

const PokemonInfo = ({ description, stats, types }) => {
    console.log("Stats received in PokemonInfo:", stats);

    return (
        <div className="flex-1 p-4">
            <p className="mb-4">{description}</p>
            <h3 className="font-bold mb-2">Stats:</h3>
            <div className="space-y-2">
                {stats && stats.map((stat, index) => {
                    if (!stat || !stat.stat) {
                        return null;
                    }
                    return (
                        <div key={index} className="flex items-center">
                            <span className="w-24 text-sm capitalize">
                                {stat.stat.name ? stat.stat.name.replace('-', ' ') : 'Unknown'}:
                            </span>
                            <StatBar value={stat.base_stat || 0} maxValue={255} />
                            <span className="ml-2 text-sm">{stat.base_stat || 0}</span>
                        </div>
                    );
                })}
            </div>
            <h3 className="font-bold mt-4 mb-2">Types:</h3>
            <div className="flex flex-wrap gap-2">
                {types && types.map((type, index) => (
                    <TypeBadge key={index} type={type} />
                ))}
            </div>
        </div>
    );
};

export default PokemonInfo;
