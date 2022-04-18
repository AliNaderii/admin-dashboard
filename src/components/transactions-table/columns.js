export const COLUMNS = [
  {
    Header: 'Tracking ID',
    accessor: 'id',
    disableFilters: true,
  },
  {
    Header: 'Product',
    accessor: 'product',
    Cell: ({ row }) => {
      return (
        <div className="product-cell">
          <img src={ row.original.img } alt="" />
          <p>{ row.original.product }</p>
        </div>
      );
    }
  },
  {
    Header: 'Customer',
    accessor: 'customer',

  },
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Payment Method',
    accessor: 'method',
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ row }) => (
      <span
        className={ row.original.status === 'Approved' ?
          'approved' : 'pending' }
      >
        { row.original.status }
      </span>
    )
  }
];

export const GROUPED_COLUMNS = [
  {
    Header: 'Tracking ID',
    accessor: 'id'
  },
  {
    Header: 'GROUP-1',
    columns: [
      {
        Header: 'Product',
        accessor: 'product'
      },
      {
        Header: 'Customer',
        accessor: 'customer'
      },
      {
        Header: 'Date',
        accessor: 'date'
      }
    ]
  },
  {
    Header: 'GROUP-2',
    columns: [
      {
        Header: 'Amount',
        accessor: 'amount'
      },
      {
        Header: 'Payment Method',
        accessor: 'method'
      },
      {
        Header: 'Status',
        accessor: 'status'
      }
    ]
  }
];