// styles
import './home.scss';
// tools
import { useTheme } from '../../hooks/useTheme';
// components
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Widget from '../../components/widget/Widget';
import Chart from '../../components/charts/chart/Chart';
import Featured from '../../components/charts/featured/Featured';
import TransactionsTable from '../../components/transactions-table/TransactionsTable';

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className={ theme === 'light' ? 'home' : 'home dark' }>
      <Sidebar />
      <div className="home-container">
        <Navbar />
        <div className="widgets-container">
          <Widget type='user' />
          <Widget type='order' />
          <Widget type='earning' />
          <Widget type='balance' />
        </div>

        <div className="charts-container">
          <Featured />
          <Chart aspect={ 2 / 1 } title='Last 6 Month (Revenue)' />
        </div>

        <div className='table-container'>
          <div className="table-title">Latest Transactions</div>
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
}