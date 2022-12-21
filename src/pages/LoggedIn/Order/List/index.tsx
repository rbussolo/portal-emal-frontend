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
import { useLoading } from "../../../../contexts/LoadingProvider";
import { ContainerFiltros, Filtros } from "../../../../global.styles";
import { api } from "../../../../services/api";
import { Cliente, EmptyCliente } from "../../../../services/cliente";
import { EmptyEstoque, Estoque } from "../../../../services/estoque";
import { EmptyPedidoGroup, FiltersPedidos, ListPedidos, PedidoGroup, pedidoSituacaoEnum } from "../../../../services/pedido";
import { Alert } from "../../../../utils/alert";
import { formatDateToString, formatNumberToAmount, formatNumberToReal, maskNumerica } from "../../../../utils/mask";

const OrderList = function () {
  const navigate = useNavigate();
  const load = useLoading();

  const [filters, setFilters] = useState<FiltersPedidos>({});
  const [data, setData] = useState<ListPedidos>({ count: 0, countPerPage: 0, pedidos: [] });
  const [dataGroup, setDataGroup] = useState<PedidoGroup>({ ...EmptyPedidoGroup });
  const [showFooter, setShowFooter] = useState(false);

  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [client, setClient] = useState<Cliente>({ ...EmptyCliente });
  const [estoque, setEstoque] = useState<Estoque>({ ...EmptyEstoque });
  const [orderNumber, setOrderNumber] = useState("");
  const [checkNobres, setCheckNobres] = useState(false);
  const [checkCuiaba, setCheckCuiaba] = useState(false);
  const [checkAcucar, setCheckAcucar] = useState(false);
  const [checkItaipu, setCheckItaipu] = useState(false);
  const [checkCamil, setCheckCamil] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  function fetchData(filters: FiltersPedidos) {
    load.showLoading();

    api.get("/pedidos", { params: filters }).then(response => {
      setData(response.data as ListPedidos);
    }).catch((err) => {
      Alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  useEffect(() => {
    fetchData(filters);
  }, []);

  useEffect(() => {
    const dataGroup = { ...EmptyPedidoGroup };

    if (data.pedidos) {
      for (let i = 0; i < data.pedidos!.length; i++) {
        dataGroup.IPEDQUANT += data.pedidos[i].IPEDQUANT;
        dataGroup.IPEDPESOTOT += data.pedidos[i].IPEDPESOTOT;
        dataGroup.IPEDUNIT += data.pedidos[i].IPEDUNIT;
        dataGroup.IPEDQUANTDESP += data.pedidos[i].IPEDQUANTDESP;
        dataGroup.IPEDQUANTCANC += data.pedidos[i].IPEDQUANTCANC;
        dataGroup.IPEDQUANTSALDO += data.pedidos[i].IPEDQUANTSALDO;
        dataGroup.PEDPESOTOT += data.pedidos[i].PEDPESOTOT;
        dataGroup.PEDTOTALBRUTO += data.pedidos[i].PEDTOTALBRUTO;
      }
    }

    if (data.pedidos && data.pedidos.length > 0) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }

    setDataGroup(dataGroup);
  }, [data]);

  async function handleSearch() {
    const newFilters: FiltersPedidos = { 
      page: 1, 
      pedNum: orderNumber.length > 0 ? parseInt(orderNumber) : 0,
      pedCli: client.CLICOD,
      pedDataInicial: initialDate,
      pedDataFinal: finalDate,
      estqCod: estoque.ESTQCOD && estoque.ESTQCOD > 0 ? estoque.ESTQCOD : 0,
      pedNobres: checkNobres,
      pedCuiaba: checkCuiaba,
      pedAcucar: checkAcucar,
      pedItaipu: checkItaipu,
      pedCamil: checkCamil
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
    setClient({ ...EmptyCliente });
    setEstoque({ ...EmptyEstoque });
    setOrderNumber("");
    setCheckNobres(false);
    setCheckCuiaba(false);
    setCheckAcucar(false);
    setCheckItaipu(false);
    setCheckCamil(false);
  }

  function handleDelete(id: number) {
    Alert.showConfirm("Realmente deseja remover este registro?", () => {
      load.showLoading();

      api.delete("/users/" + id).then(() => {
        fetchData(filters);

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

              <CheckFilters name="cuiaba" label="Cuiabá" inline={true}
                checked={checkCuiaba} onChange={e => setCheckCuiaba(e.target.checked)}
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
              <Td isNumeric>Qtde. (t)</Td>
              <Td isNumeric>R$ (t)</Td>
              <Td isNumeric>Despachado (t)</Td>
              <Td isNumeric>Cancelado (t)</Td>
              <Td isNumeric>Saldo (t)</Td>
              <Td isNumeric>Total (t)</Td>
              <Td isAction>Ações</Td>
            </tr>
          </thead>
          <tbody>
            {data.pedidos?.map((pedido, index) => {
              return (
                <tr key={pedido.PEDNUM}>
                  <Td isIdentifier>{pedido.PEDNUM}</Td>
                  <Td>{formatDateToString(pedido.PEDDATA)}</Td>
                  <Td>{pedido.CLICOD + ' - ' + pedido.CLINOME}</Td>
                  <Td>{pedidoSituacaoEnum[pedido.PEDSIT]}</Td>
                  <Td>{pedido.FILIAL}</Td>
                  <Td>{pedido.ESTQNOME}</Td>
                  <Td isNumeric>{formatNumberToAmount(pedido.IPEDPESOTOT)}</Td>
                  <Td isNumeric>{formatNumberToReal(pedido.IPEDUNIT)}</Td>
                  <Td isNumeric>{formatNumberToAmount(pedido.IPEDQUANTDESP)}</Td>
                  <Td isNumeric>{formatNumberToAmount(pedido.IPEDQUANTCANC)}</Td>
                  <Td isNumeric>{formatNumberToAmount(pedido.IPEDQUANTSALDO)}</Td>
                  <Td isNumeric>{formatNumberToReal(pedido.PEDTOTALBRUTO)}</Td>
                  <Td isAction>
                    <div>
                      <IconDisplay to="/user/create" state={{ mode: 'display', id: pedido.PEDNUM }} />
                      <IconUpdate to="/user/create" state={{ mode: 'update', id: pedido.PEDNUM }} />
                      <IconDelete to="#" onclick={(e) => { handleDelete(pedido.PEDNUM!) }} />
                    </div>
                  </Td>
                </tr>
              )
            })}
          </tbody>
          <tfoot className={`${showFooter ? "" : "hidden"}`}>
            <tr>
              <Td colSpan={6}>Total:</Td>
              <Td isNumeric>{formatNumberToAmount(dataGroup.IPEDPESOTOT)}</Td>
              <Td isNumeric>{formatNumberToReal(dataGroup.IPEDUNIT)}</Td>
              <Td isNumeric>{formatNumberToAmount(dataGroup.IPEDQUANTDESP)}</Td>
              <Td isNumeric>{formatNumberToAmount(dataGroup.IPEDQUANTCANC)}</Td>
              <Td isNumeric>{formatNumberToAmount(dataGroup.IPEDQUANTSALDO)}</Td>
              <Td isNumeric>{formatNumberToReal(dataGroup.PEDTOTALBRUTO)}</Td>
              <Td></Td>
            </tr>
          </tfoot>
        </Table>
      </List>
    </>
  );
}

export { OrderList }