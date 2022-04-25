import format from "date-fns/format";

export const TransactionsTableColumns = [
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
    Cell: ({ value }) => {
      const date = value.toDate();
      const formated = format(date, 'PP');
      return (
        <span>{ formated }</span>
      );
    }
  },
  {
    Header: 'Cost',
    accessor: 'cost',
    Cell: ({ value }) => (
      <span>${ value }</span>
    )
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