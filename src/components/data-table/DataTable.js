// tools
import { useMemo } from "react";
import { Link } from 'react-router-dom';
import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";
// table data
import MOCK_DATA from './MOCK_DATA.json';
import dataTableColumns from "./dataTableColumns";
// styles && components
import './data-table.scss';
import FilterInput from "./FilterInput";
// icons
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

export default function DataTable() {
  const columns = useMemo(() => dataTableColumns, []);
  const data = useMemo(() => MOCK_DATA, []);

  const table = useTable({
    columns,
    data,
  }, useGlobalFilter, useSortBy, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    pageCount,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    prepareRow,
    setGlobalFilter,
    state,
  } = table;

  console.log(table);

  const { globalFilter } = state;
  console.log(pageCount);

  return (
    <>
      <div className="top">
        <FilterInput filter={ globalFilter } setFilter={ setGlobalFilter } />
        <Link to='/users/new' className='add-btn'>Add new user</Link>
      </div>

      <table className="datatable" { ...getTableProps() }>
        <thead >
          { headerGroups.map(headerGroup => (
            <tr
              { ...headerGroup.getHeaderGroupProps() }
            >
              { headerGroup.headers.map(column => (
                <th
                  { ...column.getHeaderProps(column.getSortByToggleProps()) }
                >
                  <div>
                    { column.render('Header') }
                    {
                      column.isSorted ? column.isSortedDesc ?
                        <ArrowDropDownOutlinedIcon />
                        :
                        <ArrowDropUpOutlinedIcon />
                        :
                        ''
                    }
                  </div>
                </th>
              )) }
            </tr>
          )) }
        </thead>

        <tbody { ...getTableBodyProps() }>
          { page.map(row => {
            prepareRow(row);
            return (
              <tr { ...row.getRowProps() }>
                { row.cells.map(cell => (
                  <td { ...cell.getCellProps() }>
                    {/* { console.log(cell) } */ }
                    { cell.render('Cell') }
                  </td>
                )) }
              </tr>
            );
          }) }
        </tbody>
      </table>
      <div className="pagination-container">
        <button
          className='pagination-btn'
          disabled={ !canPreviousPage }
          onClick={ () => previousPage() }>
          prev
        </button>
        <button
          className='pagination-btn'
          disabled={ !canNextPage }
          onClick={ () => nextPage() }>
          next
        </button>
      </div>
    </>
  );
}