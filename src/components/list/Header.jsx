import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faFilter } from '@fortawesome/free-solid-svg-icons';

const Header = ({ isDarkMode, toggleTheme, showFilters, setShowFilters }) => {
    return (
        <div className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold dark:text-white">Pokédex</h1>
                <div className="flex items-center">
                    <button 
                        onClick={toggleTheme}
                        className="mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                        aria-label={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
                    >
                        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                    </button>
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    >
                        <FontAwesomeIcon icon={faFilter} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
