import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 3rem;

  background-color: #113a5f;

  display: flex;
  justify-content: center;

  color: white;

  > div {
    margin-left: 1rem;
    margin-right: 1rem;

    width: 100%;
    max-width: 1200px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      color: white;
      text-decoration: none;
      font-weight: 400;

      padding: 0.75rem;

      &:hover {
        background-color: #FFF;
        color: #113a5f;
      }
    }

    > div {
      span + span {
        margin-left: 20px;
      }
    }
  }

  @media (max-width: 768px) {
    > div {
      div.left {
        display: flex;
        flex-direction: column;

        span + span {
          margin-left: 0px;
        }
      }
    }
  }
`