import { useState } from 'react';
import { useAlert } from '../../contexts/AlertProvider';
import { PopUpSearchClient } from '../../pages/LoggedIn/Client/PopupSearch';
import { api } from '../../services/api';
import { Estoque } from "../../services/estoque";

interface SearchEstoqueProps {
  estoque: Estoque;
  onEstoqueChange: (estoque: Estoque) => void;
}

const SearchEstoque = ({ estoque, onEstoqueChange }: SearchEstoqueProps) => {
  let lastEstoqueCodigo = 0;
  const [isOpen, setOpen] = useState(false);
  const alert = useAlert();

  function onBlurEstoque() {
    if (!estoque.ESTQCOD) {
      onEstoqueChange({ ESTQCOD: 0, ESTQNCM: "", ESTQNOMECOMP: "" });
    } else if (estoque.ESTQCOD !== lastEstoqueCodigo) {
      api.get("/inventory/" + estoque.ESTQCOD).then(response => {
        onEstoqueChange(response.data);
      }).catch(err => {
        alert.showAxiosError(err);
      });
    }

    lastEstoqueCodigo = estoque.ESTQCOD || 0;
  }

  function onSelectedEstoque() {
    onEstoqueChange(estoque);
    setOpen(false);
  }

  return (
    <>
      <div className='mb-3 row'>
        <label className="col-sm-3 col-form-label">Produto:</label>
        <div className="col-sm-9">
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="CPF/CNPJ do Cliente"
              value={estoque.ESTQCOD}
              onChange={e => onEstoqueChange({ ...estoque, ESTQCOD: parseInt(e.target.value) })}
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

      <PopUpSearchClient isOpen={isOpen} onSelectedClient={onSelectedEstoque} onRequestClose={() => setOpen(false)} />
    </>
  );
}

export { SearchEstoque }