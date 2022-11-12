import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 5rem);

  background-color: #e8e8e8;

  display: flex;
  justify-content: center;

  > div {
    width: 500px;
    height: 100%;
    max-width: calc(100% - 75px);

    margin-top: 2rem;
    display: flex;
    flex-direction: column;

    padding: 1.5rem;
    background-color: #fff;

    > h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    form .btn {
      width: 100%;
    }

    > div.options {
      margin-top: 1rem;
    }

    div.waiting {
      font-size: 0.75rem;
    }
  }
`;

export { Container };