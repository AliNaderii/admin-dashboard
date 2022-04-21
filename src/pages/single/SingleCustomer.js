// styles
import './SingleCustomer.scss';
// tools
import { useTheme } from '../../hooks/useTheme';
import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// firebase tools
import { customersRef } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
// components
import Chart from '../../components/charts/chart/Chart';
import TransactionsTable from '../../components/transactions-table/TransactionsTable';
import Spinner from '../../components/spinner/Spinner';

export default function SingleCustomer() {
  const { theme } = useTheme();
  const [customer, setCustomer] = useState({});
  const customerId = useParams().customerId;

  const getCustomer = useCallback(
    async () => {
      const singleCustomerRef = doc(customersRef, customerId);
      try {
        const res = await getDoc(singleCustomerRef);
        if (!res) {
          throw new Error('Something went wrong');
        }
        setCustomer({ ...res.data() });
      }
      catch (err) {
        console.log(err.message);
      }
    }, [customerId]
  );

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  return (
    <div
      className={ theme === 'light' ? 'single-container' : 'single-container dark' }
    >
      { !customer.photoUrl ? (
        <Spinner />
      ) : (
        <>
          <div className="info-card">
            <button className='info-button'>Edit</button>
            <h2 className="title">Information</h2>
            <div className="info-details">
              <div className="info-img">
                <img src={ customer.photoUrl } alt="avatar" />
              </div>
              <div className="info-text">
                <h3>{ customer.fullName }</h3>
                <ul>
                  <li>
                    <h4>Email:</h4>
                    <p>{ customer.email }</p>
                  </li>
                  <li>
                    <h4>Phone:</h4>
                    <p>{ customer.phone }</p>
                  </li>
                  <li>
                    <h4>Address: </h4>
                    <p>{ customer.address }</p>
                  </li>
                  <li>
                    <h4>Location: </h4>
                    <p>{ customer.location }</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="user-chart">
            <Chart aspect={ 3 / 1 } title='User Spending (Last 6 Month)' />
          </div>


          <div className="table-container">
            <h2 className="title">Latest Transactions</h2>
            <TransactionsTable />
          </div>
        </>
      ) }

    </div>
  );
}