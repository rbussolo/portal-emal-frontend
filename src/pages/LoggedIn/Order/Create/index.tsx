import { useFormik } from "formik";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../components/Button";
import { ButtonsFilter } from "../../../../components/Button/styles";
import { InputForm } from "../../../../components/InputGroup";
import { SearchClient } from "../../../../components/Search/SearchClient";
import { SearchEstoque } from "../../../../components/Search/SearchProduct";
import { IconDelete, IconUpdate, Table, Td } from "../../../../components/Table";
import { SubTitle, TitlePage } from "../../../../components/TitlePage";
import { useLoading } from "../../../../contexts/LoadingProvider";
import { ContainerForm } from "../../../../global.styles";
import { Cliente, EmptyCliente } from "../../../../services/cliente";
import { EmptyEstoque, Estoque } from "../../../../services/estoque";
import { EmptyPedidoGroup, ListPedidos, PedidoEstoque } from "../../../../services/pedido";
import { Alert } from "../../../../utils/alert";
import { formatNumberToAmount, formatNumberToReal, maskInteger } from "../../../../utils/mask";

const OrderCreate = function() {
  const navigate = useNavigate();
  const { mode, PEDCOD } = useParams();
  const disabled = mode === 'display' ? true : false;
  const load = useLoading();

  const formik = useFormik({
    initialValues: {
      cliente: { ...EmptyCliente } as Cliente,
      estoqueIndex: 0,
      estoque: { ...EmptyEstoque } as Estoque,
      estoqueQuantidade: 0,
      estoqueLista: [] as PedidoEstoque[]
    },
    onSubmit: (values) => {
      
    }
  });

  const totalEstoque = useMemo(() => {
    const total = { ...EmptyPedidoGroup };

    for (let i = 0; i < formik.values.estoqueLista.length; i++) {
      total.IPEDPESOTOT += formik.values.estoqueLista[i].IPEDPESOTOT;
      total.IPEDQUANT += formik.values.estoqueLista[i].IPEDQUANT;
      total.IPEDQUANTCANC += formik.values.estoqueLista[i].IPEDQUANTCANC;
      total.IPEDQUANTDESP += formik.values.estoqueLista[i].IPEDQUANTDESP;
      total.IPEDQUANTSALDO += formik.values.estoqueLista[i].IPEDQUANTSALDO;
      total.IPEDUNIT += formik.values.estoqueLista[i].IPEDUNIT;
    }
    
    return total;
  }, [formik.values.estoqueLista])

  function handleAdicionarProduto() {
    if (!formik.values.estoque.ESTQCOD || formik.values.estoque.ESTQCOD === 0) {
      return Alert.showError({ message: "É necessário informar o Produto."});
    } else if (formik.values.estoqueQuantidade <= 0){
      return Alert.showError({ message: "É necessário informar a Quantidade." });
    }
    
    const pedidoEstoque: PedidoEstoque = {
      ESTQCOD: formik.values.estoque.ESTQCOD,
      ESTQNOMECOMP: formik.values.estoque.ESTQNOMECOMP!,
      IPEDQUANT: formik.values.estoqueQuantidade,
      IPEDPESOTOT: formik.values.estoqueQuantidade,
      IPEDUNIT: 0,
      IPEDQUANTDESP: 0,
      IPEDQUANTCANC: 0,
      IPEDQUANTSALDO: formik.values.estoqueQuantidade
    };

    if (formik.values.estoqueIndex > 0) {
      const estoqueLista = formik.values.estoqueLista.map((e, i) => {
        if (i === formik.values.estoqueIndex) {
          return pedidoEstoque;
        } else {
          return e;
        }
      });

      formik.setFieldValue('estoqueLista', estoqueLista);
    } else {
      formik.setFieldValue('estoqueLista', [...formik.values.estoqueLista, pedidoEstoque]);
    }
  }

  function handleRemoverProduto(index: number) {
    formik.setFieldValue('estoqueLista', formik.values.estoqueLista.filter((_, i) => i !== index));

    console.log(formik.values.estoqueIndex)
    console.log(index)
    if (formik.values.estoqueIndex > 0) {
      console.log('Passou: 001')
      if (formik.values.estoqueIndex === index) {
        console.log('Passou: 002')
        formik.setFieldValue('estoqueIndex', 0);
      } else if (formik.values.estoqueIndex > index) {
        console.log('Passou: 003')
        formik.setFieldValue('estoqueIndex', () => { return formik.values.estoqueIndex - 1 });
      }
    }
  }

  function handleEditarProduto(index: number) {
    const estoquePedido = formik.values.estoqueLista[index];

    formik.setFieldValue('estoqueIndex', index);
    formik.setFieldValue('estoque', { ESTQCOD: estoquePedido.ESTQCOD, ESTQNOMECOMP: estoquePedido.ESTQNOMECOMP });
    formik.setFieldValue('estoqueQuantidade', estoquePedido.IPEDQUANT);
  }

  function handleAdicionarTransporte() {

  }

  function handleEditarTransporte(index: number) {

  }

  function handleRemoverTransporte(index: number) {

  }

  return (
    <ContainerForm onSubmit={formik.handleSubmit} className="container needs-validation" noValidate>
      <TitlePage title="Cadastro de Pedidos" />

      <hr />

      <SearchClient
        client={formik.values.cliente}
        labelClass="col-sm-3 col-md-2"
        divInputClass="col-sm-9 col-md-10"
        onClientChange={(client) => formik.setFieldValue("cliente", client)}
      />

      <InputForm label="Endereço" name="endereco"
        value={formik.values.cliente.CLIENDERECO}
        labelClass="col-sm-3 col-md-2"
        divInputClass="col-sm-9 col-md-10"
        disabled
      />

      <div className='row'>
        <div className='col-md-8'>
          <InputForm label="Complemento" name="complemento" 
            value={formik.values.cliente.CLIENDERECOCOMP}
            disabled
          />
        </div>
        <div className='col-md-4'>
          <InputForm label="Número" name="numero"
            labelClass='col-md-4 col-sm-3'
            divInputClass='col-md-8 col-sm-9'
            value={formik.values.cliente.CLIENDERECONUM}
            disabled
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-8'>
          <InputForm label="Bairro" name="bairro"
            value={formik.values.cliente.CLIBAIRRO}
            disabled
          />
        </div>
        <div className='col-md-4'>
          <InputForm label="Cidade" name="cidade"
            labelClass='col-md-4 col-sm-3'
            divInputClass='col-md-8 col-sm-9'
            value={formik.values.cliente.CIDADE?.CIDNOME}
            disabled
          />
        </div>
      </div>

      <SubTitle title="Itens / Produtos" preDivision/>

      <div>
        <SearchEstoque 
          estoque={formik.values.estoque}
          labelClass="col-sm-3 col-md-2"
          divInputClass="col-sm-9 col-md-10"
          onEstoqueChange={(estoque) => formik.setFieldValue("estoque", estoque)}
        />

        <InputForm 
          label="Quantidade:" name="quantidade"
          value={formik.values.estoqueQuantidade}
          labelClass="col-sm-3 col-md-2"
          divInputClass="col-sm-9 col-md-10"
          onChange={(event) => formik.setFieldValue("estoqueQuantidade", maskInteger(event.target.value))}
        />

        <ButtonsFilter className="mb-3">
          <Button onClick={handleAdicionarProduto} buttonClass="btn-primary" label={formik.values.estoqueIndex > 0 ? "Editar Produto" : "Adicionar Produto"} />
        </ButtonsFilter>
      </div>

      { formik.values.estoqueLista.length ? (
        <Table>
          <thead>
            <tr>
              <Td isIdentifier>Nº</Td>
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
            {formik.values.estoqueLista?.map((item, index) => {
              return (
                <tr key={index + 1}>
                  <Td isIdentifier>{index + 1}</Td>
                  <Td>{item.ESTQNOMECOMP}</Td>
                  <Td isNumeric>{formatNumberToAmount(item.IPEDQUANT)}</Td>
                  <Td isNumeric>{formatNumberToReal(item.IPEDUNIT)}</Td>
                  <Td isNumeric>{formatNumberToAmount(item.IPEDQUANTDESP)}</Td>
                  <Td isNumeric>{formatNumberToAmount(item.IPEDQUANTCANC)}</Td>
                  <Td isNumeric>{formatNumberToAmount(item.IPEDQUANTSALDO)}</Td>
                  <Td isNumeric>{formatNumberToReal(item.IPEDPESOTOT)}</Td>
                  <Td isAction>
                    <div>
                      <IconUpdate onclick={(e) => { handleEditarProduto(index) }} />
                      <IconDelete onclick={(e) => { handleRemoverProduto(index) }} />
                    </div>
                  </Td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <Td colSpan={2} extraClass="text-end">Total:</Td>
              <Td isNumeric>{formatNumberToAmount(totalEstoque.IPEDQUANT)}</Td>
              <Td isNumeric>{formatNumberToReal(totalEstoque.IPEDUNIT)}</Td>
              <Td isNumeric>{formatNumberToAmount(totalEstoque.IPEDQUANTDESP)}</Td>
              <Td isNumeric>{formatNumberToAmount(totalEstoque.IPEDQUANTCANC)}</Td>
              <Td isNumeric>{formatNumberToAmount(totalEstoque.IPEDQUANTSALDO)}</Td>
              <Td isNumeric>{formatNumberToReal(totalEstoque.IPEDPESOTOT)}</Td>
              <Td></Td>
            </tr>
          </tfoot>
        </Table>
      ) : null }

      <SubTitle title="Transportadores" preDivision />

      <div>
        <InputForm
          label="Motorista" name="transporte_motorista"
          labelClass="col-sm-3 col-md-2"
          divInputClass="col-sm-9 col-md-10"
        />

        <div className='row'>
          <div className='col-md-8'>
            <InputForm label="Produto" name="transporte_produto" />
          </div>
          <div className='col-md-4'>
            <InputForm label="Quantidade" name="transporte_quantidade"
              labelClass='col-md-4 col-sm-3'
              divInputClass='col-md-8 col-sm-9'
            />
          </div>
        </div>
        
        <ButtonsFilter className="mb-3">
          <Button onClick={handleAdicionarTransporte} buttonClass="btn-primary" label="Adicionar Carregamento" />
        </ButtonsFilter>
      </div>

      <Table>
        <thead>
          <tr>
            <Td isIdentifier>Nº</Td>
            <Td>Placa</Td>
            <Td>Motorista</Td>
            <Td>Empresa</Td>
            <Td>Produto</Td>
            <Td isNumeric>Qtde. (t)</Td>
            <Td isAction>Ações</Td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td isIdentifier>1</Td>
            <Td>QXJ-1920</Td>
            <Td>REGINALDO HERCULANO FIGUEIREDO</Td>
            <Td>O. J. MARTELLI - ME</Td>
            <Td>CALCÁRIO DOLOMÍTICO</Td>
            <Td isNumeric>{formatNumberToAmount(1000)}</Td>
            <Td isAction>
              <div>
                <IconUpdate onclick={(e) => { handleEditarTransporte(1) }} />
                <IconDelete onclick={(e) => { handleRemoverTransporte(1) }} />
              </div>
            </Td>
          </tr>
          <tr>
            <Td isIdentifier>1</Td>
            <Td>QJB-0329</Td>
            <Td>DEUSDETE FERREIRA DA CUNHA</Td>
            <Td>FRIBON TRANS</Td>
            <Td>CALCÁRIO DOLOMÍTICO</Td>
            <Td isNumeric>{formatNumberToAmount(500)}</Td>
            <Td isAction>
              <div>
                <IconUpdate onclick={(e) => { handleEditarTransporte(2) }} />
                <IconDelete onclick={(e) => { handleRemoverTransporte(2) }} />
              </div>
            </Td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <Td colSpan={5} extraClass="text-end">Saldo:</Td>
            <Td isNumeric>{formatNumberToAmount(0)}</Td>
            <Td></Td>
          </tr>
        </tfoot>
      </Table>

      <SubTitle title="Condição de Pagamento e Cobrança" preDivision />

      <InputForm
        label="Parcela" name="parcela"
        labelClass="col-sm-3 col-md-2"
        divInputClass="col-sm-9 col-md-10"
      />

      <InputForm
        label="Prazo" name="prazo"
        labelClass="col-sm-3 col-md-2"
        divInputClass="col-sm-9 col-md-10"
      />

      <InputForm
        label="Total" name="total"
        labelClass="col-sm-3 col-md-2"
        divInputClass="col-sm-9 col-md-10"
      />

      <SubTitle title="Observação" preDivision />

      <div className="mb-3 row">
        <label htmlFor="observacao" className="col-sm-3 col-md-2 col-form-label">Observação:</label>
        <div className="col-sm-9 col-md-10">
          <textarea id="observacao" name="observacao" className="form-control" rows={5} />
        </div>
      </div>

      <ButtonsFilter>
        <Button type="submit" buttonClass="btn-primary" isLoading={false} label="Confirmar" />
        <Button buttonClass="btn-secondary" label="Voltar" onClick={() => navigate("/order/list")} />
      </ButtonsFilter>
    </ContainerForm>
  );
}

export { OrderCreate }