// tools
import { useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";
import { Link } from "react-router-dom";
// styles && components
import './data-table.scss';
import FilterInput from "./FilterInput";
// icons
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
// custom hooks
import { useTheme } from '../../hooks/useTheme';

export default function DataTable({
  data: tableData, tableColumns, addNewLink, linkText
}) {
  const { theme } = useTheme();
  const columns = useMemo(() => tableColumns, [tableColumns]);
  const data = useMemo(() => tableData, [tableData]);
  const table = useTable({
    columns,
    data,
  }, useGlobalFilter, useSortBy, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    prepareRow,
    setGlobalFilter,
    state,
    pageCount
  } = table;

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <div className={ theme === 'light' ? 'top' : 'top dark' }>
        <div>
          <FilterInput filter={ globalFilter } setFilter={ setGlobalFilter } />
          <p className='tip'>* You can sort the table by clicking on table headers</p>
        </div>
        <Link
          to={ addNewLink }
          className='add-btn'>
          { linkText }
        </Link>
      </div>

      <div className="table-wrapper">
        <table
          className={ theme === 'light' ? 'datatable' : 'datatable dark' }
          { ...getTableProps() }
        >
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
                      { cell.render('Cell') }
                    </td>
                  )) }
                </tr>
              );
            }) }
          </tbody>
        </table>
      </div>
      <div className={ theme === 'light' ? "pagination-container" : "pagination-container dark" }>
        <button
          className='pagination-btn'
          disabled={ !canPreviousPage }
          onClick={ () => previousPage() }>
          prev
        </button>
        <p className='pagination-counter'>
          { pageIndex + 1 } of { pageCount }
        </p>
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