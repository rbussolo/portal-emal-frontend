import { Header } from "../components/Header";
import { Container } from "./styles";

function Login(){
  return (
    <>
      <Header />

      <Container>
        <div>
          <h1>Portal de Atendimento</h1>

          <div className="mb-1">
            <label htmlFor="email" className="form-label">Usuário (E-mail):</label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha:</label>
            <input type="password" className="form-control" id="password" />
          </div>

          <button type="button" className="btn btn-primary">Entrar</button>

          <div className="options">
            <div>
              <a href="#">Clique aqui</a> caso seja o primeiro acesso.
            </div>
            <div>
              <a href="#">Clique aqui</a> caso tenha esquecido a senha.
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export { Login };