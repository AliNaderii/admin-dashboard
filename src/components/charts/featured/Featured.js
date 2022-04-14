// styles
import './featured.scss';
// tools
import { useTheme } from '../../../hooks/useTheme';
// icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// react-circular-progressbar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Featured() {
  const { theme } = useTheme();

  return (
    <div className={ theme === 'light' ? 'featured' : 'featured dark' }>

      <div className="top">
        <span className='title'>Total Revenue</span>
        <MoreVertIcon className='icon' />
      </div>

      <div className="bottom">
        <div className="progress">
          <CircularProgressbar value={ 70 } text={ '70%' } />
        </div>

        <div className="sales-info">
          <p className="title">Total sales made today</p>
          <span className="amount">$420</span>
          <p className="text">Previous transactions processing. Last payment may not be included.</p>
        </div>

        <div className="stats-container">
          <div className="stat">
            <span className="title">Target</span>
            <div className="stat-amount down">
              <KeyboardArrowDownIcon />
              <span>$12.4k</span>
            </div>
          </div>

          <div className="stat">
            <span className="title">Last Week</span>
            <div className="stat-amount up">
              <KeyboardArrowUpIcon />
              <span>$12.4k</span>
            </div>
          </div>

          <div className="stat">
            <span className="title">Last Month</span>
            <div className="stat-amount down">
              <KeyboardArrowDownIcon />
              <span>$12.4k</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}