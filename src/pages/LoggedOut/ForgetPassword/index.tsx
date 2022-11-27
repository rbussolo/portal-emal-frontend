/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from "react";
import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/Button";
import { useTimer } from "../../../contexts/TimerData";
import { maskCpfCnpj } from "../../../utils/mask";
import { Option, Options } from "../../../components/Options";
import { api } from "../../../services/api";
import { useAlert } from "../../../contexts/AlertProvider";
import { TitlePage } from "../../../components/TitlePage";
import { Container } from "./styles";
import { useLoading } from "../../../contexts/LoadingProvider";

function ForgetPassword() {
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [isWaiting, setWaiting] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const timer = useTimer(); 
  const TIMER_TAG = "FORGOT_PASSWORD";
  const alert = useAlert();
  const load = useLoading();

  useEffect(() => {
    const dataStorage = timer.hasTimer(TIMER_TAG);
    
    if(dataStorage.isAlive && dataStorage.data) {
      setCpfCnpj(dataStorage.data.data.cpf_cnpj);
      setEmail(dataStorage.data.data.email);
      
      alert.showSuccess("Foi enviado um e-mail com instruções para continuar o cadastro, favor verifique.");
      setWaiting(true);

      timer.startUpdate({
        timer,
        tag: TIMER_TAG,
        update: seconds => setSeconds(seconds),
        stop: () => { setWaiting(false); }
      });
    }
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    load.showLoading();

    api.post('auth/forgotPassword', { cpf_cnpj: cpfCnpj, email }).then(response => {
      alert.showSuccess("Foi enviado um e-mail com instruções para resetar sua senha, favor verifique.");
      setWaiting(true);

      timer.startTimer(TIMER_TAG, { cpf_cnpj: cpfCnpj, email });
      timer.startUpdate({
        timer,
        tag: TIMER_TAG,
        update: seconds => setSeconds(seconds),
        stop: () => { setWaiting(false); }
      });
    }).catch(err => {
      alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  return (
    <>
      <Container>
        <div>
          <TitlePage title="Portal de Atendimento" description="#esqueceuSuaSenha" />
      
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

            <Button type="submit" buttonClass="btn-primary" isLoading={isWaiting} label={!isWaiting ? "Solicitar nova senha" : "Aguarde um momento"}></Button>
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
        </div>
      </Container>
    </>
  );
}

export { ForgetPassword }