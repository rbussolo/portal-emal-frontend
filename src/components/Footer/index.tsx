import { Container } from "./styles"

function Footer(){
  return (
    <Container>
      <div>
        <div className="left">
          <span>cac@grupoemal.com.br</span>
          <span>(65) 3618-3354 / 3362 / 3366</span>
        </div>
        <div className="right">
          <a href="/company">Localização Indústrias</a> 
        </div>
      </div>
    </Container>
  )
}

export { Footer }