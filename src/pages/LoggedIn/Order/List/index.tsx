/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/Button";
import { ButtonsFilter } from "../../../../components/Button/styles";
import { CheckFilters, InputFilters, InputFiltersGroupDates } from "../../../../components/InputGroup";
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
import { FiltersPedidos, ListPedidos, pedidoSituacaoEnum } from "../../../../services/pedido";
import { maskNumerica } from "../../../../utils/mask";

const OrderList = function () {
  const navigate = useNavigate();
  const alert = useAlert();
  const load = useLoading();

  const [filters, setFilters] = useState<FiltersPedidos>({});
  const [data, setData] = useState<ListPedidos>({ count: 0, countPerPage: 0, pedidos: [] });

  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [client, setClient] = useState<Cliente>(EmptyCliente);
  const [estoque, setEstoque] = useState<Estoque>(EmptyEstoque);
  const [orderNumber, setOrderNumber] = useState("");
  const [checkNobres, setCheckNobres] = useState(false);
  const [checkAcucar, setCheckAcucar] = useState(false);
  const [checkItaipu, setCheckItaipu] = useState(false);
  const [checkCamil, setCheckCamil] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  function fetchData(filters: FiltersPedidos) {
    load.showLoading();

    api.get("/pedidos", { params: filters }).then(response => {
      setData(response.data as ListPedidos);
    }).catch((err) => {
      alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  useEffect(() => {
    fetchData(filters);
  }, []);

  async function handleSearch() {
    const newFilters: FiltersPedidos = { 
      page: 1, 
      pedNum: parseInt(orderNumber),
      pedCli: client.CLICOD,
      pedDataInicial: initialDate,
      pedDataFinal: finalDate,
      estqCod: estoque.ESTQCOD ? parseInt(estoque.ESTQCOD) : 0
    };

    setCurrentPage(1);
    setFilters(newFilters);

    fetchData(newFilters);
  }

  async function handlePage(page: number) {
    const newFilters: FiltersPedidos = { ...filters, page };

    setCurrentPage(page);
    setFilters(newFilters);

    fetchData(newFilters);
  }

  function handleClean() {
    setInitialDate("");
    setFinalDate("");
    setClient(EmptyCliente);
    setEstoque(EmptyEstoque);
    setOrderNumber("");
    setCheckNobres(false);
    setCheckAcucar(false);
    setCheckItaipu(false);
    setCheckCamil(false);
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
            value={orderNumber}
            onChange={event => setOrderNumber(maskNumerica(event.target.value))}
          />
          
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label">Indústrias:</label>
            <div className="col-sm-9">
              <CheckFilters name="nobres" label="Nobres" inline={true}
                checked={checkNobres} onChange={e => setCheckNobres(e.target.checked)}
              />

              <CheckFilters name="acucar" label="Açúcar" inline={true}
                checked={checkAcucar} onChange={e => setCheckAcucar(e.target.checked)}
              />

              <CheckFilters name="itaipu" label="Itaipu" inline={true}
                checked={checkItaipu} onChange={e => setCheckItaipu(e.target.checked)}
              />

              <CheckFilters name="camil" label="Camil" inline={true}
                checked={checkCamil} onChange={e => setCheckCamil(e.target.checked)}
              />
            </div>
          </div>

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
              <Td isIdentifier>Nº</Td>
              <Td>Data</Td>
              <Td>Cliente</Td>
              <Td>Situação</Td>
              <Td>Usina</Td>
              <Td>Produto</Td>
              <Td>Qtde. (t)</Td>
              <Td>R$ (t)</Td>
              <Td>Despachado (t)</Td>
              <Td>Cancelado (t)</Td>
              <Td>Total (t)</Td>
              <Td isAction>Ações</Td>
            </tr>
          </thead>
          <tbody>
            {data.pedidos?.map((pedido, index) => {
              return (
                <tr key={pedido.PEDNUM}>
                  <Td isIdentifier>{pedido.PEDNUM}</Td>
                  <Td>{pedido.PEDDATA}</Td>
                  <Td>{pedido.CLICOD + ' - ' + pedido.CLINOME}</Td>
                  <Td>{pedidoSituacaoEnum[pedido.PEDSIT]}</Td>
                  <Td>{pedido.FILIAL}</Td>
                  <Td>{pedido.ESTQNOME}</Td>
                  <Td>{pedido.IPEDPESOTOT}</Td>
                  <Td>{pedido.IPEDUNIT}</Td>
                  <Td>{pedido.IPEDQUANTDESP}</Td>
                  <Td>{pedido.IPEDQUANTCANC}</Td>
                  <Td>{pedido.PEDTOTALBRUTO}</Td>
                  <Td isAction>
                    <div>
                      <IconDisplay to="/user/create" state={{ mode: 'display', id: pedido.PEDNUM }} />
                      <IconUpdate to="/user/create" state={{ mode: 'update', id: pedido.PEDNUM }} />
                      <IconDelete onclick={(e) => { handleDelete(pedido.PEDNUM!) }} />
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