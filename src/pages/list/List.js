// styles
import './list.scss';
// tools
import { useTheme } from '../../hooks/useTheme';
// components
import DataTable from '../../components/data-table/DataTable';

export default function List(props) {
  const { theme } = useTheme();

  return (
    <div
      className={ theme === 'light' ? 'list-container' : 'list-container dark' }
    >
      <div className="table-container">
        <h2 className="table-title">Users</h2>
        <DataTable />
      </div>
    </div>
  );
}