/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";

import { api } from "../../../services/api";
import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/Button";
import { Option, Options } from "../../../components/Options";
import { Container } from "./styles";
import { TitlePage } from "../../../components/TitlePage";
import { useLoading } from "../../../contexts/LoadingProvider";
import { Alert } from "../../../utils/alert";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const loading = useLoading();
  
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    onSubmit: ({ password, confirmPassword }) => {
      if (password !== confirmPassword)
        return Alert.showError({ message: "As senhas informadas devem ser iguais." });

      loading.showLoading();

      api.post('auth/resetPassword/' + token, { password }).then(response => {
        navigate("/login", { state: { passwordChanged: true } });
      }).catch(err => {
        Alert.showAxiosError(err);
      }).finally(() => {
        loading.hideLoading();
      });
    }
  });

  useEffect(() => {
    loading.showLoading();

    api.post("auth/checkToken/" + token).catch(() => {
      navigate("/login", { state: { tokenError: true } });
    }).finally(() => {
      loading.hideLoading();
    });
  }, []);

  return (
    <>
      <Container>
        <div>
          <TitlePage title="Portal de Atendimento" description="#definirNovaSenha" />
      
          <form onSubmit={formik.handleSubmit}>
            <InputGroup
              groupClass="mb-1"
              name="password"
              label="Senha"
              type="password"
              placeholder="Nova senha"
              value={formik.values.password}
              onChange={formik.handleChange}
            />

            <InputGroup
              groupClass="mb-3"
              name="passwordAgain"
              label="Senha novamente"
              type="password"
              placeholder="Nova senha novamente"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />

            <Button type="submit" buttonClass="btn-primary" label="Atualizar senha"></Button>
          </form>

          <Options>
            <Option link="/login" linkDescription="Clique aqui" description=" para acessar sua conta." />
          </Options>
        </div>
      </Container>
    </>
  );
}

export { ResetPassword }