import {Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";

function AddCar(props){
  const carDetail = [
    "brand",
    "model",
    "color",
    "year",
    "price",
  ]

  const [open, setOpen] = useState(false);
  const [car, setCar] = useState(Object.fromEntries(carDetail.map(key => [key,''])));


  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClickClose = () => {
    setOpen(false);
  }

  const handleChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  const handleSave = () =>{
    props.addCar(car);
    setOpen(false);
  }

  return(
    <div>
      <button variant="contained" onClick={handleClickOpen}>NEW CAR</button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>New car</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2}>
            {carDetail.map((detail, idx)=>
              <Grid2 xs={12} key={idx}>
              <TextField
                name={detail}
                label={detail}
                fullWidth
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

export default AddCar;