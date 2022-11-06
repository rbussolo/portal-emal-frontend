import { Container } from "./styles";

interface TitlePageProps {
  title: string;
  description?: string;
}

export function TitlePage({ title, description }: TitlePageProps) {
  return (
    <Container>
      <h1>{title}</h1>
      { description ? (<span>{description}</span>) : null}
    </Container>
  )
}