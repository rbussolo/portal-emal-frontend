import styled from 'styled-components';

const Logo = styled.img`
  max-height: 3.5rem;
`;

const NavbarBrandContainer = styled.div`
  display: flex;

  a:hover {
    color: #3498db;
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
`

export { Logo, NavItemContainer, NavbarBrandContainer };