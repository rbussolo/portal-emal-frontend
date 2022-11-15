import { useAuth } from "../../../contexts/AuthProvider/useAuth";

function Home() {
  const auth = useAuth();

  function handleLogout() {
    auth.logout();
  }

  return (
    <>
      <h1>
        Você esta logado como:
      </h1>
      <h3>
        Nome: {auth.user?.name} <br />
        E-mail: {auth.user?.email} <br />
        CPF/CNPJ: {auth.user?.cpf_cnpj} <br />
        Celular: {auth.user?.cellphone} <br />
        Tipo: {auth.user?.type} <br />
      </h3>
      <button onClick={handleLogout}>Deslogar!</button>
    </>
  )
}

export { Home };