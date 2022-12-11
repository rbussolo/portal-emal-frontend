/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useFormik } from "formik";

import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/Button";
import { maskCnpj } from "../../../utils/mask";
import { useTimer } from "../../../contexts/TimerData";
import { Option, Options } from "../../../components/Options";
import { api } from "../../../services/api";
import { ButtonLikeLink, Container } from "./styles";
import { TitlePage } from "../../../components/TitlePage";
import { useLoading } from "../../../contexts/LoadingProvider";
import { Alert } from "../../../utils/alert";


function FirstAccess() {
  const TIMER_TAG = "FIRST_ACCESS";
  const timer = useTimer();
  const load = useLoading();

  const formik = useFormik({
    initialValues: {
      cpfCnpj: "",
      email: "",
      isWaiting: false,
      seconds: 0
    },
    onSubmit: ({ cpfCnpj, email }) => {
      load.showLoading();

      api.post('auth/migrate', { cpf_cnpj: cpfCnpj, email }).then(() => {
        Alert.showSuccess("Foi enviado um e-mail com instruções para continuar o cadastro, favor verifique.");
        formik.setFieldValue("isWaiting", true);

        timer.startTimer(TIMER_TAG, { cpf_cnpj: cpfCnpj, email });
        timer.startUpdate({
          timer,
          tag: TIMER_TAG,
          update: seconds => formik.setFieldValue("seconds", seconds),
          stop: () => { formik.setFieldValue("isWaiting", false); }
        });
      }).catch(err => {
        Alert.showAxiosError(err);
      }).finally(() => {
        load.hideLoading();
      });
    }
  });

  useEffect(() => {
    const dataStorage = timer.hasTimer(TIMER_TAG);
    
    if(dataStorage.isAlive && dataStorage.data) {
      formik.setFieldValue("cpfCnpj", dataStorage.data.data.cpf_cnpj);
      formik.setFieldValue("email", dataStorage.data.data.email);
      formik.setFieldValue("isWaiting", true);
      
      Alert.showSuccess("Foi enviado um e-mail com instruções para continuar o cadastro, favor verifique.");

      timer.startUpdate({ 
        timer, 
        tag: TIMER_TAG, 
        update: seconds => formik.setFieldValue("seconds", seconds),
        stop: () => { formik.setFieldValue("isWaiting", false); }
      });
    }
  }, []);

  async function handleForgetEmail() {
    if (!formik.values.cpfCnpj) 
      return Alert.showError({ message: "É necessário informar o CNPJ da empresa!" });

    load.showLoading();

    api.post('auth/forgotEmail', { cpf_cnpj: formik.values.cpfCnpj }).then(response => {
      Alert.showInfo("O e-mail cadastrado para este CNPJ é: <br /><b>" + response.data.email + "</b>");
    }).catch(err => {
      Alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  return (
    <>
      <Container>
        <div>
          <TitlePage title="Portal de Atendimento" description="#primeiroAcesso" />

          <form onSubmit={formik.handleSubmit}>
            <InputGroup
              groupClass="mb-1"
              name="cnpj"
              label="CNPJ"
              type="text"
              placeholder="CNPJ da empresa"
              value={formik.values.cpfCnpj}
              onChange={event => formik.setFieldValue("cpfCnpj", maskCnpj(event.target.value))}
            />

            <div className="mb-3">
              <div>
                <label htmlFor="email" className="form-label">E-mail:</label>
                <ButtonLikeLink as="a" onClick={handleForgetEmail}>Esqueceu o e-mail?</ButtonLikeLink>
              </div>
              <input id="email" name="email" type="email" placeholder="E-mail de contato" value={formik.values.email} onChange={formik.handleChange} className="form-control" />
            </div>

            <Button type="submit" buttonClass="btn-primary" isLoading={formik.values.isWaiting} label={!formik.values.isWaiting ? "Solicitar Acesso" : "Aguarde um momento"}></Button>
            { 
              formik.values.isWaiting ? (
                <div className="waiting">
                  Aguarde por {formik.values.seconds} segundo(s) para realizar uma nova solicitação.
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