// styles
import './list.scss';
// tools
import { useTheme } from '../../hooks/useTheme';
// components
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import DataTable from '../../components/data-table/DataTable';

export default function List(props) {
  const { theme } = useTheme();

  return (
    <div className={ theme === 'light' ? 'list' : 'list dark' }>
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <DataTable { ...props } />
      </div>
    </div>
  );
}