/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from "react";
import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/Button";
import { maskCnpj } from "../../../utils/mask";
import { useTimer } from "../../../contexts/TimerData";
import { Option, Options } from "../../../components/Options";
import { api } from "../../../services/api";
import { useAlert } from "../../../contexts/AlertProvider";
import { ButtonLikeLink, Container } from "./styles";
import { TitlePage } from "../../../components/TitlePage";
import { IRequestError } from "../../../contexts/AuthProvider/types";

function FirstAccess() {
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isWaiting, setWaiting] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const timer = useTimer(); 
  const TIMER_TAG = "FIRST_ACCESS";
  const alert = useAlert();

  useEffect(() => {
    const dataStorage = timer.hasTimer(TIMER_TAG);
    
    if(dataStorage.isAlive && dataStorage.data) {
      setCnpj(dataStorage.data.data.cpf_cnpj);
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

    api.post('auth/migrate', { cpf_cnpj: cnpj, email }).then(() => {
      alert.showSuccess("Foi enviado um e-mail com instruções para continuar o cadastro, favor verifique.");
      setWaiting(true);

      timer.startTimer(TIMER_TAG, { cpf_cnpj: cnpj, email });
      timer.startUpdate({
        timer,
        tag: TIMER_TAG,
        update: seconds => setSeconds(seconds),
        stop: () => { setWaiting(false); }
      });
    }).catch(err => {
      alert.showError({ error: err.response.data as IRequestError });
    }).finally(() => {
      setLoading(false);
    });
  }

  async function handleForgetEmail() {
    if (!cnpj) return alert.showError({ message: "É necessário informar o CNPJ da empresa!" });

    setLoading(true);

    api.post('auth/forgotEmail', { cpf_cnpj: cnpj }).then(response => {
      alert.showInfo("O e-mail cadastrado para este CNPJ é: <br /><b>" + response.data.email + "</b>");
    }).catch(err => {
      alert.showError({ error: err.response.data as IRequestError });
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <>
      <Container>
        <div>
          <TitlePage title="Portal de Atendimento" description="#primeiroAcesso" />

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

            <div className="mb-3">
              <div>
                <label htmlFor="email" className="form-label">E-mail:</label>
                <ButtonLikeLink as="a" onClick={handleForgetEmail}>Esqueceu o e-mail?</ButtonLikeLink>
              </div>
              <input id="email" name="email" type="email" placeholder="E-mail de contato" value={email} onChange={event => setEmail(event.target.value)} className="form-control" />
            </div>

            <Button type="submit" buttonClass="btn-primary" isLoading={isLoading || isWaiting} label={!isWaiting ? "Solicitar Acesso" : "Aguarde um momento"}></Button>
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

export { FirstAccess }