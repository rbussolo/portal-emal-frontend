/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { Button } from "../../../../components/Button";
import { ButtonsFilter } from "../../../../components/Button/styles";
import { InputFilters, SelectFilters } from "../../../../components/InputGroup";
import { IconDelete, IconDisplay, IconList, IconUpdate, List, Table, Td } from "../../../../components/Table";
import { TitlePage } from "../../../../components/TitlePage";
import { useLoading } from "../../../../contexts/LoadingProvider";
import { ContainerFiltros, Filtros } from "../../../../global.styles";
import { api } from "../../../../services/api";
import { FiltersUsers, ListUsers, userTypeEnum } from "../../../../services/users";
import { Alert } from "../../../../utils/alert";
import { maskCpfCnpj } from "../../../../utils/mask";

const UserList = function () {
  const navigate = useNavigate();
  const load = useLoading();

  const formik = useFormik({
    initialValues: {
      filters: {
        page: 1,
        name: "",
        email: "",
        type: ""
      } as FiltersUsers,
      data: {
        count: 0,
        countPerPage: 0,
        users: []
      } as ListUsers,
      name: "",
      email: "",
      type: ""
    },
    onSubmit: ({ email, name, type }) => {
      const newFilters: FiltersUsers = { email, name, type, page: 1 };

      formik.setFieldValue("filters", newFilters);
      fetchData(newFilters);
    }
  });

  function fetchData(filters: FiltersUsers) {
    load.showLoading();

    api.get("/users", { params: filters }).then(response => {
      formik.setFieldValue("data", response.data);
    }).catch((err) => {
      Alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  useEffect(() => {
    fetchData(formik.values.filters);
  }, []);

  async function handlePage(page: number) {
    const newFilters: FiltersUsers = { ...formik.values.filters, page };

    formik.setFieldValue("filters", newFilters);
    fetchData(newFilters);
  }

  function handleClean() {
    formik.setFieldValue("name", "");
    formik.setFieldValue("email", "");
    formik.setFieldValue("type", "");
  }

  function handleDelete(id: number) {
    Alert.showConfirm("Realmente deseja remover este registro?", () => {
      load.showLoading();

      api.delete(`/users/${id}`).then(() => {
        fetchData(formik.values.filters);

        Alert.showSuccess("Registro removido com sucesso!");
      }).catch(err => {
        Alert.showAxiosError(err);
      }).finally(() => {
        load.hideLoading();
      });
    });
  }

  return (
    <>
      <ContainerFiltros className="container">
        <Filtros>
          <TitlePage title="Usuários" action={{ description: "Novo Usuário", onClick: () => { navigate("/user/create/insert/0")}}}/>

          <hr />

          <form onSubmit={formik.handleSubmit}>
            <InputFilters label="Nome" name="name"
              type="text"
              placeholder="Nome do usuário"
              value={formik.values.name}
              onChange={formik.handleChange} 
            />
            <InputFilters label="E-mail" name="email"
              type="text"
              placeholder="E-mail do usuário"
              value={formik.values.email}
              onChange={formik.handleChange} 
            />
            <SelectFilters label="Tipo" name="type" value={formik.values.type} onChange={formik.handleChange}>            
              <option value="" defaultValue="">Todos</option>
              <option value="client">Cliente</option>
              <option value="seller">Vendedor</option>
              <option value="admin">Administrador</option>
            </SelectFilters>
            
            <ButtonsFilter>
              <Button type="submit" buttonClass="btn-primary" label="Consultar" />
              <Button type="button" onClick={handleClean} buttonClass="btn-secondary" label="Limpar Filtros" />
            </ButtonsFilter>
          </form>
        </Filtros>
      </ContainerFiltros>
      <List count={formik.values.data.count} countPerPage={formik.values.data.countPerPage} currentPage={formik.values.filters.page} onChangePage={handlePage}>
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
            {formik.values.data.users?.map((user, index) => {
              return (
                <tr key={user.id}>
                  <Td isIdentifier>{user.id}</Td>
                  <Td>{maskCpfCnpj(user.cpf_cnpj)}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{userTypeEnum[user.type!]}</Td>
                  <Td isAction>
                    <div>
                      <IconDisplay title="Visualizar" to={`/user/create/display/${user.id}`} />
                      <IconUpdate title="Editar" to={`/user/create/update/${user.id}`} />
                      <IconList title="Lista de Clientes" to={`/user/client/${user.id}`} />
                      <IconDelete title="Remover" onclick={(e) => { handleDelete(user.id!) }} />
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