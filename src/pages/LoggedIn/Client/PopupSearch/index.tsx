import Modal from 'react-modal';
import { useState } from 'react';
import { Button } from '../../../../components/Button';
import { ButtonsFilter } from '../../../../components/Button/styles';
import { InputFilters } from '../../../../components/InputGroup';
import { List, Table, Td, Tr } from '../../../../components/Table';
import { TitlePopUp } from '../../../../components/TitlePopup';
import { Container } from "./styles";
import { Cliente, FiltersClientes, ListClientes } from '../../../../services/cliente';
import { maskCpfCnpj, maskInteger } from '../../../../utils/mask';
import { useLoading } from '../../../../contexts/LoadingProvider';
import { api } from '../../../../services/api';
import { Alert } from '../../../../utils/alert';

interface PopUpSearchClientProps {
  isOpen: boolean;
  onSelected: (client: Cliente) => void;
  onRequestClose: () => void;
}

export function PopUpSearchClient({ isOpen, onSelected, onRequestClose }: PopUpSearchClientProps) {
  const [cod, setCod] = useState(0);
  const [name, setName] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FiltersClientes>({});
  const [data, setData] = useState<ListClientes>({ count: 0, countPerPage: 0, showResults: false, clients: [] });

  const load = useLoading();

  function fetchData(filters: FiltersClientes) {
    load.showLoading();

    api.get("/clients", { params: filters }).then(response => {
      const data: ListClientes = { ...response.data, showResults: true };

      setData(data);
    }).catch((err) => {
      Alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  function handleSearch() {
    const newFilters: FiltersClientes = { name, cpfCnpj, cod, page: 1, amount: 5 };

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

  function handleSelected(index: number) {
    const client = data.clients![index];

    onSelected(client);
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

        <div className='row'>
          <div className='col-md-6'>
            <InputFilters 
              label='CPF/CNPJ' 
              name='cpfCnpj' 
              labelClass='col-md-6 col-sm-3'
              divInputClass='col-md-6 col-sm-9'
              value={cpfCnpj} 
              onChange={e => setCpfCnpj(maskCpfCnpj(e.target.value))} />
          </div>
          <div className='col-md-6'>
            <InputFilters label='Código' name='codigo' value={cod} onChange={e => setCod(maskInteger(e.target.value))} />
          </div>
        </div>

        <InputFilters label='Nome' name='name' value={name} onChange={e => setName(e.target.value)}/>

        <ButtonsFilter>
          <Button buttonClass="btn-primary" label="Consultar" onClick={handleSearch}/>
        </ButtonsFilter>

        <List count={data.count} countPerPage={data.countPerPage} currentPage={currentPage} onChangePage={handlePage} isPopup={true} showResults={data.showResults}>
          <Table>
            <thead>
              <tr>
                <Td extraClass='width-100' isIdentifier>Id</Td>
                <Td extraClass='width-200'>CPF/CNPJ</Td>
                <Td>Nome</Td>
              </tr>
            </thead>
            <tbody>
              {data.clients?.map((client, index) => {
                return (
                  <Tr key={client.CLICOD} isSelectable={true} onClick={() => handleSelected(index)}>
                    <Td extraClass='width-100' isIdentifier>{client.CLICOD}</Td>
                    <Td extraClass='width-200'>{client.CLICNPJCPF}</Td>
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