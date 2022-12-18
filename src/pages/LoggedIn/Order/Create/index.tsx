import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { InputForm } from "../../../../components/InputGroup";
import { SearchClient } from "../../../../components/Search/SearchClient";
import { TitlePage } from "../../../../components/TitlePage";
import { useLoading } from "../../../../contexts/LoadingProvider";
import { ContainerForm } from "../../../../global.styles";
import { Cliente, EmptyCliente } from "../../../../services/cliente";

const OrderCreate = function() {
  const navigate = useNavigate();
  const { mode, PEDCOD } = useParams();
  const disabled = mode === 'display' ? true : false;
  const load = useLoading();

  const formik = useFormik({
    initialValues: {
      cliente: { ...EmptyCliente } as Cliente
    },
    onSubmit: (values) => {
      
    }
  });

  return (
    <ContainerForm onSubmit={formik.handleSubmit} className="container needs-validation" noValidate>
      <TitlePage title="Cadastro de Pedidos" />

      <hr />

      <SearchClient
        client={formik.values.cliente}
        onClientChange={(client) => formik.setFieldValue("cliente", client)}
      />

      <div className='row'>
        <div className='col-md-9'>
          <InputForm label="Endereço" name="endereco" 
            labelClass='col-md-4 col-sm-3'
            divInputClass='col-md-8 col-sm-9'
            value={formik.values.cliente.CLIENDERECO}
            disabled
          />
        </div>
        <div className='col-md-3'>
          <InputForm label="Número" name="numero"
            labelClass='col-md-6 col-sm-3'
            divInputClass='col-md-6 col-sm-9'
            value={formik.values.cliente.CLIENDERECONUM}
            disabled
          />
        </div>
      </div>
    </ContainerForm>
  );
}

export { OrderCreate }