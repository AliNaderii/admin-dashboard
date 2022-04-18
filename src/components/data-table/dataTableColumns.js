// tools
import { Link } from 'react-router-dom';
// icons
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const dataTableColumns = [
  {
    Header: 'ID',
    accessor: 'id',
    disableSortBy: true
  },
  {
    Header: 'Name',
    accessor: 'username',
    Cell: ({ row }) => (
      <div className="username-cell">
        <img src={ row.original.img } alt="" />
        <p>{ row.original.username }</p>
      </div>
    )
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Phone Number',
    accessor: 'phone'
  },
  {
    Header: 'Location',
    accessor: 'location'
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ row }) => (
      <span
        className={ row.original.status }
      >
        { row.original.status }
      </span >
    )
  },
  {
    Header: 'Action',
    Cell: () => (
      <div className='action-container'>
        <Link to='/users/single' className='action-btn info'>
          <FeedOutlinedIcon />
        </Link>
        <button className='action-btn delete'>
          <DeleteOutlinedIcon />
        </button>
      </div>
    )
  },
];

export default dataTableColumns;