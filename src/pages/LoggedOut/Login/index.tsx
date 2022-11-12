import { FormEvent, useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";
import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/Button";
import { Template } from "../components/Template";
import { Option, Options } from "../components/Options";

function Login(){
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

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
      <Template
        title="Portal de Atendimento"
        description="#acesseSuaConta"
        alertMessage={error}
      >
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
      </Template>
    </>
  );
}

export { Login };