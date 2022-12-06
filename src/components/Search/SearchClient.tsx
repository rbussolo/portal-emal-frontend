import styled from "styled-components";
import { useState } from "react";
import { useAlert } from "../../contexts/AlertProvider";
import { PopUpSearchClient } from "../../pages/LoggedIn/Client/PopupSearch";
import { api } from "../../services/api";
import { Cliente, EmptyCliente } from "../../services/cliente";
import { maskCpfCnpj, removeMask } from "../../utils/mask";

interface SearchClientProps {
  label?: string;
  client: Cliente;
  onClientChange: (client: Cliente) => void;
}

const SearchClient = ({ label = "CPF/CNPJ:", client, onClientChange }: SearchClientProps) => {
  let lastClientCpfCnpj = "";

  const [isOpen, setOpen] = useState(false);

  const alert = useAlert();

  function onBlurClient() {
    if (!client.CLICNPJCPF) {
      onClientChange(EmptyCliente);
    } else if (client.CLICNPJCPF !== lastClientCpfCnpj) {
      api.get("/clients/byCpfCnpj/" + removeMask(client.CLICNPJCPF)).then(response => {
        onClientChange(response.data);
      }).catch(err => {
        alert.showAxiosError(err);
      });
    }

    lastClientCpfCnpj = client.CLICNPJCPF || "";
  }

  function onSelectedClient(client: Cliente) {
    onClientChange(client);
    setOpen(false);
  }

  return (
    <>
      <div className='mb-3 row'>
        <label className="col-sm-3 col-form-label">{label}</label>
        <div className="col-sm-9">
          <div className="input-group">
            <InputCpfCnpj
              type="text"
              className="form-control"
              placeholder="CPF/CNPJ do Cliente"
              value={client.CLICNPJCPF}
              onChange={e => onClientChange({ ...client, CLICNPJCPF: maskCpfCnpj(e.target.value) })}
              onBlur={onBlurClient}
            />
            <ButtonSearch className="input-group-text" onClick={() => setOpen(true)}><i className="bi bi-search"></i></ButtonSearch>
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