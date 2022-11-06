import { Header } from "../components/Header";
import { Container } from "./styles";
import { Link } from "react-router-dom";
import { TitlePage } from "../../components/TitlePage";
import { AlertError } from "../../components/AlertError";
import { FormEvent, useState } from "react";
import { InputGroup } from "../../components/InputGroup";
import { Button } from "../../components/Button";
import { maskCnpj } from "../../utils/mask";

function FirstAccess() {
  const [error, setError] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    setLoading(false);
  }

  return (
    <>
      <Header />

      <Container>
        <div>
          <TitlePage title="Portal de Atendimento" description="#primeiroAcesso" />

          <AlertError message={error} />

          <form onSubmit={handleSubmit}>
            <InputGroup
              groupClass="mb-1"
              name="cnpj"
              label="CNPJ"
              type="text"
              placeholder="CNPJ da empresa"
              value={cnpj}
              onChange={event => setCnpj(maskCnpj(event.target.value))}
            />

            <InputGroup
              groupClass="mb-3"
              name="email"
              label="E-mail"
              type="email"
              placeholder="E-mail de contato"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />

            <Button type="submit" buttonClass="btn-primary" isLoading={isLoading} label="Entrar"></Button>
          </form>

          <div className="options">
            <div>
              <Link to="login">Clique aqui</Link> para acessar sua conta.
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export { FirstAccess }