// styles
import './featured.scss';
// tools
import { useTheme } from '../../../hooks/useTheme';
// icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// react-circular-progressbar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { buildStyles } from 'react-circular-progressbar';

export default function Featured() {
  const { theme } = useTheme();

  const chartStyle = theme === 'light' ?
    buildStyles({
      textColor: '#c60021',
      pathColor: '#c60021',
      trailColor: '#e3e3e3'
    }) :
    buildStyles({
      textColor: '#66fcf1',
      pathColor: '#66fcf1',
      trailColor: '#0b0c10',
    });

  return (
    <div className={ theme === 'light' ? 'featured' : 'featured dark' }>

      <div>
        <span className='title'>Total Revenue</span>
      </div>

      <div className="bottom">
        <div className="progress">
          <CircularProgressbar
            value={ 70 }
            text={ '70%' }
            styles={ chartStyle }
          />
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