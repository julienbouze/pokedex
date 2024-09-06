import React from 'react';

const StatBar = ({ value, maxValue }) => {
    const percentage = (value / maxValue) * 100;
    const getColor = (value) => {
        if (value < 40) return 'bg-red-500';
        if (value < 80) return 'bg-yellow-500';
        if (value < 140) return 'bg-green-500';
        return 'bg-purple-500';
    };

    const barColor = getColor(value);
    
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
                className={`${barColor} h-2.5 rounded-full`} 
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

export default StatBar;
