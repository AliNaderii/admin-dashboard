// styles
import './single.scss';
// tools
import { useTheme } from '../../hooks/useTheme';
// components
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Chart from '../../components/charts/chart/Chart';
import TransactionsTable from '../../components/transactions-table/TransactionsTable';

export default function Single() {
  const { theme } = useTheme();

  return (
    <div className={ theme === 'light' ? 'single' : 'single dark' }>
      <Sidebar />
      <div className="single-container">
        <Navbar />
        <div className="top">

          <div className="info-card">
            <button className='info-button'>Edit</button>
            <h2 className="title">Information</h2>
            <div className="info-details">
              <div className="info-img">
                <img src="/avatar/harsha.jpg" alt="avatar" />
              </div>
              <div className="info-text">
                <p>Harsha</p>
                <p>Email: harsha@gmail.com</p>
                <p>Phone: +1 234 567 89</p>
                <p>Address: Some imaginary place</p>
                <p>Country: Where ever you want</p>
              </div>
            </div>
          </div>

          <div className="user-chart">
            <Chart aspect={ 3 / 1 } title='User Spending (Last 6 Month)' />
          </div>
        </div>

        <div className="bottom">
          <h2 className="title">Last Transactions</h2>
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
}