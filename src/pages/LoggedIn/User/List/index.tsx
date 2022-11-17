/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button } from "../../../../components/Button";
import { ButtonsFilter } from "../../../../components/Button/styles";
import { InputFilters, SelectFilters } from "../../../../components/InputGroup";

import { TitlePage } from "../../../../components/TitlePage";
import { fetchUsers, User } from "../../../../services/users";
import { ContainerFiltros, ContainerTable, Filtros } from "./styles";

const UserList = function () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [users, setUsers] = useState<User[]>();
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchData() {
    const result = await fetchUsers({ page: currentPage, name, email, type });

    setUsers(result.users);
    setCount(result.count);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let page = 0;
    let pages = [];
    
    for(let i = 1; i <= count; i += 3) {
      page += 1;
      pages.push(page);
    }
    
    setPages(pages);
  }, [count]);

  useEffect(() => {
    fetchData();
  }, [currentPage])

  function handleClean() {
    setName("");
    setEmail("");
    setType("");
  }

  async function handleSearch() {
    if(currentPage !== 1) {
      setCurrentPage(1);
    } else {
      await fetchData();
    }
  }

  async function handlePage(page: number) {
    setCurrentPage(page);
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
            <Button buttonClass="btn-primary" isLoading={false} label="Consultar" onClick={handleSearch} />
            <Button onClick={handleClean} buttonClass="btn-secondary" label="Limpar Filtros" />
          </ButtonsFilter>
        </Filtros>
      </ContainerFiltros>
      <ContainerTable>
        <div>
          <div>Total de registros: { count }</div>
          <nav>
            <ul className="pagination">
              <li className={`page-item ${ currentPage > 1 ? '' : 'disabled' }`}>
                <button className="page-link" onClick={() => handlePage(currentPage - 1)}>Pagina Anterior</button>
              </li>
              { pages.map(page => {
                return <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}><button className="page-link" onClick={() => handlePage(page)}>{ page }</button></li>
              }) }
              <li className={`page-item ${ currentPage * 3 < count ? '' : 'disabled'}` }>
                <button className="page-link" onClick={() => handlePage(currentPage + 1)}>Próxima Pagina</button>
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
          </tbody>
        </table>
      </ContainerTable>
    </>
  );
}

export { UserList }