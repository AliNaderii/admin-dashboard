// styles
import './transactions-table.scss';
import Spinner from '../spinner/Spinner';
// tools
import { useMemo, useEffect, useCallback, useState } from 'react';
// import { useTheme } from '../../hooks/useTheme';
import { useTable } from 'react-table';
// table data
import { COLUMNS } from './columns';
// import MOCK_DATA from './MOCK_DATA.js';
// firebase collection refrence && tools
import { getDocs } from 'firebase/firestore';
import { colRef } from '../../firebase';

export default function TransactionsTable() {
  // const { theme } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  const getLatestTransactions = useCallback(
    async () => {
      setIsPending(true);
      setError('');

      try {
        const res = await getDocs(colRef);
        if (!res) {
          throw new Error('something went wrong');
        }
        res.docs.forEach(
          doc => setTransactions(prevState => [...prevState, doc.data()])
        );

        setIsPending(false);
      }
      catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    }, []);

  useEffect(() => {
    getLatestTransactions();
    console.log('useEffect');
  }, [getLatestTransactions]);


  const columns = useMemo(() => COLUMNS, []);
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
      ) }
      { error && <p>{ error }</p> }
    </>
  );
}