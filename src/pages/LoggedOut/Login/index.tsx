/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useFormik } from "formik";

import { useAuth } from "../../../contexts/AuthProvider/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/Button";
import { Option, Options } from "../../../components/Options";
import { Container } from "./styles";
import { TitlePage } from "../../../components/TitlePage";
import { useLoading } from "../../../contexts/LoadingProvider";
import { Alert } from "../../../utils/alert";


function Login(){
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const load = useLoading();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: ({ email, password }) => {
      load.showLoading();

      auth.authenticate(email, password).then(() => {
        navigate("/home");
      }).catch(err => {
        Alert.showAxiosError(err);
      }).finally(() => {
        load.hideLoading();
      });
    }
  })

  useEffect(() => {
    if (location.state?.passwordChanged === true) {
      Alert.showSuccess("Operação realizada com sucesso!");
      
      window.history.replaceState({}, document.title);
    } else if (location.state?.tokenError === true) {
      Alert.showError({ message: "Alteração de senha inválida, tempo limite atingido ou alteração já realizada, realiza uma nova alteração se necessário!" });

      window.history.replaceState({}, document.title);
    }
  }, []);

  return (
    <>
      <Container>
        <div>
          <TitlePage title="Portal de Atendimento" description="#acesseSuaConta" />
        
          <form onSubmit={formik.handleSubmit}>
            <InputGroup 
              groupClass="mb-1" 
              name="email" 
              label="Usuário (E-mail)" 
              type="email" 
              placeholder="E-mail do usuário"
              value={formik.values.email} 
              onChange={formik.handleChange} 
            />
            
            <InputGroup
              groupClass="mb-3"
              name="password"
              label="Senha"
              type="password"
              placeholder="Senha do usuário"
              value={formik.values.password}
              onChange={formik.handleChange}
            />

            <Button type="submit" buttonClass="btn-primary" label="Entrar"></Button>
          </form>

          <Options>
            <Option link="/first-access" linkDescription="Clique aqui" description=" caso seja o primeiro acesso." />
            <Option link="/forget-password" linkDescription="Clique aqui" description=" caso tenha esquecido a senha." />
          </Options>
        </div>
      </Container>
    </>
  );
}

export { Login };