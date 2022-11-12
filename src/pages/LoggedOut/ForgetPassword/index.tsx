/* eslint-disable react-hooks/exhaustive-deps */
import { AlertProps, AlertType } from "../../../components/Alert";
import { FormEvent, useEffect, useState } from "react";
import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/Button";
import { request } from "../../../services/request";
import { IRequestError } from "../../../contexts/AuthProvider/types";
import { useTimer } from "../../../contexts/TimerData";
import { maskCpfCnpj } from "../../../utils/mask";
import { Template } from "../components/Template";
import { Option, Options } from "../components/Options";

function ForgetPassword() {
  const [alert, setAlert] = useState({} as AlertProps);
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isWaiting, setWaiting] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const timer = useTimer(); 
  const TIMER_TAG = "FORGOT_PASSWORD";

  useEffect(() => {
    const dataStorage = timer.hasTimer(TIMER_TAG);
    
    if(dataStorage.isAlive && dataStorage.data) {
      setCpfCnpj(dataStorage.data.data.cpf_cnpj);
      setEmail(dataStorage.data.data.email);
      
      setAlert({ type: AlertType.success, message: "Foi enviado um e-mail com instruções para continuar o cadastro, favor verifique." });
      setWaiting(true);

      const interval = setInterval(() => updateTimer(interval), 1000) as NodeJS.Timer;

      updateTimer();
    }
  }, []);

  function updateTimer(intervalId?: number | NodeJS.Timer) {
    const dataStorage = timer.hasTimer(TIMER_TAG);

    if (dataStorage.isAlive && dataStorage.data) {
      const s = dataStorage.data?.startAt + 30 - Math.floor(Date.now() / 1000);

      setSeconds(s);
    } else {
      setWaiting(false);
      clearInterval(intervalId);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    const data = { cpf_cnpj: cpfCnpj, email };

    const result = await request({ method: "post", url: 'user/forgotPassword', data: data });
    
    if ('message' in result && result.message !== "E-mail enviado com sucesso!") {
      const requestError = result as IRequestError;

      setAlert({ message: requestError.message });
    } else {
      setAlert({ type: AlertType.success, message: "Foi enviado um e-mail com instruções para resetar sua senha, favor verifique." });
      setWaiting(true);

      const interval = setInterval(() => { updateTimer(interval) }, 1000);

      timer.startTimer(TIMER_TAG, data);

      updateTimer();
    }

    setLoading(false);
  }

  return (
    <>
      <Template
        title="Portal de Atendimento"
        description="#esqueceuSuaSenha"
        alertMessage={alert.message}
        alertType={alert.type}
      >
        <form onSubmit={handleSubmit}>
          <InputGroup
            groupClass="mb-1"
            name="cpfCnpj"
            label="CPF/CNPJ"
            type="text"
            placeholder="CPF/CNPJ"
            value={cpfCnpj}
            onChange={event => setCpfCnpj(maskCpfCnpj(event.target.value))}
          />

          <InputGroup
            groupClass="mb-3"
            name="email"
            label="E-mail"
            type="email"
            placeholder="E-mail de contato"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <Button type="submit" buttonClass="btn-primary" isLoading={isLoading || isWaiting} label={!isWaiting ? "Solicitar nova senha" : "Aguarde um momento"}></Button>
          { 
            isWaiting ? (
              <div className="waiting">
                Aguarde por {seconds} segundo(s) para realizar uma nova solicitação.
              </div>
              ) : null
          }
        </form>

        <Options>
          <Option link="/login" linkDescription="Clique aqui" description=" para acessar sua conta." />
        </Options>
      </Template>
    </>
  );
}

export { ForgetPassword }