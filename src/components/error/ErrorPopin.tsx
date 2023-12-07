import React, { PropsWithChildren } from 'react';
import 'src/assets/styles/components/Error.scss';


const ErrorPopin: React.FC<PropsWithChildren> = ({ children }) => {

  return (
    <div className="error">
      {children}
    </div>
  );
}

export default ErrorPopin;