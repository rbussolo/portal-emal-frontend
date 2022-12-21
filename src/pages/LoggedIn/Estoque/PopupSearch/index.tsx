import Modal from 'react-modal';
import { useState } from 'react';
import { InputFilters } from '../../../../components/InputGroup';
import { TitlePopUp } from '../../../../components/TitlePopup';
import { Estoque, FiltersEstoques, ListEstoques } from "../../../../services/estoque";
import { maskNumerica } from '../../../../utils/mask';
import { Container } from './styles';
import { ButtonsFilter } from '../../../../components/Button/styles';
import { Button } from '../../../../components/Button';
import { useLoading } from '../../../../contexts/LoadingProvider';
import { api } from '../../../../services/api';
import { List, Table, Td, Tr } from '../../../../components/Table';
import { Alert } from '../../../../utils/alert';

interface PopUpSearchEstoqueProps {
  isOpen: boolean;
  onSelected: (estoque: Estoque) => void;
  onRequestClose: () => void;
}

function PopUpSearchEstoque({ isOpen, onSelected, onRequestClose }: PopUpSearchEstoqueProps) {
  const [cod, setCod] = useState("");
  const [name, setName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FiltersEstoques>({});
  const [data, setData] = useState<ListEstoques>({ count: 0, countPerPage: 0, showResults: false, estoques: [] });

  const load = useLoading();

  function fetchData(filters: FiltersEstoques) {
    load.showLoading();

    api.get("/estoques", { params: filters }).then(response => {
      const data: ListEstoques = { ...response.data, showResults: true };

      setData(data);
    }).catch((err) => {
      Alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  function handleSearch() {
    const newFilters: FiltersEstoques = { cod, name, page: 1, amount: 5 };

    setCurrentPage(1);
    setFilters(newFilters);

    fetchData(newFilters);
  }

  async function handlePage(page: number) {
    const newFilters: FiltersEstoques = { ...filters, page };

    setCurrentPage(page);
    setFilters(newFilters);

    fetchData(newFilters);
  }

  function handleSelected(index: number) {
    const estoque = data.estoques![index];
    
    onSelected(estoque);
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
        <TitlePopUp title="Consulta de Produtos" onRequestClose={onRequestClose} />

        <InputFilters label='Código' name='cod' value={cod} onChange={e => setCod(maskNumerica(e.target.value))} />
        <InputFilters label='Nome' name='name' value={name} onChange={e => setName(e.target.value)} />

        <ButtonsFilter>
          <Button buttonClass="btn-primary" label="Consultar" onClick={handleSearch} />
        </ButtonsFilter>

        <List count={data.count} countPerPage={data.countPerPage} currentPage={currentPage} onChangePage={handlePage} isPopup={true} showResults={data.showResults}>
          <Table>
            <thead>
              <tr>
                <Td extraClass="width-100" isIdentifier>Código</Td>
                <Td>Nome</Td>
              </tr>
            </thead>
            <tbody>
              {data.estoques?.map((estoque, index) => {
                return (
                  <Tr key={estoque.ESTQCOD} isSelectable={true} onClick={() => handleSelected(index)}>
                    <Td extraClass="width-100" isIdentifier>{estoque.ESTQCOD}</Td>
                    <Td>{estoque.ESTQNOMECOMP}</Td>
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

export { PopUpSearchEstoque }