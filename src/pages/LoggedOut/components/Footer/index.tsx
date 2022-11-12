import { Link } from "react-router-dom"
import { Container } from "./styles"

function Footer(){
  return (
    <Container>
      <div>
        <div className="left">
          <Link to="/">@2022 - Grupo Emal</Link>
        </div>
        <div className="right">
          <span>E-mail: cac@grupoemal.com.br</span> 
        </div>
      </div>
    </Container>
  )
}

export { Footer }