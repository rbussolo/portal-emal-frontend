import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 8rem);

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

    form{
      .btn {
        width: 100%;
      }

      .waiting {
        font-size: 0.75rem;
      }
    }
  }
`