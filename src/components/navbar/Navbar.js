// styles
import './navbar.scss';
// tools
import { useTheme } from '../../hooks/useTheme';
// icons
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MenuIcon from '@mui/icons-material/Menu';
// components
import Sidebar from '../sidebar/Sidebar';

export default function Navbar({ toggle, showMenu }) {
  const { dispatch } = useTheme();
  const { theme } = useTheme();

  const changeTheme = () => {
    dispatch({ type: 'CHANGE_THEME' });
  };

  return (
    <div className={ theme === 'light' ? 'navbar' : 'navbar dark' }>
      { console.log('Nav') }
      <div className="wrapper">
        <Sidebar
          className={ showMenu ? `sidebar hidden show` : `sidebar hidden` }
        />
        <MenuIcon className='menu-icon' onClick={ () => toggle(true) } />
        <div className="search">
          <input type="text" placeholder='Search...' />
          <SearchOutlinedIcon />
        </div>

        <div className="items-container">
          <div className="item">
            <LanguageOutlinedIcon className='icon' />
            English
          </div>

          <div className="item" onClick={ changeTheme }>
            {
              theme === 'light' ?
                <DarkModeOutlinedIcon className='icon' />
                :
                <WbSunnyIcon className='icon' />
            }
          </div>

          <div className="item">
            <div className="badge">2</div>
            <NotificationsNoneOutlinedIcon className='icon' />
          </div>

          <div className="item">
            <img src="/avatar/harsha.jpg" alt="avatar" className="avatar" />
          </div>

        </div>
        {/* <div className="search">
          <input type="text" placeholder='Search...' />
          <SearchOutlinedIcon />
        </div> */}
      </div>
    </div>
  );
}