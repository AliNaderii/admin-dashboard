// styles
import './list.scss';
// tools
import { useTheme } from '../../hooks/useTheme';
import { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// firebase collection ref && tools
import { onSnapshot } from "firebase/firestore";
// components
import DataTable from '../../components/data-table/DataTable';
import Spinner from '../../components/spinner/Spinner';

export default function List(props) {
  const { theme } = useTheme();
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  const getTableData = useCallback(
    () => {
      setError(false);
      try {
        onSnapshot(props.databaseRef, (snapshot) => {
          let fetchedData = [];
          snapshot.docs.forEach(
            doc => fetchedData.push({ ...doc.data(), id: doc.id })
          );
          setTableData([...fetchedData]);
        });
      }
      catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    }, [props.databaseRef]);

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  return (
    <div
      className={ theme === 'light' ? 'list-container' : 'list-container dark' }
    >
      <div className="table-container">
        <h2 className="table-title">{ props.tableTitle }</h2>

        { tableData.length === 0 && <Spinner /> }
        {
          tableData.length !== 0 &&
          <DataTable tableData={ tableData } { ...props } />
        }
        { error && <p>{ error }</p> }
        <Link
          to={ props.addNewLink }
          className='add-btn'>
          { props.linkText }
        </Link>
      </div>
    </div>
  );
}