// styles
import './transactions-table.scss';
// tools
import { useMemo } from 'react';
// import { useTheme } from '../../hooks/useTheme';
import { useTable } from 'react-table';
// table data
import { COLUMNS } from './columns';
import MOCK_DATA from './MOCK_DATA.json';

export default function TransactionsTable() {
  // const { theme } = useTheme();
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table { ...getTableProps() } className='transactions-table'>
      <thead>
        { headerGroups.map(headerGroup => (
          <tr { ...headerGroup.getHeaderGroupProps() }>
            { headerGroup.headers.map(column => (
              <th { ...column.getHeaderProps() }>
                { column.render('Header') }
              </th>
            )) }
          </tr>
        )) }
      </thead>

      <tbody { ...getTableBodyProps() }>
        { rows.map(row => {
          prepareRow(row);
          return (
            <tr { ...row.getRowProps() }>
              { row.cells.map(cell => {
                return (
                  <td { ...cell.getCellProps() }>
                    { cell.render('Cell') }
                  </td>
                );
              }) }
            </tr>
          );
        }) }
      </tbody>
    </table>
  );
}