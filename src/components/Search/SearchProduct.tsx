import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PopUpSearchEstoque } from '../../pages/LoggedIn/Estoque/PopupSearch';
import { api } from '../../services/api';
import { EmptyEstoque, Estoque } from "../../services/estoque";
import { Alert } from '../../utils/alert';
import { maskInteger, maskNumerica } from '../../utils/mask';

interface SearchEstoqueProps {
  estoque: Estoque;
  labelClass?: string;
  divInputClass?: string;
  onEstoqueChange: (estoque: Estoque) => void;
}

interface Estoques {
  estoques: Estoque[];
  count: number;
  countPerPage: number;
}

const SearchEstoque = ({ estoque, labelClass = "col-sm-3", divInputClass = "col-sm-9", onEstoqueChange }: SearchEstoqueProps) => {
  const [codigo, setCodigo] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  function onBlurEstoque() {
    if (codigo === 0) {
      onEstoqueChange(EmptyEstoque);
    } else if (estoque.ESTQCOD !== codigo) {
      api.get("/estoques", { params: { cod: codigo }}).then(response => {
        const estoques = response.data as Estoques;

        onEstoqueChange(estoques.estoques[0]);
      }).catch(err => {
        setCodigo(0);
        onEstoqueChange(EmptyEstoque);

        Alert.showAxiosError(err);
      });
    }
  }

  function onSelectedEstoque(estoque: Estoque) {
    setCodigo(estoque.ESTQCOD || 0);
    onEstoqueChange(estoque);
    setIsOpen(false);
  }

  return (
    <>
      <div className='mb-3 row'>
        <label className={`${labelClass} col-form-label`}>Produto:</label>
        <div className={divInputClass}>
          <div className="input-group">
            <InputCodigo
              type="text"
              className="form-control"
              placeholder="Código do Produto"
              value={codigo > 0 ? codigo : ""}
              onChange={e => setCodigo(maskInteger(e.target.value))}
              onBlur={onBlurEstoque}
            />
            <button className="input-group-text" onClick={() => setIsOpen(true)}><i className="bi bi-search"></i></button>
            <input
              type="text"
              className="form-control"
              disabled
              value={estoque.ESTQNOMECOMP}
            />
          </div>
        </div>
      </div>

      <PopUpSearchEstoque isOpen={isOpen} onSelected={onSelectedEstoque} onRequestClose={() => setIsOpen(false)} />
    </>
  );
}

const InputCodigo = styled.input`
  max-width: 180px;
`;

export { SearchEstoque }