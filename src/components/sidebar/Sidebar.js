// styles
import './sidebar.scss';
// tools
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
// icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function Sidebar({ className }) {
  const { theme } = useTheme();
  const { dispatch } = useAuth();

  const logout = () => {
    signOut(auth);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div className={ theme === 'light' ? `${className}` : `${className} dark` }>

      <div className="top">
        <Link to='/' className="logo">myAdmin</Link >
      </div>

      <div className="bottom">
        <ul className='link-container'>
          <p className="title">MAIN</p>
          <Link to='/' className='link'>
            <DashboardOutlinedIcon className='icon' />
            <span>Dashboard</span>
          </Link>

          <p className="title">LISTS</p>
          <Link to='/customers' className='link'>
            <GroupOutlinedIcon className='icon' />
            <span>Customers</span>
          </Link>

          <Link to='/products' className='link'>
            <CategoryOutlinedIcon className='icon' />
            <span>Products</span>
          </Link>

          <li className='link'>
            <StoreOutlinedIcon className='icon' />
            <span>Orders</span>
          </li>

          <li className='link'>
            <LocalShippingOutlinedIcon className='icon' />
            <span>Delivery</span>
          </li>

          <p className="title">USEFUL</p>
          <li className='link'>
            <QueryStatsOutlinedIcon className='icon' />
            <span>Stats</span>
          </li>

          <li className='link'>
            <NotificationsNoneOutlinedIcon className='icon' />
            <span>Notifications</span>
          </li>

          <p className="title">SERVICE</p>
          <li className='link'>
            <HealthAndSafetyOutlinedIcon className='icon' />
            <span>System Health</span>
          </li>

          <li className='link'>
            <SystemUpdateAltOutlinedIcon className='icon' />
            <span>Logs</span>
          </li>

          <li className='link'>
            <SettingsOutlinedIcon className='icon' />
            <span>Settings</span>
          </li>

          <p className="title">USER</p>
          <li className='link'>
            <AccountBoxOutlinedIcon className='icon' />
            <span>Profile</span>
          </li>

          <li className='link' onClick={ logout }>
            <LogoutOutlinedIcon className='icon' />
            <span>Logout</span>
          </li>

        </ul>
      </div>
    </div>
  );
}