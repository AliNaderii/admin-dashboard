// styles
import "./data-table.scss";
// tools
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../dataTableSource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTheme } from '../../hooks/useTheme';

export default function Datatable({ title, addNewLink }) {
  const [data, setData] = useState(userRows);
  const { theme } = useTheme();


  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cell-action">
            <Link to="/users/test" style={ { textDecoration: "none" } }>
              <div className="view-button">View</div>
            </Link>
            <div
              className="delete-button"
              onClick={ () => handleDelete(params.row.id) }
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className={ theme === 'light' ? 'datatable' : 'datatable dark' }>
      <div className="datatable-title">
        { title }
        <Link to={ addNewLink } className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={ data }
        columns={ userColumns.concat(actionColumn) }
        pageSize={ 9 }
        rowsPerPageOptions={ [9] }
        checkboxSelection
      />
    </div>
  );
};