// tools
import { Link } from 'react-router-dom';
// firebase tools
import { customersRef } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
// icons
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const deleteCustomer = async (id) => {
  const customerRef = doc(customersRef, id);

  await deleteDoc(customerRef);


};


const customersTableColumns = [
  {
    Header: 'Name',
    accessor: 'fullName',
    Cell: ({ row }) => (
      <div className="username-cell" >
        <img src={ row.original.photoUrl } alt="" />
        <p>{ row.original.fullName }</p>
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
        className={ row.original.status || 'active' }
      >
        active
      </span >
    )
  },
  {
    Header: 'Action',
    Cell: ({ row }) => (
      <div className='action-container'>
        <Link
          to={ `/customers/${row.original.id}` }
          className='action-btn info'
          title='Customer info'>
          <FeedOutlinedIcon />
        </Link>
        <button
          className='action-btn delete'
          title='Delete customer'
          onClick={ () => deleteCustomer(row.original.id) }
        >
          <DeleteOutlinedIcon />
        </button>
      </div>
    )
  },
];

export default customersTableColumns;