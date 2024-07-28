import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import './App.css';
// import Carlist from './components/Carlist';
import Login from './components/Login';

function App() {
  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
  }
  return (
    <div className="App">
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1,}}>
              <Typography sx={{textAlign: "left"}}>
                Cars shop
              </Typography>
            </Box>
            <Button color='inherit'>login</Button>
            <Button color='inherit' onClick={handleLogout}>logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Login />
      
    </div>
  );
}

export default App;
