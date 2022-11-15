import { Link } from "react-router-dom"
import { Container } from "./styles"

function Footer(){
  return (
    <Container>
      <div>
        <div className="left">
          <a href="/">@2022 - Grupo Emal</a>
        </div>
        <div className="right">
          <span>E-mail: cac@grupoemal.com.br</span> 
        </div>
      </div>
    </Container>
  )
}

export { Footer }