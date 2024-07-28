import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function EditCar(props){
  const carDetail = [
    "brand",
    "model",
    "color",
    "year",
    // "fuel",
    "price",
  ]

  const [open, setOpen] = useState(false);
  const [car, setCar] = useState(Object.fromEntries(carDetail.map(key => [key,''])));

  const handleClickOpen = () => {
    setOpen(true);
    setCar({
      brand: props.data.row.brand,
      model: props.data.row.model,
      color: props.data.row.color,
      year: props.data.row.year,
      price: props.data.row.price,
    });
  }

  const handleClickClose = () => {
    setOpen(false);
  }

  const handleChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  const handleSave = () =>{
    props.updateCar(car, props.data.id);
    setOpen(false);
  }

  return(
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditOutlinedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Edit car</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2}>
            {carDetail.map((detail, idx)=>
              <Grid2 xs={12} key={idx}>
              <TextField
                name={detail}
                label={detail}
                fullWidth
                value={car[detail]}
                variant="standard"
                onChange={handleChange}
              />
            </Grid2>
            )}
          </Grid2>
        </DialogContent>
        <DialogActions>
            <button onClick={handleClickClose} type="button">cancel</button>
            <button onClick={handleSave} type="button">save</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditCar;