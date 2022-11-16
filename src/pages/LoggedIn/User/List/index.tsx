import { useState } from "react";
import { Button } from "../../../../components/Button";
import { ButtonsFilter } from "../../../../components/Button/styles";
import { InputFilters, SelectFilters } from "../../../../components/InputGroup";

import { TitlePage } from "../../../../components/TitlePage";
import { ContainerFiltros, Filtros } from "./styles";

const UserList = function () {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [type, setType] = useState<string>();

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
    </>
  );
}

export { UserList }