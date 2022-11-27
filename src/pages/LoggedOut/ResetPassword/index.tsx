/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/Button";
import { api } from "../../../services/api";
import { Option, Options } from "../../../components/Options";
import { useAlert } from "../../../contexts/AlertProvider";
import { Container } from "./styles";
import { TitlePage } from "../../../components/TitlePage";
import { useLoading } from "../../../contexts/LoadingProvider";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  
  const { token } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const loading = useLoading();

  useEffect(() => {
    loading.showLoading();

    api.post("auth/checkToken/" + token).catch(() => {
      navigate("/login", { state: { tokenError: true } });
    }).finally(() => {
      loading.hideLoading();
    });
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (newPassword !== newPasswordAgain) return alert.showError({ message: "As senhas informadas devem ser iguais." });
    
    loading.showLoading();

    api.post('auth/resetPassword/' + token, { password: newPassword }).then(response => {
      navigate("/login", { state: { passwordChanged: true } });
    }).catch(err => {
      alert.showAxiosError(err);
    }).finally(() => {
      loading.hideLoading();
    });
  }

  return (
    <>
      <Container>
        <div>
          <TitlePage title="Portal de Atendimento" description="#definirNovaSenha" />
      
          <form onSubmit={handleSubmit}>
            <InputGroup
              groupClass="mb-1"
              name="password"
              label="Senha"
              type="password"
              placeholder="Nova senha"
              value={newPassword}
              onChange={event => setNewPassword(event.target.value)}
            />

            <InputGroup
              groupClass="mb-3"
              name="passwordAgain"
              label="Senha novamente"
              type="password"
              placeholder="Nova senha novamente"
              value={newPasswordAgain}
              onChange={event => setNewPasswordAgain(event.target.value)}
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