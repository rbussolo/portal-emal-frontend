/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from "react";
import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/Button";
import { useTimer } from "../../../contexts/TimerData";
import { maskCpfCnpj } from "../../../utils/mask";
import { Template } from "../components/Template";
import { Option, Options } from "../components/Options";
import { Api } from "../../../services/api";
import { useAlert } from "../../../contexts/AlertProvider";

function ForgetPassword() {
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isWaiting, setWaiting] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const timer = useTimer(); 
  const TIMER_TAG = "FORGOT_PASSWORD";
  const alert = useAlert();

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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    const response = await Api.post('user/forgotPassword', { cpf_cnpj: cpfCnpj, email });

    if (response.status >= 400) {
      alert.showError(response.data.message);
    } else {
      alert.showSuccess("Foi enviado um e-mail com instruções para resetar sua senha, favor verifique.");
      setWaiting(true);

      timer.startTimer(TIMER_TAG, { cpf_cnpj: cpfCnpj, email });
      timer.startUpdate({
        timer,
        tag: TIMER_TAG,
        update: seconds => setSeconds(seconds),
        stop: () => { setWaiting(false); }
      });
    }

    setLoading(false);
  }

  return (
    <>
      <Template
        title="Portal de Atendimento"
        description="#esqueceuSuaSenha"
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