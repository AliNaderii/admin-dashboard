// tools
import { Link } from 'react-router-dom';
// firebase tools
import { productsRef } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
// icons
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const deleteProduct = async (id) => {
  const productRef = doc(productsRef, id);

  await deleteDoc(productRef);
};


const productsTableColumns = [
  {
    Header: 'Name',
    accessor: 'title',
    Cell: ({ row }) => (
      <div className="username-cell" >
        <img src={ row.original.photoUrl } alt="" />
        <p>{ row.original.title }</p>
      </div>
    )
  },
  {
    Header: 'Category',
    accessor: 'category'
  },
  {
    Header: 'Price',
    accessor: 'price',
    Cell: ({ value }) => (
      <span>${ value }</span>
    )
  },
  {
    Header: 'Status',
    accessor: 'inStock',
    Cell: ({ row }) => (
      <span
        className={ Number(row.original.inStock) > 0 ? 'active' : 'passive' }
      >
        { row.original.inStock }
      </span >
    )
  },
  {
    Header: 'Action',
    Cell: ({ row }) => (
      <div className='action-container'>
        <Link
          to={ `/products/${row.original.id}` }
          className='action-btn info'
          title='Product info'>
          <FeedOutlinedIcon />
        </Link>
        <button
          className='action-btn delete'
          title='Delete product'
          onClick={ () => deleteProduct(row.original.id) }
        >
          <DeleteOutlinedIcon />
        </button>
      </div>
    )
  },
];

export default productsTableColumns;