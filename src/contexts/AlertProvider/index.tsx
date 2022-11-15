import Swal from "sweetalert2";
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.css';

import { createContext, useContext } from 'react';

import { AlertType } from '../../components/Alert';

interface IAlertProvider {
  children: JSX.Element;
}

export interface IAlertContext {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showInfo: (message: string) => void;
  showModal: (message: string, type: string) => void;
}

const AlertContext = createContext<IAlertContext>({} as IAlertContext);

const AlertProvider = ({ children }: IAlertProvider) => {
  function showError(message: string): void {
    Swal.fire({
      title: "Erro!",
      text: message,
      icon: "error",
      confirmButtonText: "Fechar"
    });
  }

  function showSuccess(message: string): void {
    Swal.fire({
      title: "Sucesso!",
      text: message,
      icon: "success",
      confirmButtonText: "Fechar"
    });
  }

  function showInfo(message: string): void {
    Swal.fire({
      title: "Informação!",
      html: message,
      icon: "info",
      confirmButtonText: "Fechar"
    });
  }

  function showModal(message: string, type: string): void {
    Swal.fire({
      title: type === AlertType.success ? "Sucesso!" : "Erro!",
      text: message,
      icon: type === AlertType.success ? "success" : "error",
      confirmButtonText: "Fechar"
    });
  }

  return (
    <AlertContext.Provider value={{ showError, showSuccess, showInfo, showModal }}>
      {children}
    </AlertContext.Provider>
  )
}

const useAlert = () => {
  const context = useContext(AlertContext);

  return context;
}

export { AlertContext, AlertProvider, useAlert };