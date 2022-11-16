import styled from "styled-components";

const ContainerFiltros = styled.div`
  padding-top: 2rem;
`

const Filtros = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1.5rem;
  background-color: #FFF;

  > hr {
    margin-top: -5px;
  }
`

const ContainerTable = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;

  padding: 1.5rem;
  width: 100%;
  max-width: calc(100% - 3rem);

  margin-left: auto;
  margin-right: auto;

  background-color: #FFF;
`

export { ContainerFiltros, ContainerTable, Filtros };