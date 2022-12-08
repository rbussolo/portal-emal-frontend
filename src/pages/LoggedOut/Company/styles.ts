import styled from "styled-components";

const Cards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`

const Card = styled.div`
  width: 25rem;
  min-width: 25rem;

  background-color: var(--background);
`

const CardBody = styled.div`
  display: flex;
  gap: 1rem;

  p {
    margin-bottom: 0;
  }
`;

export { Cards, Card, CardBody };