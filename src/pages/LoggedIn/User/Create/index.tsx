/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../components/Button";
import { ButtonsFilter } from "../../../../components/Button/styles";
import { InputForm, SelectForm } from "../../../../components/InputGroup";
import { TitlePage } from "../../../../components/TitlePage";
import { useAlert } from "../../../../contexts/AlertProvider";
import { useLoading } from "../../../../contexts/LoadingProvider";
import { ContainerForm } from "../../../../global.styles";
import { api } from "../../../../services/api";
import { User, UserType } from "../../../../services/users";
import { maskCelular, maskCpfCnpj } from "../../../../utils/mask";

interface UserCreateParams {
  id?: number;
  mode: string;
}

const UserCreate = function() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, mode } = location.state as UserCreateParams;
  const disabled = mode === 'display' ? true : false;
  const load = useLoading();
  const alert = useAlert();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(mode !== 'insert' && id) {
      load.showLoading();

      api.get("/users/" + id).then(response => {
        const user = response.data as User;

        setName(user.name);
        setEmail(user.email);
        setCpfCnpj(maskCpfCnpj(user.cpf_cnpj));
        setCellphone(maskCelular(user.cellphone || ''));
        setType(user.type!);
      }).catch(err => {
        alert.showAxiosError(err);
      }).finally(() => {
        load.hideLoading();
      });
    }
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    if(!form.checkValidity()) {
      form.classList.add('was-validated');

      return alert.showError({ message: 'Preencha todos os campos obrigatórios!' });
    }

    form.classList.remove('was-validated');
    
    load.showLoading();

    const userType: keyof UserType = type as keyof UserType;

    let method = 'post';
    let url = "/users";
    let user: User = {
      id, 
      cpf_cnpj: cpfCnpj,
      name,
      email,
      type: userType,
      cellphone,
      password
    }

    if (mode !== 'insert') {
      method = 'put';
      url = "/users/" + id;
    }

    api.request({ url, method, data: user }).then(response => {
      navigate("/user/list", { state: { success: true }});
    }).catch(err => {
      alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  return (
    <ContainerForm onSubmit={handleSubmit} className="container needs-validation" noValidate>
      <TitlePage title="Cadastro de Usuário" />

      <hr />

      <InputForm label="Nome" name="name"
        type="text"
        placeholder="Nome do usuário"
        disabled={disabled}
        value={name}
        onChange={(e) => setName(e.target.value.toUpperCase())}
        required
      />

      <InputForm label="E-mail" name="email"
        type="text"
        placeholder="E-mail do usuário"
        disabled={disabled}
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
        required
      />

      <InputForm label="CPF/CNPJ" name="cpf_cnpj"
        type="text"
        placeholder="CPF/CNPJ da pessoa"
        disabled={disabled}
        value={cpfCnpj}
        onChange={(e) => setCpfCnpj(maskCpfCnpj(e.target.value))}
        required
      />

      <InputForm label="Celular" name="cellphone"
        type="text"
        placeholder="Celular da pessoa"
        disabled={disabled}
        value={cellphone}
        onChange={(e) => setCellphone(maskCelular(e.target.value))}
        required
      />

      <SelectForm label="Tipo" name="type" value={type} disabled={disabled} onChange={(e) => setType(e.target.value)} required>
        <option value="" defaultValue="">Selecione</option>
        <option value="client">Cliente</option>
        <option value="seller">Vendedor</option>
        <option value="admin">Administrador</option>
      </SelectForm>

      { mode === 'insert' ? (
        <InputForm label="Senha" name="password"
          type="password"
          placeholder="Senha do usuário"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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