/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../components/Button";
import { ButtonsFilter } from "../../../../components/Button/styles";
import { InputForm, SelectForm } from "../../../../components/InputGroup";
import { TitlePage } from "../../../../components/TitlePage";
import { useLoading } from "../../../../contexts/LoadingProvider";
import { ContainerForm } from "../../../../global.styles";
import { api } from "../../../../services/api";
import { User } from "../../../../services/users";
import { Alert } from "../../../../utils/alert";
import { maskCelular, maskCpfCnpj } from "../../../../utils/mask";

const UserCreate = function() {
  const navigate = useNavigate();
  const { mode, user_id } = useParams();
  const disabled = mode === 'display' ? true : false;
  const load = useLoading();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      cpfCnpj: "",
      cellphone: "",
      type: "",
      password: ""
    },
    onSubmit: ({ name, email, cpfCnpj, cellphone, type, password }) => {
      const form = document.querySelector("form") as HTMLFormElement;

      if (!form.checkValidity()) {
        form.classList.add('was-validated');

        return Alert.showError({ message: 'Preencha todos os campos obrigatórios!' });
      }

      form.classList.remove('was-validated');

      load.showLoading();

      const method = mode !== 'insert' ? 'put' : 'post';
      const url = mode !== 'insert' ? `/users/${user_id}` : "/users";
      const user = { 
        id: mode !== 'insert' ? user_id : 0,
        cpf_cnpj: cpfCnpj,
        name,
        email,
        type,
        cellphone,
        password
      };

      api.request({ url, method, data: user }).then(response => {
        navigate("/user/list", { state: { success: true } });
      }).catch(err => {
        Alert.showAxiosError(err);
      }).finally(() => {
        load.hideLoading();
      });
    }
  });

  useEffect(() => {
    if (mode !== 'insert' && user_id) {
      load.showLoading();

      api.get(`/users/${user_id}`).then(response => {
        const user = response.data as User;

        formik.setFieldValue("name", user.name);
        formik.setFieldValue("email", user.email);
        formik.setFieldValue("cpfCnpj", maskCpfCnpj(user.cpf_cnpj));
        formik.setFieldValue("cellphone", maskCelular(user.cellphone || ""));
        formik.setFieldValue("type", user.type);
      }).catch(err => {
        Alert.showAxiosError(err);
      }).finally(() => {
        load.hideLoading();
      });
    }
  }, []);

  return (
    <ContainerForm onSubmit={formik.handleSubmit} className="container needs-validation" noValidate>
      <TitlePage title="Cadastro de Usuário" />

      <hr />

      <InputForm label="Nome" name="name" 
        type="text"
        placeholder="Nome do usuário"
        disabled={disabled}
        value={formik.values.name}
        onChange={(e) => formik.setFieldValue("name", e.target.value.toUpperCase())}
        required
      />

      <InputForm label="E-mail" name="email"
        type="text"
        placeholder="E-mail do usuário"
        disabled={disabled}
        value={formik.values.email}
        onChange={(e) => formik.setFieldValue("email", e.target.value.toLowerCase())}
        required
      />

      <InputForm label="CPF/CNPJ" name="cpf_cnpj"
        type="text"
        placeholder="CPF/CNPJ da pessoa"
        disabled={disabled}
        value={formik.values.cpfCnpj}
        onChange={(e) => formik.setFieldValue("cpfCnpj", maskCpfCnpj(e.target.value))}
        required
      />

      <InputForm label="Celular" name="cellphone"
        type="text"
        placeholder="Celular da pessoa"
        disabled={disabled}
        value={formik.values.cellphone}
        onChange={(e) => formik.setFieldValue("cellphone", maskCelular(e.target.value))}
        required
      />

      <SelectForm 
          label="Tipo" 
          name="type" 
          value={formik.values.type} 
          disabled={disabled} 
          onChange={(e) => formik.setFieldValue("type", e.target.value) }
          required
        >
        <option value="" defaultValue="">Selecione</option>
        <option value="client">Cliente</option>
        <option value="seller">Vendedor</option>
        <option value="adm">Administrador</option>
      </SelectForm>

      { mode === 'insert' ? (
        <InputForm label="Senha" name="password"
          type="password"
          placeholder="Senha do usuário"
          value={formik.values.password}
          onChange={formik.handleChange}
          required
        />
      ) : null }

      <ButtonsFilter>
        <Button type="submit" buttonClass="btn-primary" isLoading={false} label="Confirmar" />
        <Button buttonClass="btn-secondary" label="Voltar" onClick={() => navigate("/user/list")} />
      </ButtonsFilter>
    </ContainerForm>
  );
}

export { UserCreate }