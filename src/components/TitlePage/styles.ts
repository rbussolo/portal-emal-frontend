import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 1rem;
  
  display: flex;
  justify-content: space-between;

  > h1 {
    margin-bottom: 0rem;
    line-height: 1;
  }

  > span {
    color: #2c3e50;
    font-weight: 500;
  }
`;

const ContainerSubTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

export { Container, ContainerSubTitle };