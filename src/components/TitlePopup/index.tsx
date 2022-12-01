import { Container } from "./styles";

import closeImg from '../../assets/images/close.svg';

interface TitlePopupProps {
  title: string;
  onRequestClose: () => void;
}

export function TitlePopUp({ title, onRequestClose }: TitlePopupProps) {
  return (
    <>
      <Container>
        <div>
          <h1>{title}</h1>
          <button
            type="button"
            onClick={onRequestClose}
          >
            <img src={closeImg} alt="Fechar modal" />
          </button>
        </div>
      </Container>

      <hr />
    </>
  )
}