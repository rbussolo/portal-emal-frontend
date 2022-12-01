import styled from "styled-components";

const ContainerFiltros = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
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

export { ContainerFiltros, Filtros };