import { Alert } from "../../../../components/Alert";
import { TitlePage } from "../../../../components/TitlePage";
import { Footer } from "../Footer"
import { Header } from "../Header"
import { Container } from "./styles";

interface TemplatePropt {
  title: string;
  description?: string;
  alertMessage?: string;
  alertType?: string;
  children: JSX.Element | JSX.Element[];
}

function Template({ title, description, alertMessage, alertType, children }: TemplatePropt){
  return (
    <>
      <Header />

      <Container>
        <div>
          <TitlePage title={title} description={description}/>

          <Alert message={alertMessage} type={alertType} />
          
          { children }
        </div>
      </Container>

      <Footer />
    </>
  )
}

export { Template }