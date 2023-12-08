import { PropsWithChildren, createContext, useState } from "react";
import ErrorPopin from "src/components/error/ErrorPopin";

interface ErrorContextType {
  setError: React.Dispatch<React.SetStateAction<React.JSX.Element | null>>
}
export const ErrorContext = createContext<ErrorContextType>({} as ErrorContextType);

const ErrorProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [error, setError] = useState<React.JSX.Element | null>(null);

  return (
    <ErrorContext.Provider value={{ setError }}>
      {error &&
        <ErrorPopin>
          {error}
        </ErrorPopin>
      }
      {children}
    </ErrorContext.Provider>
  )
}

export default ErrorProvider;