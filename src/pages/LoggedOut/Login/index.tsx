/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useState, useEffect } from "react";

import { useAuth } from "../../../contexts/AuthProvider/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/Button";
import { Option, Options } from "../../../components/Options";
import { useAlert } from "../../../contexts/AlertProvider";
import { Container } from "./styles";
import { TitlePage } from "../../../components/TitlePage";

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const alert = useAlert();

  useEffect(() => {
    if (location.state?.passwordChanged === true) {
      alert.showSuccess("Operação realizada com sucesso!");
      
      window.history.replaceState({}, document.title);
    }
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    const result = await auth.authenticate(email, password);

    if ('message' in result) {
      alert.showError(result.message);
    } else {
      navigate("/home");
    }

    setLoading(false);
  }

  return (
    <>
      <Container>
        <div>
          <TitlePage title="Portal de Atendimento" description="#acesseSuaConta" />
        
          <form onSubmit={handleSubmit}>
            <InputGroup 
              groupClass="mb-1" 
              name="email" 
              label="Usuário (E-mail)" 
              type="email" 
              placeholder="E-mail do usuário"
              value={email} 
              onChange={event => setEmail(event.target.value)} 
            />
            
            <InputGroup
              groupClass="mb-3"
              name="password"
              label="Senha"
              type="password"
              placeholder="Senha do usuário"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />

            <Button type="submit" buttonClass="btn-primary" isLoading={isLoading} label="Entrar"></Button>
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