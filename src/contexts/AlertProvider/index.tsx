import Swal from "sweetalert2";
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.css';

import { createContext, useContext } from 'react';

import { AlertType } from '../../components/Alert';
import { IRequestError } from "../AuthProvider/types";
import { AxiosError } from "axios";

interface IAlertProvider {
  children: JSX.Element;
}

interface IErrorProps {
  message?: string;
  error?: IRequestError;
}

export interface IAlertContext {
  showAxiosError: (error: AxiosError) => void;
  showError: ({ message, error }: IErrorProps) => void;
  showSuccess: (message: string) => void;
  showInfo: (message: string) => void;
  showModal: (message: string, type: string) => void;
  showConfirm: (message: string, onConfirmed?: () => void, onNotConfirmed?: () => void) => void;
}

const AlertContext = createContext<IAlertContext>({} as IAlertContext);

const AlertProvider = ({ children }: IAlertProvider) => {
  function showRequestError(error: IRequestError) {
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

  function showMessageError(message: string) {
    Swal.fire({
      title: "Erro!",
      text: message,
      icon: "error",
      confirmButtonText: "Fechar"
    });
  }

  function showAxiosError(error: AxiosError): void {
    if (error.response?.data) {
      showRequestError(error.response?.data as IRequestError);
    } else if (error.code === 'ERR_NETWORK'){
      showMessageError("Ocorreu um erro na comunicação com o servidor, parece que ele esta Offline.");
    }
  }

  function showError({ message, error }: IErrorProps): void {
    if (message) {
      showMessageError(message);
    } else if(error) {
      showRequestError(error);
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
    <AlertContext.Provider value={{ showError, showSuccess, showInfo, showModal, showConfirm, showAxiosError }}>
      {children}
    </AlertContext.Provider>
  )
}

const useAlert = () => {
  const context = useContext(AlertContext);

  return context;
}

export { AlertContext, AlertProvider, useAlert };