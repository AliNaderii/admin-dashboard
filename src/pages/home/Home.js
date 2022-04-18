// styles
import './home.scss';
// tools
import { useTheme } from '../../hooks/useTheme';
// components
import Widget from '../../components/widget/Widget';
import Chart from '../../components/charts/chart/Chart';
import Featured from '../../components/charts/featured/Featured';
import TransactionsTable from '../../components/transactions-table/TransactionsTable';
// import SortedTransactionsTable from '../../components/transactions-table/SortedTransactionsTable';
// import FilteredTransactionsTable from '../../components/transactions-table/FilteredTransactionsTable';
// import PaginatedTransactionsTable from '../../components/transactions-table/PaginatedTransactionsTable';
// import RowSelection from '../../components/transactions-table/RowSelection';

export default function Home() {
  const { theme } = useTheme();

  return (
    <div
      className={ theme === 'light' ? 'home-container' : 'home-container dark' }
    >
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
        <h3 className="table-title">Latest Transactions</h3>
        <TransactionsTable />
      </div>
    </div >
  );
}