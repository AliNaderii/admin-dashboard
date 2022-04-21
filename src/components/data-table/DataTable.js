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

export default function DataTable({
  tableData, tableColumns, addNewLink, linkText
}) {
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
  } = table;

  const { globalFilter } = state;

  return (
    <>
      <div className="top">
        <FilterInput filter={ globalFilter } setFilter={ setGlobalFilter } />
        <Link
          to={ addNewLink }
          className='add-btn'>
          { linkText }
        </Link>
      </div>

      <>
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


    </>
  );
}