import { Link } from "react-router-dom";
import { ContainerPagination, ContainerTable } from "./styles";

interface ListProps {
  count?: number;
  countPerPage?: number;
  currentPage?: number;
  onChangePage: (page: number) => void;
  children: JSX.Element | JSX.Element[];
}

function List({ count = 0, countPerPage = 50, currentPage = 1, onChangePage, children }: ListProps) {
  const lastPage = countPerPage > 0 ? Math.ceil(count / countPerPage) : 1;
 
  let pages: number[] = [];
  
  if (currentPage < 3 || count <= 5 * countPerPage) {
    pages = [1, 2, 3, 4, 5];
  } else {
    const initial = currentPage + 2 > lastPage ? currentPage - 2 - (currentPage + 2 - lastPage) : currentPage - 2;
    const final = currentPage + 2 > lastPage ? lastPage : currentPage + 2;

    for (let i = initial; i <= final; i++) {
      pages.push(i);
    }

    console.log(pages);
  }

  return (
    <ContainerTable>
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
      <div>
        { children }
      </div>
    </ContainerTable>
  )
}

interface TableProps {
  children: JSX.Element | JSX.Element[];
}

function Table({ children }: TableProps) {
  return (
    <table className="table table-striped table-hover table-bordered">
      { children }
    </table>
  );
}

interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  isIdentifier?: boolean;
  isAction?: boolean;
  children?: JSX.Element | JSX.Element[] | any;
}

function Td({ isIdentifier = false, isAction = false, children, ...rest }: TdProps) {
  return (
    <td className={`${isIdentifier ? 'column-identifier' : ''} ${isAction ? 'column-action' : ''}`} {...rest} >
      { children }
    </td>
  );
}

interface IconProps {
  onclick?: (event: React.MouseEvent<HTMLElement>) => void;
  to?: string;
  state?: any;
}

function IconDisplay({ to, state, onclick }: IconProps) {
  if(to) {
    return (
      <Link to={to} state={state}>
        <i className="bi bi-eye icon-display"></i>
      </Link>
    )
  }

  return null;
}

function IconUpdate({ to, state, onclick }: IconProps) {
  if (to) {
    return (
      <Link to={to} state={state}>
        <i className="bi bi-pencil icon-update"></i>
      </Link>
    )
  }

  return null;
}

function IconDelete({ to, state, onclick }: IconProps) {
  if (to) {
    return (
      <Link to={to} state={state}> 
        <i className="bi bi-trash3 icon-delete"></i>
      </Link>
    )
  }

  if (onclick) {
    return <i onClick={onclick} className="bi bi-trash3 icon-delete"></i>
  }

  return null;
}


export { List, Table, Td, IconDisplay, IconUpdate, IconDelete }