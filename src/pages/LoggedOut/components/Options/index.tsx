import { ReactElement } from "react";
import { Link } from "react-router-dom"
import { Container } from "./styles";

interface IOptionProp {
  link: string;
  linkDescription: string;
  description: string;
}

interface IOptionsProp {
  children: ReactElement<IOptionProp> | Array<ReactElement<IOptionProp>>;
}

function Options({ children }: IOptionsProp){
  return (
    <Container>
      { children }
    </Container>
  )
}

function Option({ link, linkDescription, description }: IOptionProp) {
  return (
    <div>
      <Link to={ link }>{ linkDescription }</Link>{ description }
    </div>
  )
}

export { Options, Option }