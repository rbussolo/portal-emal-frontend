import styled from "styled-components";

const ContainerTable = styled.div`
  padding: 1.5rem;
  width: 100%;
  max-width: calc(100% - 3rem);

  margin-left: auto;
  margin-right: auto;

  background-color: #FFF;
`

const ContainerPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export { ContainerTable, ContainerPagination };