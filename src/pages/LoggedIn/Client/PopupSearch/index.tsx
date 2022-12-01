import Modal from 'react-modal';
import { useState } from 'react';
import { Button } from '../../../../components/Button';
import { ButtonsFilter } from '../../../../components/Button/styles';
import { InputFilters } from '../../../../components/InputGroup';
import { List, Table, Td, Tr } from '../../../../components/Table';
import { TitlePopUp } from '../../../../components/TitlePopup';
import { Container } from "./styles";
import { Cliente, FiltersClientes, ListClientes } from '../../../../services/cliente';
import { maskCpfCnpj } from '../../../../utils/mask';
import { useLoading } from '../../../../contexts/LoadingProvider';
import { api } from '../../../../services/api';
import { useAlert } from '../../../../contexts/AlertProvider';

interface PopUpSearchClientProps {
  isOpen: boolean;
  onSelectedClient: (client: Cliente) => void;
  onRequestClose: () => void;
}

export function PopUpSearchClient({ isOpen, onSelectedClient, onRequestClose }: PopUpSearchClientProps) {
  const [name, setName] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FiltersClientes>({});
  const [data, setData] = useState<ListClientes>({ count: 0, countPerPage: 0, showResults: false, clients: [] });

  const load = useLoading();
  const alert = useAlert();

  function fetchData(filters: FiltersClientes) {
    load.showLoading();

    api.get("/clients", { params: filters }).then(response => {
      const data: ListClientes = { ...response.data, showResults: true };

      setData(data);
    }).catch((err) => {
      alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  function handleSearch() {
    const newFilters: FiltersClientes = { name, cpfCnpj, page: 1, amount: 5 };

    setCurrentPage(1);
    setFilters(newFilters);

    fetchData(newFilters);
  }

  async function handlePage(page: number) {
    const newFilters: FiltersClientes = { ...filters, page };

    setCurrentPage(page);
    setFilters(newFilters);

    fetchData(newFilters);
  }

  function handleClientSelected(index: number) {
    const client = data.clients![index];

    onSelectedClient(client);
  }

  return (
    <Modal
      isOpen={isOpen}
      appElement={document.getElementById('root') as HTMLElement}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content react-modal-content-large container"
    >
      <Container>
        <TitlePopUp title="Consulta de Clientes" onRequestClose={onRequestClose} />

        <InputFilters label='Nome' name='name' value={name} onChange={e => setName(e.target.value)}/>
        <InputFilters label='CPF/CNPJ' name='cpfCnpj' value={cpfCnpj} onChange={e => setCpfCnpj(maskCpfCnpj(e.target.value))} />

        <ButtonsFilter>
          <Button buttonClass="btn-primary" label="Consultar" onClick={handleSearch}/>
        </ButtonsFilter>

        <List count={data.count} countPerPage={data.countPerPage} currentPage={currentPage} onChangePage={handlePage} isPopup={true} showResults={data.showResults}>
          <Table>
            <thead>
              <tr>
                <Td isIdentifier>Id</Td>
                <Td>CPF/CNPJ</Td>
                <Td>Nome</Td>
              </tr>
            </thead>
            <tbody>
              {data.clients?.map((client, index) => {
                return (
                  <Tr key={client.CLICOD} isSelectable={true} onClick={() => handleClientSelected(index)}>
                    <Td isIdentifier>{client.CLICOD}</Td>
                    <Td>{client.CLICNPJCPF}</Td>
                    <Td>{client.CLINOME}</Td>
                  </Tr>
                )
              })}
            </tbody>
          </Table>
        </List>
      </Container>
    </Modal>
  )
}