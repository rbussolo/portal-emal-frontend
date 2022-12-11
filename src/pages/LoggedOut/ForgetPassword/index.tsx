/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useFormik } from "formik";

import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/Button";
import { useTimer } from "../../../contexts/TimerData";
import { maskCpfCnpj } from "../../../utils/mask";
import { Option, Options } from "../../../components/Options";
import { api } from "../../../services/api";
import { TitlePage } from "../../../components/TitlePage";
import { Container } from "./styles";
import { useLoading } from "../../../contexts/LoadingProvider";
import { Alert } from "../../../utils/alert";

function ForgetPassword() {
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

      api.post('auth/forgotPassword', { cpf_cnpj: cpfCnpj, email }).then(response => {
        Alert.showSuccess("Foi enviado um e-mail com instruções para resetar sua senha, favor verifique.");
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

  const TIMER_TAG = "FORGOT_PASSWORD";
  const timer = useTimer();

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

  return (
    <>
      <Container>
        <div>
          <TitlePage title="Portal de Atendimento" description="#esqueceuSuaSenha" />
      
          <form onSubmit={formik.handleSubmit}>
            <InputGroup
              groupClass="mb-1"
              name="cpfCnpj"
              label="CPF/CNPJ"
              type="text"
              placeholder="CPF/CNPJ"
              value={formik.values.cpfCnpj}
              onChange={event => formik.setFieldValue('cpfCnpj', maskCpfCnpj(event.target.value))}
            />

            <InputGroup
              groupClass="mb-3"
              name="email"
              label="E-mail"
              type="email"
              placeholder="E-mail de contato"
              value={formik.values.email}
              onChange={formik.handleChange}
            />

            <Button type="submit" buttonClass="btn-primary" isLoading={formik.values.isWaiting} label={!formik.values.isWaiting ? "Solicitar nova senha" : "Aguarde um momento"}></Button>
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

export { ForgetPassword }