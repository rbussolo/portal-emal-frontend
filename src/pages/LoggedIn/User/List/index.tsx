/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/Button";
import { ButtonsFilter } from "../../../../components/Button/styles";
import { InputFilters, SelectFilters } from "../../../../components/InputGroup";
import { IconDelete, IconDisplay, IconUpdate, List, Table, Td } from "../../../../components/Table";

import { TitlePage } from "../../../../components/TitlePage";
import { useAlert } from "../../../../contexts/AlertProvider";
import { useAuth } from "../../../../contexts/AuthProvider/useAuth";
import { useLoading } from "../../../../contexts/LoadingProvider";
import { deleteUser, fetchUsers, FiltersUsers, ListUsers, userTypeEnum } from "../../../../services/users";
import { ContainerFiltros, Filtros } from "./styles";

const UserList = function () {
  const auth = useAuth();
  const navigate = useNavigate();
  const alert = useAlert();
  const load = useLoading();
  
  const [filters, setFilters] = useState<FiltersUsers>({});
  const [data, setData] = useState<ListUsers>({ count: 0, countPerPage: 0, users: [] });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchData(filters: FiltersUsers) {
    const result = await fetchUsers(filters, auth.logout);

    if(result) {
      setData(result);
    }
  }

  useEffect(() => {
    fetchData(filters);
  }, []);

  async function handleSearch() {
    const newFilters: FiltersUsers = { email, name, type, page: 1 };

    setCurrentPage(1);
    setFilters(newFilters);

    await fetchData(newFilters);
  }

  async function handlePage(page: number) {
    const newFilters: FiltersUsers = { ...filters, page };

    setCurrentPage(page);
    setFilters(newFilters);

    await fetchData(newFilters);
  }

  function handleClean() {
    setName("");
    setEmail("");
    setType("");
  }

  function handleDelete(id: number) {
    alert.showConfirm("Realmente deseja remover este registro?", async () => {
      load.showLoading();

      const result = await deleteUser(id, auth.logout);

      if(result) {
        if ('message' in result) {
          alert.showError(result.message);
        } else {
          await fetchData(filters);

          alert.showSuccess("Registro removido com sucesso!");
        }
      }

      load.hideLoading();
    });
  }

  return (
    <>
      <ContainerFiltros className="container">
        <Filtros>
          <TitlePage title="Usuários" action={{ description: "Novo Usuário", onClick: () => { navigate("/user/create", { state: { mode: 'insert' }})}}}/>

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
            <option value="" defaultValue="">Todos</option>
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
      <List count={data.count} countPerPage={data.countPerPage} currentPage={currentPage} onChangePage={handlePage}>
        <Table>
          <thead>
            <tr>
              <Td isIdentifier>Id</Td>
              <Td>CPF/CNPJ</Td>
              <Td>Nome</Td>
              <Td>E-mail</Td>
              <Td>Tipo</Td>
              <Td isAction>Ações</Td>
            </tr>
          </thead>
          <tbody>
            {data.users?.map((user, index) => {
              return (
                <tr key={user.id}>
                  <Td isIdentifier>{user.id}</Td>
                  <Td>{user.cpf_cnpj}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{userTypeEnum[user.type]}</Td>
                  <Td isAction>
                    <div>
                      <IconDisplay to="/user/create" state={{ mode: 'display', id: user.id }} />
                      <IconUpdate to="/user/create" state={{ mode: 'update', id: user.id }} />
                      <IconDelete onclick={(e) => { handleDelete(user.id!) }} />
                    </div>
                  </Td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </List>
    </>
  );
}

export { UserList }