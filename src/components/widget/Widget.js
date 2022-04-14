// styles
import './widget.scss';
// tools
import { useTheme } from '../../hooks/useTheme';
// icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

export default function Widget({ type }) {
  const { theme } = useTheme();

  let widgetInfo = {
    title: '',
    stat: null,
    isMoney: false,
    link: '',
    percent: null,
    icon: null
  };

  switch (type) {
    case 'user':
      widgetInfo.title = 'USERS';
      widgetInfo.stat = 120;
      widgetInfo.link = 'See all users';
      widgetInfo.percent = 15;
      widgetInfo.icon = (<PersonOutlinedIcon
        className="icon"
        style={ {
          color: "crimson",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
        } } />);
      break;

    case 'order':
      widgetInfo.title = 'ORDERS';
      widgetInfo.stat = 110;
      widgetInfo.link = 'View all orders';
      widgetInfo.percent = 18;
      widgetInfo.icon = (<ShoppingCartOutlinedIcon
        className="icon"
        style={ {
          backgroundColor: "rgba(218, 165, 32, 0.2)",
          color: "goldenrod",
        } } />);
      break;

    case 'earning':
      widgetInfo.title = 'ORDERS';
      widgetInfo.stat = 250;
      widgetInfo.isMoney = true;
      widgetInfo.link = 'View net earnings';
      widgetInfo.percent = 2.5;
      widgetInfo.icon = (<MonetizationOnOutlinedIcon
        className="icon"
        style={ {
          backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green"
        } }
      />);
      break;

    case 'balance':
      widgetInfo.title = 'BALANCE';
      widgetInfo.stat = 1250;
      widgetInfo.isMoney = true;
      widgetInfo.link = 'See details';
      widgetInfo.percent = 7.2;
      widgetInfo.icon = (<AccountBalanceWalletOutlinedIcon
        className="icon"
        style={ {
          backgroundColor: "rgba(128, 0, 128, 0.2)",
          color: "purple",
        } } />);
      break;

    default:
      break;
  }

  return (
    <div className={ theme === 'light' ? 'widget' : 'widget dark' }>

      <div className="left">
        <span className="title">{ widgetInfo.title }</span>
        <span className="stat">
          { widgetInfo.isMoney && '$' }{ widgetInfo.stat }
        </span>
        <a href='#hello' className="link">{ widgetInfo.link }</a>
      </div>

      <div className="right">
        <div className="percent up">
          <KeyboardArrowUpIcon />
          <span>{ widgetInfo.percent }%</span>
        </div>

        { widgetInfo.icon }
      </div>

    </div>
  );
}