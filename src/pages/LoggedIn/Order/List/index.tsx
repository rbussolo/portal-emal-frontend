/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/Button";
import { ButtonsFilter } from "../../../../components/Button/styles";
import { InputFilters, InputFiltersGroupDates, SelectFilters } from "../../../../components/InputGroup";
import { SearchClient } from "../../../../components/Search/SearchClient";
import { SearchEstoque } from "../../../../components/Search/SearchProduct";
import { IconDelete, IconDisplay, IconUpdate, List, Table, Td } from "../../../../components/Table";

import { TitlePage } from "../../../../components/TitlePage";
import { useAlert } from "../../../../contexts/AlertProvider";
import { useLoading } from "../../../../contexts/LoadingProvider";
import { ContainerFiltros, Filtros } from "../../../../global.styles";
import { api } from "../../../../services/api";
import { Cliente, EmptyCliente } from "../../../../services/cliente";
import { EmptyEstoque, Estoque } from "../../../../services/estoque";
import { FiltersUsers, ListUsers, userTypeEnum } from "../../../../services/users";
import { maskCpfCnpj } from "../../../../utils/mask";

const OrderList = function () {
  const navigate = useNavigate();
  const alert = useAlert();
  const load = useLoading();

  const [filters, setFilters] = useState<FiltersUsers>({});
  const [data, setData] = useState<ListUsers>({ count: 0, countPerPage: 0, users: [] });

  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");

  const [client, setClient] = useState<Cliente>(EmptyCliente);
  const [estoque, setEstoque] = useState<Estoque>(EmptyEstoque);
  
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  function fetchData(filters: FiltersUsers) {
    load.showLoading();

    api.get("/users", { params: filters }).then(response => {
      setData(response.data as ListUsers);
    }).catch((err) => {
      alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  useEffect(() => {
    // Carrega dados das combos
  }, []);

  async function handleSearch() {
    const newFilters: FiltersUsers = { email, type, page: 1 };

    setCurrentPage(1);
    setFilters(newFilters);

    fetchData(newFilters);
  }

  async function handlePage(page: number) {
    const newFilters: FiltersUsers = { ...filters, page };

    setCurrentPage(page);
    setFilters(newFilters);

    fetchData(newFilters);
  }

  function handleClean() {
    setEmail("");
    setType("");
  }

  function handleDelete(id: number) {
    alert.showConfirm("Realmente deseja remover este registro?", () => {
      load.showLoading();

      api.delete("/users/" + id).then(() => {
        fetchData(filters);

        alert.showSuccess("Registro removido com sucesso!");
      }).catch(err => {
        alert.showAxiosError(err);
      }).finally(() => {
        load.hideLoading();
      });
    });
  }

  return (
    <>
      <ContainerFiltros className="container">
        <Filtros>
          <TitlePage title="Pedidos" action={{ description: "Novo Pedido", onClick: () => { navigate("/order/create", { state: { mode: 'insert' } }) } }} />

          <hr />

          <InputFiltersGroupDates 
            initialDate={initialDate} 
            onInitialDateChange={d => setInitialDate(d)} 
            finalDate={finalDate} 
            onFinalDateChange={d => setFinalDate(d)} 
          />

          <SearchClient 
            client={client} 
            onClientChange={(client) => setClient(client)} 
          />

          <SearchEstoque 
            estoque={estoque} 
            onEstoqueChange={(estoque) => setEstoque(estoque)} 
          />

          <InputFilters label="Nº Pedido" name="orderNumber"
            type="text"
            placeholder="Nº do Pedido"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          
          <SelectFilters label="Empresa" name="company" value={type} onChange={event => setType(event.target.value)}>
            <option value="" defaultValue="">Todos</option>
            <option value="client">Cliente</option>
            <option value="seller">Vendedor</option>
            <option value="admin">Administrador</option>
          </SelectFilters>

          <ButtonsFilter>
            <Button buttonClass="btn-primary" label="Consultar" onClick={handleSearch} />
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
                  <Td>{maskCpfCnpj(user.cpf_cnpj)}</Td>
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

export { OrderList }