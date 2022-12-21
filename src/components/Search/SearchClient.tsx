import styled from "styled-components";
import { useState } from "react";
import { PopUpSearchClient } from "../../pages/LoggedIn/Client/PopupSearch";
import { api } from "../../services/api";
import { Cliente, EmptyCliente } from "../../services/cliente";
import { maskCpfCnpj, removeMask } from "../../utils/mask";
import { Alert } from "../../utils/alert";

interface SearchClientProps {
  label?: string;
  labelClass?: string;
  divInputClass?: string;
  client: Cliente;
  onClientChange: (client: Cliente) => void;
}

const SearchClient = ({ label = "CPF/CNPJ:", labelClass = "col-sm-3", divInputClass = "col-sm-9", client, onClientChange }: SearchClientProps) => {
  let lastClientCpfCnpj = "";

  const [isOpen, setOpen] = useState(false);

  function onChangeClient(client: Cliente) {
    if (!client.CLICNPJCPF) {
      onClientChange({ ...EmptyCliente });
    } else if (client.CLICNPJCPF !== lastClientCpfCnpj) {
      api.get("/clients/byCpfCnpj/" + removeMask(client.CLICNPJCPF)).then(response => {
        onClientChange(response.data);
      }).catch(err => {
        Alert.showAxiosError(err);
      });
    }

    lastClientCpfCnpj = client.CLICNPJCPF || "";
  }

  function onBlurClient() {
    onChangeClient(client);
  }

  function onSelectedClient(client: Cliente) {
    onChangeClient(client);
    setOpen(false);
  }

  return (
    <>
      <div className='mb-3 row'>
        <label className={`${labelClass} col-form-label`}>{label}</label>
        <div className={divInputClass}>
          <div className="input-group">
            <InputCpfCnpj
              type="text"
              className="form-control"
              placeholder="CPF/CNPJ do Cliente"
              value={client.CLICNPJCPF}
              onChange={e => onClientChange({ ...client, CLICNPJCPF: maskCpfCnpj(e.target.value) })}
              onBlur={onBlurClient}
            />
            <ButtonSearch type="button" className="input-group-text" onClick={() => setOpen(true) }><i className="bi bi-search"></i></ButtonSearch>
            <input
              type="text"
              className="form-control"
              disabled
              value={client?.CLINOME || ""}
            />
          </div>
        </div>
      </div>

      <PopUpSearchClient isOpen={isOpen} onSelected={onSelectedClient} onRequestClose={() => setOpen(false)} />
    </>
  )
}

const InputCpfCnpj = styled.input`
  max-width: 180px;
`;

const ButtonSearch = styled.button`
  outline: none;

  &:focus, &:focus-within {
    outline: 1px solid var(--border-color);
    z-index: 1;
  }
`;


export { SearchClient }