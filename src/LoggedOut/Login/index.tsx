import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider/useAuth";
import { Header } from "../components/Header";
import { Container } from "./styles";
import { useNavigate, Link } from "react-router-dom";
import { InputGroup } from "../../components/InputGroup";
import { Button } from "../../components/Button";
import { Alert } from "../../components/Alert";
import { TitlePage } from "../../components/TitlePage";

function Login(){
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    const result = await auth.authenticate(email, password);

    if ('message' in result) {
      setError(result.message);
    } else {
      navigate("/home");
    }

    setLoading(false);
  }

  return (
    <>
      <Header />

      <Container>
        <div>
          <TitlePage title="Portal de Atendimento" description="#acesseSuaConta"/>
          
          <Alert message={error} />

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

          <div className="options">
            <div>
              <Link to="first-access">Clique aqui</Link> caso seja o primeiro acesso.
            </div>
            <div>
              <Link to="forget-password">Clique aqui</Link> caso tenha esquecido a senha.
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export { Login };