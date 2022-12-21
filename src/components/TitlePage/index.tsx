import { Button } from "../Button";
import { Container, ContainerSubTitle } from "./styles";

interface TitlePageProps {
  title: string;
  description?: string;
  action?: {
    description: string;
    onClick: () => void;
  }
}

export function TitlePage({ title, description, action }: TitlePageProps) {
  return (
    <Container>
      <div>
        <h1>{title}</h1>
        { description ? (<span>{description}</span>) : null}
      </div>
      { action ? (
        <div>
          <Button buttonClass="btn-success" label={action.description} onClick={action.onClick} />
        </div>
      ) : null }
    </Container>
  )
}

interface SubTitleProps {
  title: string;
  preDivision?: boolean;
}

export function SubTitle({ title, preDivision = false }: SubTitleProps) {
  return (
    <ContainerSubTitle>
      { preDivision ? (<hr />) : null}

      <div>
        <h3>{title}</h3>
      </div>
    </ContainerSubTitle>
  )
}