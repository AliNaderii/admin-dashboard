import React from 'react';
// styles
import './list.scss';
// tools
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router-dom';
// components
import DataTable from '../../components/data-table/DataTable';
import Spinner from '../../components/spinner/Spinner';
import Message from '../../components/message/Message';
// custome hooks
import { useData } from '../../hooks/useData';

const List = (props) => {
  const { theme } = useTheme();
  const { data, error, isPending } = useData(props.databaseRef);


  return (
    <div
      className={ theme === 'light' ? 'list-container' : 'list-container dark' }
    >
      { console.log('List') }
      { isPending ? (
        <Spinner />
      ) : (
        <div className="table-container">
          <h2 className="table-title">{ props.tableTitle }</h2>
          {
            !data && !isPending && (
              <div className='message-container'>
                <Message type='pending' message='There is no data here' />
                <Link
                  to={ props.addNewLink }
                  className='add-btn'>
                  { props.linkText }
                </Link>
              </div>
            )
          }
          {
            data.length !== 0 &&
            <DataTable data={ data } { ...props } />
          }
          { error && <Message type='error' message={ error } /> }
        </div>
      ) }

    </div>
  );
};

export default React.memo(List);