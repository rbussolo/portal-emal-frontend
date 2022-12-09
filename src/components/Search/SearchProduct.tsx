import { useState } from 'react';
import styled from 'styled-components';
import { PopUpSearchEstoque } from '../../pages/LoggedIn/Estoque/PopupSearch';
import { api } from '../../services/api';
import { EmptyEstoque, Estoque } from "../../services/estoque";
import { Alert } from '../../utils/alert';
import { maskNumerica } from '../../utils/mask';

interface SearchEstoqueProps {
  estoque: Estoque;
  onEstoqueChange: (estoque: Estoque) => void;
}

interface Estoques {
  estoques: Estoque[];
  count: number;
  countPerPage: number;
}

const SearchEstoque = ({ estoque, onEstoqueChange }: SearchEstoqueProps) => {
  let lastEstoqueCodigo = "";
  const [isOpen, setOpen] = useState(false);

  function onBlurEstoque() {
    if (!estoque.ESTQCOD) {
      onEstoqueChange(EmptyEstoque);
    } else if (estoque.ESTQCOD !== lastEstoqueCodigo) {
      api.get("/estoques", { params: { cod: estoque.ESTQCOD }}).then(response => {
        const estoques = response.data as Estoques;

        onEstoqueChange(estoques.estoques[0]);
      }).catch(err => {
        Alert.showAxiosError(err);
      });
    }

    lastEstoqueCodigo = estoque.ESTQCOD || "";
  }

  function onSelectedEstoque(estoque: Estoque) {
    onEstoqueChange(estoque);
    setOpen(false);
  }

  return (
    <>
      <div className='mb-3 row'>
        <label className="col-sm-3 col-form-label">Produto:</label>
        <div className="col-sm-9">
          <div className="input-group">
            <InputCodigo
              type="text"
              className="form-control"
              placeholder="Código do Produto"
              value={estoque.ESTQCOD}
              onChange={e => onEstoqueChange({ ...estoque, ESTQCOD: maskNumerica(e.target.value) })}
              onBlur={onBlurEstoque}
            />
            <button className="input-group-text" onClick={() => setOpen(true)}><i className="bi bi-search"></i></button>
            <input
              type="text"
              className="form-control"
              disabled
              value={estoque.ESTQNOMECOMP || ""}
            />
          </div>
        </div>
      </div>

      <PopUpSearchEstoque isOpen={isOpen} onSelected={onSelectedEstoque} onRequestClose={() => setOpen(false)} />
    </>
  );
}

const InputCodigo = styled.input`
  max-width: 180px;
`;

export { SearchEstoque }