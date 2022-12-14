import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useLoading } from "../../../../contexts/LoadingProvider";
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
    <h1>Requisição de pedido</h1>
  );
}

export { OrderCreate }