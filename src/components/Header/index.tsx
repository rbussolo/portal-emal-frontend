import logo from './../../assets/images/logo.png';
import { useAuth } from "../../contexts/AuthProvider/useAuth";
import { Navbar, NavbarBrand, Container } from "react-bootstrap";
import { Logo, NavbarBrandContainer, NavItemContainer } from './styles';

interface NavItemProps {
  icon: string;
  description: string;
}

function NavItem({ icon, description }: NavItemProps) {
  return (
    <NavItemContainer>
      <i className={icon}></i>
      <span>{ description }</span>
    </NavItemContainer>
  )
}

function Header() {
  const auth = useAuth();
  
  return (
    <Navbar expand="lg">
      <Container>
        <NavbarBrand href="/">
          <Logo src={logo} alt="Logo" />
        </NavbarBrand>
        { auth.user ? (
          <NavbarBrandContainer>
            <NavbarBrand href="/user/list">
              <NavItem icon="bi bi-person-fill-gear" description="Usuários" />
            </NavbarBrand>
            <NavbarBrand href="/client/list">
              <NavItem icon="bi bi-people-fill" description="Clientes" />
            </NavbarBrand>
            <NavbarBrand href="/driver/list">
              <NavItem icon="bi bi-person-vcard-fill" description="Motoristas" />
            </NavbarBrand>
            <NavbarBrand href="/carrier/list">
              <NavItem icon="bi bi-truck" description="Transporte" />
            </NavbarBrand>
            <NavbarBrand href="/vehicle/list">
              <NavItem icon="bi bi-truck" description="Veículos" />
            </NavbarBrand>
            <NavbarBrand href="/order/list">
              <NavItem icon="bi bi-card-list" description="Pedidos" />
            </NavbarBrand>
            <NavbarBrand href="/invoice/list">
              <NavItem icon="bi bi-card-checklist" description="Notas Fiscais" />
            </NavbarBrand>
          </NavbarBrandContainer>
        ) : null }
      </Container>
    </Navbar>
  );
}

export { Header };