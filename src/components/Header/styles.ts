import styled from 'styled-components';

const Logo = styled.img`
  max-height: 3.5rem;
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;

  a {
    color: #464f57;

    &:focus {
      color: #464f57;
    }

    &:hover, &:focus-visible {
      background-color: #e4e4e4;
      color: #005ca9;
      outline: 1px solid;
    }
  }
`

const NavItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 70px;

  i {
    margin-top: -20px;
    margin-bottom: -15px;
    font-size: 40px;
    padding-top: 10px;
  }

  span {
    font-size: 0.75rem;
  }

  @media (max-width: 992px) {
    flex-direction: row;

    width: 100%;
    justify-content: flex-start;

    gap: 10px;
    margin-left: 10px;
  }
`

export { Logo, NavItemContainer, NavbarContainer };