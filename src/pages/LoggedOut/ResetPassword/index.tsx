/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { AlertProps } from "../../../components/Alert";
import { FormEvent, useEffect, useState } from "react";
import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/Button";
import { request } from "../../../services/request";
import { IRequestError } from "../../../contexts/AuthProvider/types";
import { Api } from "../../../services/api";
import { Template } from "../components/Template";
import { Option, Options } from "../components/Options";

function ResetPassword() {
  const [alert, setAlert] = useState({} as AlertProps);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function checkToken() {
      try {
        await Api.post("user/checkToken/" + token);
      } catch(error) {
        navigate("/login");
      }
    }

    checkToken();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (newPassword !== newPasswordAgain) {
      setAlert({ message: "As senhas informadas devem ser iguais." });
    } else {
      setLoading(true);

      const data = { password: newPassword };

      const result = await request({ method: "post", url: 'user/resetPassword/' + token, data: data });

      if ('message' in result && result.message !== "Senha alterada com sucesso!") {
        const requestError = result as IRequestError;

        setAlert({ message: requestError.message });
      } else {
        navigate("/login");
      }

      setLoading(false);
    }
  }

  return (
    <>
      <Template
        title="Portal de Atendimento"
        description="#definirNovaSenha"
        alertMessage={alert.message}
        alertType={alert.type}
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