import Swal from "sweetalert2";
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.css';

import { createContext, useContext } from 'react';

import { AlertType } from '../../components/Alert';
import { IRequestError } from "../AuthProvider/types";

interface IAlertProvider {
  children: JSX.Element;
}

interface IErrorProps {
  message?: string;
  error?: IRequestError;
}

export interface IAlertContext {
  showError: ({ message, error }: IErrorProps) => void;
  showSuccess: (message: string) => void;
  showInfo: (message: string) => void;
  showModal: (message: string, type: string) => void;
  showConfirm: (message: string, onConfirmed?: () => void, onNotConfirmed?: () => void) => void;
}

const AlertContext = createContext<IAlertContext>({} as IAlertContext);

const AlertProvider = ({ children }: IAlertProvider) => {
  function showError({ message, error }: IErrorProps): void {
    if (message) {
      Swal.fire({
        title: "Erro!",
        text: message,
        icon: "error",
        confirmButtonText: "Fechar"
      });
    } else {
      let htmlError = error?.message;

      if (error?.messages) {
        htmlError += '<ul style="text-align: left; margin-bottom: 0px;">';
        error?.messages.forEach(m => htmlError += '<li>' + m + '</li>');
        htmlError += '</ul>';
      } else if (error?.additionalInfo) {
        htmlError += ' <i class="fa-solid fa-circle-info sweet-icon-info" onclick="showMoreInfo(this)"></i>'
        htmlError += '<div class="sweet-more-info"><div class="sweet-more-info-options"><span class="sweet-option-copy" onclick="copyMoreInfo(this)">Copiar</span></div><div class="sweet-exception">' + error.additionalInfo + '</div></div>'
      }

      Swal.fire({
        title: "Erro!",
        html: htmlError,
        icon: "error",
        confirmButtonText: "Fechar"
      });
    }
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

  function showConfirm(message: string, onConfirmed?: () => void, onNotConfirmed?: () => void): void {
    Swal.fire({
      title: "Confirmação!",
      html: message,
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "Fechar",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if (result.isConfirmed && onConfirmed) {
        onConfirmed();
      }

      if (!result.isConfirmed && onNotConfirmed) {
        onNotConfirmed();
      }
    });
  }

  return (
    <AlertContext.Provider value={{ showError, showSuccess, showInfo, showModal, showConfirm }}>
      {children}
    </AlertContext.Provider>
  )
}

const useAlert = () => {
  const context = useContext(AlertContext);

  return context;
}

export { AlertContext, AlertProvider, useAlert };