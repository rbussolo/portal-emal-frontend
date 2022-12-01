import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 1rem;
  
  display: flex;
  justify-content: space-between;

  > div {
    width: 100%;

    display: flex;
    justify-content: space-between;

    > h1 {
      font-size: 1.5rem;
      margin-bottom: 0rem;
      line-height: 1;
    }

    > button {
      border: none;
      background: transparent;
    }
  }
`;

export { Container };