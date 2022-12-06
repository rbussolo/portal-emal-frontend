/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../../../../components/Button"
import { ButtonsFilter } from "../../../../components/Button/styles"
import { InputForm } from "../../../../components/InputGroup"
import { SearchClient } from "../../../../components/Search/SearchClient"
import { IconDelete, Table, Td } from "../../../../components/Table"
import { TitlePage } from "../../../../components/TitlePage"
import { useAlert } from "../../../../contexts/AlertProvider"
import { useLoading } from "../../../../contexts/LoadingProvider"
import { ContainerForm } from "../../../../global.styles"
import { api } from "../../../../services/api"
import { Cliente, EmptyCliente } from "../../../../services/cliente"
import { EmptyUser, User, UserClient, userClientStateEnum } from "../../../../services/users"
import { maskCpfCnpj } from "../../../../utils/mask"

interface UserClientCreateParams {
  id: number;
}

const UserClientCreate = function () {
  const navigate = useNavigate();
  const location = useLocation();
  const alert = useAlert();
  const load = useLoading();

  const { id } = location.state as UserClientCreateParams;
  const [user, setUser] = useState<User>({ ...EmptyUser });
  const [client, setClient] = useState<Cliente>({ ...EmptyCliente });
  const [userClients, setUserClients] = useState<UserClient[]>([]);

  function fetchUserClients(){
    return api.get("/users/clients/" + id).then(response => {
      setUserClients(response.data);
    }).catch(err => {
      alert.showAxiosError(err);
    });
  }

  useEffect(() => {
    load.showLoading();

    Promise.all([
      api.get("/users/" + id).then(response => {
        setUser(response.data);
      }).catch(err => {
        alert.showAxiosError(err);
      }),
      fetchUserClients()
    ]).finally(() => {
      load.hideLoading();
    });
  }, []);

  function handleAdd(event: FormEvent) {
    if(!client.CLICOD) return alert.showError({ message: "É necessário informar o Cliente!" });
    
    load.showLoading();

    api.post("/users/clients", { 
      user_id: id, 
      client_id: client.CLICOD
    }).then(response => {
      setUserClients([ ...userClients, response.data ])
    }).catch(err => {
      alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  function handleSubmit(event: FormEvent){
    event.preventDefault();

    load.showLoading();

    api.post("/users/clients/" + id).then(() => {
      navigate("/user/list");
    }).catch(err => {
      alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  function handleDelete(id: number){
    alert.showConfirm("Realmente deseja remover este registro?", () => {
      load.showLoading();

      api.delete("/users/clients/" + id).then(() => {
        fetchUserClients();

        alert.showSuccess("Registro removido com sucesso!");
      }).catch(err => {
        alert.showAxiosError(err);
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
    }).then(response => {
      fetchUserClients();
    }).catch(err => {
      alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  return (
    <ContainerForm onSubmit={handleSubmit} className="container needs-validation" noValidate>
      <TitlePage title="Relação Usuário - Cliente" />

      <hr />

      <InputForm label="Nome" name="name" type="text" disabled value={user?.name} />

      <InputForm label="E-mail" name="email" type="text" disabled value={user?.email} />

      <InputForm label="CPF/CNPJ" name="cpf_cnpj" type="text" disabled value={maskCpfCnpj(user?.cpf_cnpj)} />

      <hr />

      <SearchClient
        label="Cliente:"
        client={client}
        onClientChange={(client) => setClient(client)}
      />

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
          {userClients.length > 0 ? userClients.map((userClient, index) => {
            return (
              <tr key={userClient.id}>
                <Td isIdentifier>{userClient.id}</Td>
                <Td>{userClient.client_cpf_cnpj}</Td>
                <Td>{userClient.client_name}</Td>
                <Td>
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