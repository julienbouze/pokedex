import React from 'react';
import { TYPE_COLORS } from '../../utils/constants';

const TypeBadge = ({ type, children, small = false, className = '' }) => {
    const baseClasses = `rounded-full text-white ${small ? 'text-xs px-1 py-0.5' : 'text-sm px-4 py-1'}`;
    const colorClass = TYPE_COLORS[type] || 'bg-gray-500'; // Fallback color if type is not found
    
    return (
        <span className={`${baseClasses} ${colorClass} ${className}`}>
            {children || type}
        </span>
    );
};

export default TypeBadge;
