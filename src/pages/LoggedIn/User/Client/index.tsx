/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik"
import { FormEvent, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../../../components/Button"
import { ButtonsFilter } from "../../../../components/Button/styles"
import { InputForm } from "../../../../components/InputGroup"
import { SearchClient } from "../../../../components/Search/SearchClient"
import { IconDelete, Table, Td } from "../../../../components/Table"
import { TitlePage } from "../../../../components/TitlePage"
import { useLoading } from "../../../../contexts/LoadingProvider"
import { ContainerForm } from "../../../../global.styles"
import { api } from "../../../../services/api"
import { EmptyCliente } from "../../../../services/cliente"
import { EmptyUser, UserClient } from "../../../../services/users"
import { Alert } from "../../../../utils/alert"
import { maskCpfCnpj } from "../../../../utils/mask"

const UserClientCreate = function () {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const load = useLoading();

  const formik = useFormik({
    initialValues: {
      user: { ...EmptyUser },
      client: { ...EmptyCliente },
      userClients: [] as UserClient[]
    },
    onSubmit: () => {
      load.showLoading();

      api.post(`/users/clients/${user_id}`).then(() => {
        navigate("/user/list");
      }).catch(err => {
        Alert.showAxiosError(err);
      }).finally(() => {
        load.hideLoading();
      });
    }
  });

  function fetchUser(){
    api.get(`/users/${user_id}`).then(response => {
      formik.setFieldValue("user", response.data);
    }).catch(err => {
      Alert.showAxiosError(err);
    });
  }

  function fetchUserClients(){
    return api.get(`/users/clients/${user_id}`).then(response => {
      formik.setFieldValue('userClients', response.data);
    }).catch(err => {
      Alert.showAxiosError(err);
    });
  }

  useEffect(() => {
    load.showLoading();

    Promise.all([
      fetchUser(),
      fetchUserClients()
    ]).finally(() => {
      load.hideLoading();
    });
  }, []);

  function handleAdd(event: FormEvent) {
    if (!formik.values.client.CLICOD) return Alert.showError({ message: "É necessário informar o Cliente!" });
    
    load.showLoading();

    api.post("/users/clients", { 
      user_id, 
      client_id: formik.values.client.CLICOD
    }).then(response => {
      formik.setFieldValue('userClients', [ ...formik.values.userClients, response.data ])
    }).catch(err => {
      Alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  function handleDelete(id: number){
    Alert.showConfirm("Realmente deseja remover este registro?", () => {
      load.showLoading();

      api.delete(`/users/clients/${id}`).then(() => {
        fetchUserClients();

        Alert.showSuccess("Registro removido com sucesso!");
      }).catch(err => {
        Alert.showAxiosError(err);
      }).finally(() => {
        load.hideLoading();
      });
    });
  }

  function handleState(userClient: UserClient, state: string) {
    if (userClient.state === state) return;

    load.showLoading();

    api.put("/users/clients/" + userClient.id, { 
      state 
    }).then(() => {
      fetchUserClients();
    }).catch(err => {
      Alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  return (
    <ContainerForm onSubmit={formik.handleSubmit} className="container needs-validation" noValidate>
      <TitlePage title="Relação Usuário - Cliente" />

      <hr />

      <InputForm label="Nome" name="name" type="text" disabled value={formik.values.user?.name} />
      <InputForm label="E-mail" name="email" type="text" disabled value={formik.values.user?.email} />
      <InputForm label="CPF/CNPJ" name="cpf_cnpj" type="text" disabled value={maskCpfCnpj(formik.values.user?.cpf_cnpj)} />

      <hr />

      <SearchClient label="Cliente:" client={formik.values.client} onClientChange={(client) => formik.setFieldValue("client", client)} />

      <ButtonsFilter className="mb-3">
        <Button type="button" buttonClass="btn-success" label="Adicionar" onClick={handleAdd} />
      </ButtonsFilter>

      <div>
        <span>Legenda: R = Requerido / A = Aprovado / D = Desaprovado</span>
      </div>

      <Table>
        <thead>
          <tr>
            <Td isIdentifier>Id</Td>
            <Td>CPF/CNPJ</Td>
            <Td>Nome</Td>
            <Td>Status</Td>
            <Td isAction>Ações</Td>
          </tr>
        </thead>
        <tbody>
          {formik.values.userClients.length > 0 ? formik.values.userClients.map((userClient, index) => {
            return (
              <tr key={userClient.id}>
                <Td isIdentifier>{userClient.id}</Td>
                <Td>{userClient.client_cpf_cnpj}</Td>
                <Td>{userClient.client_name}</Td>
                <Td className="column-btn-group">
                  <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" onClick={() => handleState(userClient, "required")} className={`btn ${userClient.state === "required" ? "btn-warning" : "btn-outline-warning"}`}>R</button>
                    <button type="button" onClick={() => handleState(userClient, "aproved")} className={`btn ${userClient.state === "aproved" ? "btn-success" : "btn-outline-success"}`}>A</button>
                    <button type="button" onClick={() => handleState(userClient, "dissaproved")} className={`btn ${userClient.state === "dissaproved" ? "btn-danger" : "btn-outline-danger"}`}>D</button>
                  </div>
                </Td>
                <Td isAction>
                  <div>
                    <IconDelete title="Remover" onclick={() => { handleDelete(userClient.id) }} />
                  </div>
                </Td>
              </tr>
            )
          }) : null }
        </tbody>
      </Table>

      <ButtonsFilter>
        <Button type="submit" buttonClass="btn-primary" label="Confirmar" />
        <Button buttonClass="btn-secondary" label="Voltar" onClick={() => navigate("/user/list")} />
      </ButtonsFilter>
    </ContainerForm>
  );
}

export { UserClientCreate }