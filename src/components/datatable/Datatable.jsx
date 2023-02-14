import React, { useEffect, useState } from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import {userColumns} from '../../datatablesource'
import { Link, useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const Datatable = ({columns}) => {
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const {data, loading, error} = useFetch(`/${path}`)
    const [list, setList] = useState([])

    useEffect(() => {
      setList(data)
    
    }, [data])
    

    const handleDelete = async (id) => {
        try{
            await axios.delete(`${process.env.URL}/${path}/${id}`);
        } catch (err) {
            console.log(err.message)
        }
        setList(list.filter((item) => item._id !== id));
    }

    const actionColumn = [
        {   
            field: "action", 
            headerName: "Action", 
            width:200, 
            renderCell: (params) =>{
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{textDecoration:"none"}}>
                            <div className="viewButton">View</div>
                        </Link>                    
                        <div className="deleteButton" onClick = {() => handleDelete(params.row._id)}>Delete</div>
                    </div>
                )
        }}
    ]
  return (
    <div className='datatable'>
        <div className="datatableTitle">
            {path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()}
            <Link to={`/${path}/new`} style={{textDecoration:"none"}} className="link">Add New</Link>
        </div>
        <DataGrid
            className="datagrid"
            rows={list}
            columns={columns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(row) => row._id}
        />
    </div>
  )
}

export default Datatable