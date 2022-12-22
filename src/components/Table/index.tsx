import React from "react";
import { Link } from "react-router-dom";
import { ContainerNotFound, ContainerPagination, ContainerTable } from "./styles";

interface ListProps {
  count?: number;
  countPerPage?: number;
  currentPage?: number;
  isPopup?: boolean;
  showResults?: boolean;
  onChangePage: (page: number) => void;
  children: JSX.Element | JSX.Element[];
}

function List({ count = 0, countPerPage = 50, currentPage = 1, showResults = true, isPopup = false, onChangePage, children }: ListProps) {
  if (!showResults) {
    return null;
  }

  if (count === 0) {
    return (
      <ContainerNotFound className={`${isPopup ? 'isPopup' : ''}`}>
        <div>
          Nenhum registro foi encontrado!
        </div>
      </ContainerNotFound>
    );
  }

  const lastPage = countPerPage > 0 ? Math.ceil(count / countPerPage) : 1;
  const countPages = isPopup ? 1 : 2;
  
  let pages: number[] = [];
  
  if (!isPopup && (currentPage < 3 || count <= 5 * countPerPage)) {
    pages = [1, 2, 3, 4, 5];
  } else if (isPopup && (currentPage < 2 || count <= 3 * countPerPage)) {
    pages = [1, 2, 3];
  } else {
    const initial = currentPage + countPages > lastPage ? currentPage - countPages - (currentPage + countPages - lastPage) : currentPage - countPages;
    const final = currentPage + countPages > lastPage ? lastPage : currentPage + countPages;

    for (let i = initial; i <= final; i++) {
      pages.push(i);
    }
  }

  return (
    <ContainerTable className={`${isPopup ? 'isPopup' : 'mb-5'}`}>
      <div>
        <ContainerPagination>
          <div>Total de registros: {count}</div>
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage > 1 ? '' : 'disabled'}`}>
                <button className="page-link" onClick={() => onChangePage(currentPage - 1)}>Pagina Anterior</button>
              </li>
              {pages.map(page => {
                return <li key={page} className={`page-item ${currentPage === page ? 'active' : ''} ${lastPage < page ? 'disabled' : ''}`}><button className="page-link" onClick={() => onChangePage(page)}>{page}</button></li>
              })}
              <li className={`page-item ${currentPage * countPerPage < count ? '' : 'disabled'}`}>
                <button className="page-link" onClick={() => onChangePage(currentPage + 1)}>Próxima Pagina</button>
              </li>
            </ul>
          </nav>
        </ContainerPagination>
      </div>
      <div className="table-responsive">
        { children }
      </div>
    </ContainerTable>
  )
}

interface TableProps {
  children: JSX.Element | JSX.Element[] | null | undefined;
}

function Table({ children }: TableProps) {
  return (
    <table className="table table-striped table-hover table-bordered">
      { children }
    </table>
  );
}

interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  isSelectable?: boolean;
  children?: JSX.Element | JSX.Element[] | any;
}

function Tr({ isSelectable, children, ...rest }: TrProps) {
  return (
    <tr className={`${isSelectable ? 'selectable' : ''}`} { ...rest }>
      { children }
    </tr>
  )
}

interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  isIdentifier?: boolean;
  isAction?: boolean;
  isNumeric?: boolean;
  extraClass?: string;
  children?: JSX.Element | JSX.Element[] | any;
}

function Td({ isIdentifier = false, isAction = false, isNumeric = false, extraClass, children, ...rest }: TdProps) {
  return (
    <td className={`${isIdentifier ? 'column-identifier ' : ''}${isAction ? 'column-action ' : ''}${isNumeric ? 'column-numeric ' : ''}${extraClass ? extraClass : ''}`} {...rest} >
      { children }
    </td>
  );
}

interface IconProps {
  onclick?: (event: React.MouseEvent<HTMLElement>) => void;
  to?: string;
  state?: any;
  title?: string;
}

function IconDisplay({ to, state, title, onclick }: IconProps) {
  if(to) {
    return (
      <Link to={to} state={state} title={title}>
        <i className="bi bi-eye icon-display"></i>
      </Link>
    )
  }

  return null;
}

function IconUpdate({ to, state, title, onclick }: IconProps) {
  if (to) {
    return (
      <Link to={to} state={state} title={title}>
        <i className="bi bi-pencil icon-update"></i>
      </Link>
    )
  }

  if (onclick) {
    return <i title={title} onClick={onclick} className="bi bi-pencil icon-update"></i>
  }

  return null;
}

function IconDelete({ to, state, title, onclick }: IconProps) {
  if (to) {
    return (
      <Link to={to} state={state} title={title}> 
        <i className="bi bi-trash3 icon-delete"></i>
      </Link>
    )
  }

  if (onclick) {
    return <i title={title} onClick={onclick} className="bi bi-trash3 icon-delete"></i>
  }

  return null;
}

function IconList({ to, state, title, onclick }: IconProps) {
  if (to) {
    return (
      <Link to={to} state={state} title={title}>
        <i className="bi bi-card-checklist icon-list"></i>
      </Link>
    )
  }

  if (onclick) {
    return <i title={title} onClick={onclick} className="bi bi-card-checklist icon-list"></i>
  }

  return null;
}


export { List, Table, Td, Tr, IconDisplay, IconUpdate, IconDelete, IconList }