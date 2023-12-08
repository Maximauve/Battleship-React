import React, { PropsWithChildren } from 'react';
import 'src/assets/styles/components/Error.scss';


const ErrorPopin: React.FC<PropsWithChildren> = ({ children }) => {

  if (!children) {
    return null;
  }

  return (
    <div className="error-wrapper">
      <div className="error">
        {children}
      </div>
    </div>
  );
}

export default ErrorPopin;