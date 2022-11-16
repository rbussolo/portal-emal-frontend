import { useEffect, useState } from "react";
import { Button } from "../../../../components/Button";
import { ButtonsFilter } from "../../../../components/Button/styles";
import { InputFilters, SelectFilters } from "../../../../components/InputGroup";

import { TitlePage } from "../../../../components/TitlePage";
import { Api } from "../../../../services/api";
import { ContainerFiltros, ContainerTable, Filtros } from "./styles";

interface User {
  id: number;
  cpf_cnpj: string;
  name: string;
  email: string;
  type: string;
}

const UserList = function () {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [type, setType] = useState<string>();
  const [users, setUsers] = useState<User[]>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await Api.get('/users?page=' + page);
      
      setUsers(response.data.users);
    }

    fetchData();
  }, []);

  function handleClean() {
    setName("");
    setEmail("");
    setType("");
  }

  return (
    <>
      <ContainerFiltros className="container">
        <Filtros>
          <TitlePage title="Pedidos"/>

          <hr />

          <InputFilters label="Nome" name="name"
            type="text"
            placeholder="Nome do usuário"
            value={name}
            onChange={event => setName(event.target.value)} 
          />
          <InputFilters label="E-mail" name="email"
            type="text"
            placeholder="E-mail do usuário"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <SelectFilters label="Tipo" name="type" value={type} onChange={event => setType(event.target.value)}>            
            <option defaultValue="">Todos</option>
            <option value="client">Cliente</option>
            <option value="seller">Vendedor</option>
            <option value="admin">Administrador</option>
          </SelectFilters>
          
          <ButtonsFilter>
            <Button buttonClass="btn-primary" isLoading={false} label="Consultar" />
            <Button onClick={handleClean} buttonClass="btn-secondary" label="Limpar Filtros" />
          </ButtonsFilter>
        </Filtros>
      </ContainerFiltros>
      <ContainerTable>
        <div>
          <nav>
            <ul className="pagination">
              <li className="page-item disabled">
                <button className="page-link">Previous</button>
              </li>
              <li className="page-item"><button className="page-link">1</button></li>
              <li className="page-item active" aria-current="page">
                <button className="page-link">2</button>
              </li>
              <li className="page-item"><button className="page-link">3</button></li>
              <li className="page-item">
                <button className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </div>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <td>Id</td>
              <td>CPF/CNPJ</td>
              <td>Nome</td>
              <td>E-mail</td>
              <td>Tipo</td>
              <td>Ações</td>
            </tr>
          </thead>
          <tbody>
            { users?.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.cpf_cnpj}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.type}</td>
                  <td></td>
                </tr>
              )
            }) }
            <tr>
              <td>1</td>
              <td>003.102.011-95</td>
              <td>Rodrigo Bussolo</td>
              <td>E-mail</td>
              <td>Administrador</td>
              <td></td>
            </tr>
            <tr>
              <td>1</td>
              <td>003.102.011-95</td>
              <td>Rodrigo Bussolo</td>
              <td>E-mail</td>
              <td>Administrador</td>
              <td></td>
            </tr>
            <tr>
              <td>1</td>
              <td>003.102.011-95</td>
              <td>Rodrigo Bussolo</td>
              <td>E-mail</td>
              <td>Administrador</td>
              <td></td>
            </tr>
            <tr>
              <td>1</td>
              <td>003.102.011-95</td>
              <td>Rodrigo Bussolo</td>
              <td>E-mail</td>
              <td>Administrador</td>
              <td></td>
            </tr>
            <tr>
              <td>1</td>
              <td>003.102.011-95</td>
              <td>Rodrigo Bussolo</td>
              <td>E-mail</td>
              <td>Administrador</td>
              <td></td>
            </tr>
            <tr>
              <td>1</td>
              <td>003.102.011-95</td>
              <td>Rodrigo Bussolo</td>
              <td>E-mail</td>
              <td>Administrador</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </ContainerTable>
    </>
  );
}

export { UserList }