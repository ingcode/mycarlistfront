import { useEffect, useState } from "react";
import { SERVER_URL } from "../constants";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { IconButton, Input, Snackbar, Stack } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { DeleteOutlineOutlined } from "@mui/icons-material";

function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const onDelClick = (url) => {
    const token = sessionStorage.getItem("jwt");
    if(window.confirm("Are you sure to delete?")){
      fetch(url,{method: 'DELETE',headers: {'Authorization': token}})
      .then(response => {
        if(response.ok){
          fetchCars();
          setOpen(true);
        }else{
          alert('Somthing went wrong!');
        }
      })
      .catch(error => console.error(error));
    }
  }

  const fetchCars = () => {
    const token = sessionStorage.getItem("jwt");
    fetch(`${SERVER_URL}api/cars`,{
      headers: {'Authorization': token}
    })
    .then(respons => respons.json())
    .then(data => setCars(data._embedded.cars))
    .catch(error => console.log(error));
  }
  
  const columns = [
    {field: 'brand', headerName: 'Brand', width: 200},
    {field: 'model', headerName: 'Model', width: 200},
    {field: 'color', headerName: 'Color', width: 200},
    {field: 'year', headerName: 'Year', width: 200},
    {
      field: 'price', headerName: 'Price', width: 200,
      renderCell: row => 
        <Input value={row.formattedValue} />
    },
    {
      field: '_links.car.href',
      headerName: 'modify',
      sortable: false,
      filterable: false,
      renderCell: row=>
        <EditCar
          data={row}
          updateCar={updateCar}
       />
    },
    {
      field: '_links.self.href',
      headerName: 'del',
      sortable: false,
      filterable: false,
      renderCell: row =>
        <IconButton
          type="button"
          onClick={()=> onDelClick(row.id)}
        >
          <DeleteOutlineOutlined />
        </IconButton>
    }
  ];

  const addCar = (car) =>{
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL+'api/cars',{
      method: 'POST',
      headers: {'Content-Type': 'application/json','Authorization': token},
      body: JSON.stringify(car),
    })
    .then(response => {
      if(response.ok){
        fetchCars();
      }else{
        console.log(response);
        alert('Something went wrong!');
      }
    })
    .catch(error => console.error(error));
  }

  const updateCar = (car , link) =>{
    const token = sessionStorage.getItem("jwt");
    fetch(link, {
      method: "PUT",
      headers: {'Content-Type': 'application/json','Authorization': token},
      body: JSON.stringify(car)
    })
    .then(response => {
      if(response.ok){
        fetchCars()
      }else{
        console.log(response);
        alert('something went wrong!');
      }
    })
    .catch(error => console.error(error));
  }

  useEffect(()=>{
    fetchCars();
  },[]);

  return(
    <>
      <Stack mt={2} mb={2}>
        <AddCar addCar={addCar} />
      </Stack>
      <div style={{height: 500, width: '100%'}}>
        <DataGrid
          rows={cars}
          columns={columns}
          getRowId={row => row._links.self.href}
          disableRowSelectionOnClick={true}
          slots={{ toolbar: CustomToolbar }}
        />

        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={()=>setOpen(false)}
          message="Car Deleted"
        />
      </div>
    </>
  )
}

export default Carlist;