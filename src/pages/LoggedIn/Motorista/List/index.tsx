/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { Button } from "../../../../components/Button";
import { ButtonsFilter } from "../../../../components/Button/styles";
import { InputFilters, SelectFilters } from "../../../../components/InputGroup";
import { IconDelete, IconDisplay, IconUpdate, List, Table, Td } from "../../../../components/Table";
import { TitlePage } from "../../../../components/TitlePage";
import { useLoading } from "../../../../contexts/LoadingProvider";
import { ContainerFiltros, Filtros } from "../../../../global.styles";
import { api } from "../../../../services/api";
import { Alert } from "../../../../utils/alert";
import { FiltersMotorista, ListMotoristas } from "../../../../services/motorista";

interface ICidade {
  CIDCOD: number;
  CIDNOME: string;
}

interface IEstado {
  ESTCOD: number;
  ESTNOME: string;
}

const MotoristaList = function () {
  const navigate = useNavigate();
  const load = useLoading();

  const formik = useFormik({
    initialValues: {
      filters: {
        page: 1,
        MOTCPF: "",
        MOTNOME: "",
        CIDCOD: 0,
        ESTCOD: 0
      } as FiltersMotorista,
      data: {
        count: 0,
        countPerPage: 0,
        motorista: []
      } as ListMotoristas,
      MOTCPF: "",
      MOTNOME: "",
      ESTCOD: 0,
      CIDCOD: 0,
      CIDADES: [] as ICidade[],
      ESTADOS: [] as IEstado[]
    },
    onSubmit: ({ MOTCPF, MOTNOME, ESTCOD, CIDCOD }) => {
      const newFilters: FiltersMotorista = { MOTCPF, MOTNOME, ESTCOD, CIDCOD, page: 1 };

      formik.setFieldValue("filters", newFilters);
      fetchData(newFilters);
    }
  });

  function fetchData(filters: FiltersMotorista) {
    load.showLoading();

    api.get("/motoristas", { params: filters }).then(response => {
      formik.setFieldValue("data", response.data);
    }).catch((err) => {
      Alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  useEffect(() => {
    fetchData(formik.values.filters);

    api.get("/endereco/estados").then(response => {
      formik.setFieldValue("ESTADOS", response.data);
    }).catch((err) => {
      Alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }, []);

  useEffect(() => {
    if (formik.values.ESTCOD) {
      api.get("/endereco/cidades/" + formik.values.ESTCOD).then(response => {
        formik.setFieldValue("CIDADES", response.data);
      }).catch((err) => {
        Alert.showAxiosError(err);
      }).finally(() => {
        load.hideLoading();
      });
    } else {
      formik.setFieldValue("CIDADES", []);
    }
  }, [formik.values.ESTCOD]);

  async function handlePage(page: number) {
    const newFilters: FiltersMotorista = { ...formik.values.filters, page };

    formik.setFieldValue("filters", newFilters);
    fetchData(newFilters);
  }

  function handleClean() {
    formik.setFieldValue("MOTCPF", "");
    formik.setFieldValue("MOTNOME", "");
    formik.setFieldValue("ESTCOD", 0);
    formik.setFieldValue("CIDCOD", 0);
  }

  function handleDelete(id: number) {
    Alert.showConfirm("Realmente deseja remover este registro?", () => {
      load.showLoading();

      api.delete(`/motoristas/${id}`).then(() => {
        fetchData(formik.values.filters);

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
          <TitlePage title="Motoristas" action={{ description: "Novo Motorista", onClick: () => { navigate("/driver/create/insert/0") } }} />

          <hr />

          <form onSubmit={formik.handleSubmit}>
            <div className='row'>
              <div className='col-md-5'>
                <InputFilters label="CPF" name="cpf"
                  value={formik.values.MOTCPF}
                  onChange={(e) => formik.setFieldValue("MOTCPF", e.target.value)}
                />
              </div>
              <div className='col-md-7'>
                <InputFilters label="Nome" name="nome"
                  labelClass='col-xl-2 col-sm-3'
                  divInputClass='col-xl-10 col-sm-9'
                  value={formik.values.MOTNOME}
                  onChange={(e) => formik.setFieldValue("MOTNOME", e.target.value)}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-md-5'>
                <SelectFilters 
                  label="Estado" 
                  name="estado" 
                  value={formik.values.ESTCOD} 
                  onChange={(e) => formik.setFieldValue("ESTCOD", e.target.value)}
                >
                  <option value="0" defaultValue="0">Todos</option>
                  { formik.values.ESTADOS.map((estado, index) => {
                    return (
                      <option key={index} value={estado.ESTCOD}>{estado.ESTNOME}</option>
                    )
                  })}
                </SelectFilters>
              </div>
              <div className='col-md-7'>
                <SelectFilters 
                  label="Cidade" 
                  name="cidade" 
                  labelClass='col-xl-2 col-sm-3'
                  divInputClass='col-xl-10 col-sm-9'
                  value={formik.values.CIDCOD} 
                  onChange={(e) => formik.setFieldValue("ESTCOD", e.target.value)}
                >
                  <option value="0" defaultValue="0">Todos</option>
                  {formik.values.CIDADES.map((cidade, index) => {
                    return (
                      <option key={index} value={cidade.CIDCOD}>{cidade.CIDNOME}</option>
                    )
                  })}
                </SelectFilters>
              </div>
            </div>

            <ButtonsFilter>
              <Button type="submit" buttonClass="btn-primary" label="Consultar" />
              <Button type="button" onClick={handleClean} buttonClass="btn-secondary" label="Limpar Filtros" />
            </ButtonsFilter>
          </form>
        </Filtros>
      </ContainerFiltros>
      <List count={formik.values.data.count} countPerPage={formik.values.data.countPerPage} currentPage={formik.values.filters.page} onChangePage={handlePage}>
        <Table>
          <thead>
            <tr>
              <Td isIdentifier>Id</Td>
              <Td>CPF</Td>
              <Td>Nome</Td>
              <Td>Telefone</Td>
              <Td>Celular</Td>
              <Td>Cidade</Td>
              <Td isAction>Ações</Td>
            </tr>
          </thead>
          <tbody>
            { formik.values.data.motorista?.map((motorista, index) => {
              return (
                <tr key={motorista.MOTCOD}>
                  <Td isIdentifier>{motorista.MOTCOD}</Td>
                  <Td>{motorista.MOTCPF}</Td>
                  <Td>{motorista.MOTNOME}</Td>
                  <Td>{motorista.MOTTELEFONE}</Td>
                  <Td>{motorista.MOTCELULAR}</Td>
                  <Td>{motorista.CIDNOME}</Td>
                  <Td isAction>
                    <div>
                      <IconDisplay title="Visualizar" to={`/driver/create/display/${motorista.MOTCOD}`} />
                      <IconUpdate title="Editar" to={`/driver/create/update/${motorista.MOTCOD}`} />
                      <IconDelete title="Remover" onclick={(e) => { handleDelete(motorista.MOTCOD!) }} />
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

export { MotoristaList }