import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 5rem;

  background-color: #fff;

  display: flex;
  justify-content: center;

  div {
    margin-left: 1rem;
    margin-right: 1rem;
    
    width: 100%;
    max-width: 1200px;

    display: flex;
    align-items: center;

    img {
      max-height: 4.5rem;
    }
  }
`;

export { Container };