import styled from "styled-components";

const ContainerTable = styled.div`
  padding: 1.5rem;
  width: 100%;
  max-width: calc(100% - 1.5rem);

  margin-left: auto;
  margin-right: auto;

  background-color: #FFF;

  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);

  &.isPopup {
    max-width: 100%;
    margin-top: 1rem;
  }

  tr.selectable:hover {
    cursor: pointer;
    background-color: #f6e58d;
  }
`

const ContainerPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  ul li.active {
    z-index: 0;
  }
`

const ContainerNotFound = styled.div`
  padding: 1.5rem;
  width: 100%;
  max-width: calc(100% - 1.5rem);

  margin-left: auto;
  margin-right: auto;

  background-color: #FFF;

  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);

  &.isPopup {
    padding: 0rem;
    margin-top: 1rem;
    max-width: 100%;
    border: none;
  }

  > div {
    border: 1px solid;
    padding: 1.5rem;
    background-color: #f5f6f6;

    border: 1px solid #bdc3c7;
    border-radius: 5px;
  }
`

export { ContainerTable, ContainerPagination, ContainerNotFound };