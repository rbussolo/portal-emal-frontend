/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/Button";
import { Api } from "../../../services/api";
import { Template } from "../components/Template";
import { Option, Options } from "../components/Options";
import { useAlert } from "../../../contexts/AlertProvider";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();

  useEffect(() => {
    async function checkToken() {
      try {
        await Api.post("user/checkToken/" + token);
      } catch(error) {
        navigate("/login", { state: { passwordChanged: true } });
      }
    }

    checkToken();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (newPassword !== newPasswordAgain) {
      alert.showError("As senhas informadas devem ser iguais.");
    } else {
      setLoading(true);

      const response = await Api.post('user/resetPassword/' + token, { password: newPassword });

      if (response.status >= 400) {
        alert.showError(response.data.message);
      } else {
        navigate("/login", { state: { passwordChanged: true } });
      }

      setLoading(false);
    }
  }

  return (
    <>
      <Template
        title="Portal de Atendimento"
        description="#definirNovaSenha"
      >
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

          <Button type="submit" buttonClass="btn-primary" isLoading={isLoading} label="Atualizar senha"></Button>
        </form>

        <Options>
          <Option link="/login" linkDescription="Clique aqui" description=" para acessar sua conta." />
        </Options>
      </Template>
    </>
  );
}

export { ResetPassword }