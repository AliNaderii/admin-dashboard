// styles
import './navbar.scss';
// tools
import { useTheme } from '../../hooks/useTheme';
import { useState } from 'react';
// components
import HiddenSidebar from '../../components/hidden-sidebar/HiddenSidebar';
// icons
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const { dispatch } = useTheme();
  const { theme } = useTheme();
  const [showSidebar, setShowSidebar] = useState('hide');

  const changeTheme = () => {
    dispatch({ type: 'CHANGE_THEME' });
  };

  const toggleSidebar = () => {
    setShowSidebar(prevState => prevState === 'hide' ? 'show' : 'hide');
  };

  return (
    <div className={ theme === 'light' ? 'navbar' : 'navbar dark' }>
      <div className="wrapper">
        <MenuIcon className='menu-icon' onClick={ toggleSidebar } />
        <HiddenSidebar
          showSidebar={ showSidebar }
          toggleSidebar={ toggleSidebar }
        />
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
      </div>
    </div>
  );
};

export default Navbar;