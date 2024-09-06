import React from 'react';

const Card = React.forwardRef(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col w-full overflow-hidden ${className || ''}`}
    {...props}
  >
    {children}
  </div>
));

Card.displayName = 'Card';

export const CardBody = ({ children, className }) => (
  <div className={`flex flex-col bg-white dark:bg-gray-700 border shadow-md rounded-md overflow-hidden ${className || ''}`}>
    {children}
  </div>
);

CardBody.displayName = 'CardBody';

export const CardHeader = ({ children, className }) => (
  <div className={`flex flex-1 justify-center items-center border-b h-10 ${className || ''}`}>
    {children}
  </div>
);

CardHeader.displayName = 'CardHeader';

export const CardNumber = ({ children, className }) => (
  <h3 className={`flex px-2 justify-center items-center font-bold text-white h-full w-4/12 ${className || ''}`}>
    {children}
  </h3>
);

CardNumber.displayName = 'CardNumber';

export const CardName = ({ children, className }) => (
  <h3 className={`flex justify-center items-center h-full text-white w-full ${className || ''}`}>
    {children}
  </h3>
);

CardName.displayName = 'CardName';

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className || ''}`}>
    {children}
  </div>
);

CardContent.displayName = 'CardContent';

export default Card;