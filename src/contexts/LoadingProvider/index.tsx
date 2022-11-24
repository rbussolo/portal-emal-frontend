import { createContext, useContext, useState } from 'react';
import './index.css';

export interface ILoadingContext {
  showLoading: () => void;
  hideLoading: () => void;
}

interface ILoadingProvider {
  children: JSX.Element;
}

const LoadingContext = createContext<ILoadingContext>({} as ILoadingContext);

const LoadingProvider = ({ children }: ILoadingProvider) => {
  const [loading, setLoading] = useState(false);

  function showLoading(): void {
    setLoading(true);
  }

  function hideLoading(): void {
    setLoading(false);
  }

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}

      { loading ? (
        <div className="loading">
          <div className="box">
            <div className="b b1"></div>
            <div className="b b2"></div>
            <div className="b b3"></div>
            <div className="b b4"></div>
          </div>
        </div>
      ) : null }
    </LoadingContext.Provider>
  )
}

const useLoading = () => {
  const context = useContext(LoadingContext);

  return context;
}

export { LoadingContext, LoadingProvider, useLoading };