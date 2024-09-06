import React from 'react';
import Image from 'next/image';
import Card from '../ui/Card';
import { CardBody, CardContent } from '../ui/Card';

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
                        <div className="relative w-full pb-[100%] mb-2">
                            <Image 
                                src={form.image} 
                                alt={form.name} 
                                layout="fill"
                                objectFit="contain"
                                className="absolute top-0 left-0 w-full h-full"
                            />
                        </div>
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
            <h3 className="text-xl font-bold mb-2">Formes</h3>
            <div className="flex flex-wrap -mx-2">
                {forms.map(renderFormCard)}
            </div>
        </div>
    );
};

export default PokemonForms;
