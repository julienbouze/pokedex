import React from 'react';
import { Card, CardBody, CardContent } from '../ui/Card';

const PokemonForms = ({ forms, onFormSelect, currentFormName, typeColor }) => {
    const renderFormCard = (form) => {
        const isSelected = form.name === currentFormName;

        return (
            <Card
                key={form.name}
                className="w-1/2 sm:w-1/3 md:w-1/4 px-2 mb-4 cursor-pointer"
                onClick={() => onFormSelect(form)}
            >
                <CardBody>
                    <CardContent 
                        className={`${isSelected 
                            ? `${typeColor} text-white` 
                            : ''} rounded-lg p-2 transition-colors duration-200`}
                    >
                        <img 
                            src={form.image} 
                            alt={form.name} 
                            className="w-full h-auto object-contain mb-2"
                        />
                        <p className="text-center text-sm font-semibold">
                            {form.name.toUpperCase().replace(/-/g, ' ')}
                        </p>
                    </CardContent>
                </CardBody>
            </Card>
        );
    };

    return (
        <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Different forms</h3>
            <div className="flex flex-wrap -mx-2">
                {forms.map(renderFormCard)}
            </div>
        </div>
    );
};

export default PokemonForms;
