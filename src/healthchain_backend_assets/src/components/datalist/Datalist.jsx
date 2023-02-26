import "./Datalist.scss";
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from "../../datalistsource.js";
import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
const Datalist = () => {
  const [data,setDelMethod] = useState(userRows);
  const handleDelete =(id) =>{
    setDelMethod(data.filter((item)=> item.id!== id))
  }
  const actionCol = [
    {
    field:"action",
    headerName:"Action",
    width:200,
    renderCell: (params)=>{
      return (
        <div className="cellAction">
          <Link to="/users/test" style={{textDecoration: 'none'}}>
            <div className="viewBtn">Show</div>
          </Link>
          
          <div className="deleteBtn" onClick={()=>handleDelete(params.row.id)}>Delete</div>
        </div>
      )
    }
    }
    

  ];
  return (
    <div className="datalist"> 
      <div className="dataListTitle">
        Add New User
        <Link to="/users/new" style={{textDecoration: 'none'}} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
      className="datagrid"
        rows={data}
        columns={userColumns.concat(actionCol)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
      
    </div>
  )
}

export default Datalist