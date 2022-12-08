import { TitlePage } from "../../../components/TitlePage";
import { Container } from "../../../global.styles";
import { Card, CardBody, Cards } from "./styles";

import pin from './../../../assets/images/pin.png';

function Company() {
  return (
    <Container className="container">
      <div>
        <TitlePage title="Localização Indústrias" />

        <hr />

        <Cards>
          <Card className="card">
            <div className="card-body">
              <h2 className="card-title">Emal Nobres</h2>
              <CardBody>
                <div>
                  <img src={pin} alt=""/>
                </div>
                <div>
                  <p className="card-text">
                    <p>Rodovia BR 163 / 364 km 555,6</p>
                    <p>Zona Rural</p>
                    <p>78460-000</p>
                    <p>Nobres - MT</p>
                    <p>(65) 3613-3206</p>
                  </p>
                  <a 
                    href="https://www.google.com/maps/place/Grupo+EMAL+(Empresa+Mineradora+Aripan%C3%A3+Ltda)/@-14.74974,-56.339885,17z/data=!4m5!3m4!1s0x939ef19f80cb3caf:0x6f93a4e05eb367d7!8m2!3d-14.748246!4d-56.340121" 
                    target="_blank" 
                    className="card-link" 
                    rel="noreferrer">
                    Localização (Google Maps)
                  </a>
                </div>
              </CardBody>
            </div>
          </Card>

          <Card className="card">
            <div className="card-body">
              <h2 className="card-title">Emal Açúcar</h2>
              <CardBody>
                <div>
                  <img src={pin} alt="" />
                </div>
                <div>
                  <p className="card-text">
                    <p>Rodovia MT 240 km 22</p>
                    <p>Zona Rural</p>
                    <p>78460-000</p>
                    <p>Nobres - MT</p>
                    <p>(65) 3613-3403</p>
                  </p>
                  <a
                    href="https://www.google.com/maps/place/Emal+do+a%C3%A7%C3%BAcar/@-14.4590243,-56.054732,18z/data=!4m5!3m4!1s0x939fad71b16bd79b:0xe73e04ad41795a1c!8m2!3d-14.4593499!4d-56.0551964"
                    target="_blank"
                    className="card-link"
                    rel="noreferrer">
                    Localização (Google Maps)
                  </a>
                </div>
              </CardBody>
            </div>
          </Card>

          <Card className="card">
            <div className="card-body">
              <h2 className="card-title">Mineração Itaipú</h2>
              <CardBody>
                <div>
                  <img src={pin} alt="" />
                </div>
                <div>
                  <p className="card-text">
                    <p>Rodovia MT 246km 35</p>
                    <p>Zona Rural</p>
                    <p>78039-000</p>
                    <p>Barra do Bugres - MT</p>
                    <p>(65) 3613-3206</p>
                  </p>
                  <a
                    href="https://www.google.com/maps/place/Minera%C3%A7%C3%A3o+Itaipu/@-15.1585293,-56.8419463,17z/data=!3m1!4b1!4m5!3m4!1s0x939ead7dcf64787b:0xbd03ec41c8979989!8m2!3d-15.1585472!4d-56.8374428"
                    target="_blank"
                    className="card-link"
                    rel="noreferrer">
                    Localização (Google Maps)
                  </a>
                </div>
              </CardBody>
            </div>
          </Card>

          <Card className="card">
            <div className="card-body">
              <h2 className="card-title">Camil Cáceres Mineração</h2>
              <CardBody>
                <div>
                  <img src={pin} alt="" />
                </div>
                <div>
                  <p className="card-text">
                    <p>Rodovia BR 070 km 708</p>
                    <p>Zona Rural</p>
                    <p>78200-000</p>
                    <p>Cáceres - MT</p>
                    <p>(65) 3613-3206</p>
                  </p>
                  <a
                    href="https://www.google.com/maps/place/Calc%C3%A1rio+Emal/@-16.1129617,-57.5646979,10.67z/data=!4m6!3m5!1s0x939b034aab1becb9:0xb508a30c2a3b771c!8m2!3d-16.2041854!4d-57.5761947!16s%2Fg%2F11g9t3xdg3"
                    target="_blank"
                    className="card-link"
                    rel="noreferrer">
                    Localização (Google Maps)
                  </a>
                </div>
              </CardBody>
            </div>
          </Card>
        </Cards>
      </div>
    </Container>
  )
}

export { Company };