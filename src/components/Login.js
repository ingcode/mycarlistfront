import { Button, Snackbar, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../constants";
import Carlist from "./Carlist";

function Login(){
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const [open, setOpen] = useState(false);

  const [isAuthenticated, setAuth] = useState(false);

  const handleChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  const login = (event) => {
    event.preventDefault();
    fetch(SERVER_URL+'login',{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    })
    .then(response => {
      // TODO 로그인을 알릴수있는 mini alert창 필요함, mui 참고 할것!
      const jwtToken = response.headers.get('Authorization');
      if(jwtToken !== null){
        sessionStorage.setItem("jwt", jwtToken);
        setAuth(true);
      }else{
        console.log("%c login faill", 'color:red');
        console.log(response);
        setOpen(true);
      }
    })
    .catch(error => console.error(error));
  }

  const checkAuth = () => {
    const token = sessionStorage.getItem("jwt");
    if(token !== null){
      setAuth(true);
    }
  }

  useEffect(() => {
    checkAuth();
  },);
  

  if(isAuthenticated){
    return <Carlist />
  }else{
    return(
      <div>
        <form onSubmit={login}>
        <Stack spacing={2} alignItems='center' mt={2}>
          <TextField
            name="username"
            label="User name"
            onChange={handleChange}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={login}
            type="submit"
          >
            Login
          </Button>
        </Stack>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={()=> setOpen(false)}
          message="Login failed: check your username and password"
        />
      </div>
    );
  }
}

export default Login;