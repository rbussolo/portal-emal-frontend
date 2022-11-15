import { Container } from "./styles";
import logo from './../../assets/images/logo.png';

function Header() {
  return (
    <Container>
      <div>
        <img src={logo} alt="Logo"/>
      </div>
    </Container>
  );
}

export { Header };