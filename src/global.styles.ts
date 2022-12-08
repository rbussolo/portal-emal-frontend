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

  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);

  > hr {
    margin-top: -5px;
  }
`

const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;

  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #FFF;

  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);

  > hr {
    margin-top: -5px;
  }
`;

const Container = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;

  > div {
    display: flex;
    flex-direction: column;

    padding: 1.5rem;
    background-color: #FFF;

    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);

    > hr {
      margin-top: -5px;
    }
  }
`

export { Container, ContainerFiltros, Filtros, ContainerForm };