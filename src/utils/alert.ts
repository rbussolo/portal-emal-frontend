import Swal from "sweetalert2";

import { AxiosError } from "axios";

import { IRequestError } from "../contexts/AuthProvider/types";
import { AlertType } from "../components/Alert";

interface IErrorProps {
  message?: string;
  error?: IRequestError;
}

const Alert = {
  showRequestError(error: IRequestError) {
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
  }, 
  showMessageError(message: string) {
    Swal.fire({
      title: "Erro!",
      text: message,
      icon: "error",
      confirmButtonText: "Fechar"
    });
  },
  showAxiosError(error: AxiosError): void {
    if (error.response?.data) {
      this.showRequestError(error.response?.data as IRequestError);
    } else if (error.code === 'ERR_NETWORK') {
      this.showMessageError("Ocorreu um erro na comunicação com o servidor, parece que ele esta Offline.");
    }
  },
  showError({ message, error }: IErrorProps): void {
    if (message) {
      this.showMessageError(message);
    } else if (error) {
      this.showRequestError(error);
    }
  },
  showSuccess(message: string): void {
    Swal.fire({
      title: "Sucesso!",
      text: message,
      icon: "success",
      confirmButtonText: "Fechar"
    });
  },
  showInfo(message: string): void {
    Swal.fire({
      title: "Informação!",
      html: message,
      icon: "info",
      confirmButtonText: "Fechar"
    });
  },
  showModal(message: string, type: string): void {
    Swal.fire({
      title: type === AlertType.success ? "Sucesso!" : "Erro!",
      text: message,
      icon: type === AlertType.success ? "success" : "error",
      confirmButtonText: "Fechar"
    });
  },
  showConfirm(message: string, onConfirmed?: () => void, onNotConfirmed?: () => void): void {
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
}

export { Alert }