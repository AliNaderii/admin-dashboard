// styles
import './transactions-table.scss';
// components
import Spinner from '../spinner/Spinner';
import Message from '../message/Message';
// tools
import { useMemo } from 'react';
import { useTable } from 'react-table';
// table data
import { TransactionsTableColumns } from '../../assets/table-columns/transactionsTableColumns';
// firebase collection refrence
import { transactionsRef } from '../../firebase';
// custom hooks
import { useTheme } from '../../hooks/useTheme';
import { useData } from '../../hooks/useData';

export default function TransactionsTable() {
  const { theme } = useTheme();
  const { data: transactions, error, isPending } = useData(transactionsRef);

  const columns = useMemo(() => TransactionsTableColumns, []);
  const data = useMemo(() => transactions, [transactions]);
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
    <>
      { isPending ? (
        <div className="spinner-container">
          <Spinner loading={ isPending } />
        </div>
      ) : (
        <table { ...getTableProps() }
          className={ theme === 'light' ? 'transactions-table' : 'transactions-table dark' }
        >
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
      ) }
      { error && <Message type='error' message={ error } /> }
    </>
  );
};