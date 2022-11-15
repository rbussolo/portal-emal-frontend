import { Footer } from "../Footer"
import { Header } from "../Header"
import { Container } from "./styles";

interface TemplateProps {
  title?: string;
  description?: string;
  children: JSX.Element | JSX.Element[];
}

function Template({ title, description, children }: TemplateProps){
  return (
    <>
      <Header />

      <Container>
        { children }
      </Container>

      <Footer />
    </>
  )
}

export { Template }