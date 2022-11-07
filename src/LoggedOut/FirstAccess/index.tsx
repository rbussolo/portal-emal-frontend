import { Header } from "../components/Header";
import { Container } from "./styles";
import { Link } from "react-router-dom";
import { TitlePage } from "../../components/TitlePage";
import { Alert, AlertProps, AlertType } from "../../components/Alert";
import { FormEvent, useEffect, useState } from "react";
import { InputGroup } from "../../components/InputGroup";
import { Button } from "../../components/Button";
import { maskCnpj } from "../../utils/mask";
import { request } from "../../services/request";
import { IRequestError } from "../../contexts/AuthProvider/types";
import { useTimer } from "../../contexts/TimerData";

function FirstAccess() {
  const [alert, setAlert] = useState({} as AlertProps);
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isWaiting, setWaiting] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const timer = useTimer(); 
  const TIMER_TAG = "FIRST_ACCESS";

  useEffect(() => {
    const dataStorage = timer.hasTimer(TIMER_TAG);
    
    if(dataStorage.isAlive && dataStorage.data) {
      setCnpj(dataStorage.data.data.cpf_cnpj);
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

    const data = { cpf_cnpj: cnpj, email };

    const result = await request({ method: "post", url: 'user/migrate', data: data });
    
    if ('message' in result) {
      const requestError = result as IRequestError;

      setAlert({ message: requestError.message });
    } else {
      setAlert({ type: AlertType.success, message: "Foi enviado um e-mail com instruções para continuar o cadastro, favor verifique." });
      setWaiting(true);

      const interval = setInterval(() => { updateTimer(interval) }, 1000);

      timer.startTimer(TIMER_TAG, data);

      updateTimer();
    }

    setLoading(false);
  }

  return (
    <>
      <Header />

      <Container>
        <div>
          <TitlePage title="Portal de Atendimento" description="#primeiroAcesso" />

          <Alert message={alert.message} type={alert.type} />

          <form onSubmit={handleSubmit}>
            <InputGroup
              groupClass="mb-1"
              name="cnpj"
              label="CNPJ"
              type="text"
              placeholder="CNPJ da empresa"
              value={cnpj}
              onChange={event => setCnpj(maskCnpj(event.target.value))}
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

            <Button type="submit" buttonClass="btn-primary" isLoading={isLoading || isWaiting} label={!isWaiting ? "Solicitar Acesso" : "Aguarde um momento"}></Button>
            { 
              isWaiting ? (
                <div className="waiting">
                  Aguarde por {seconds} segundo(s) para realizar uma nova solicitação.
                </div>
                ) : null
            }

            
          </form>

          <div className="options">
            <div>
              <Link to="login">Clique aqui</Link> para acessar sua conta.
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export { FirstAccess }