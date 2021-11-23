import React from 'react'
import { AppBar, IconButton, TextField, Toolbar, Typography, Button, responsiveFontSizes, List, ListItem, Divider } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, createContext, useEffect } from 'react';
import axios from "axios";
import Imagecontainer from '../Imagecontainer';
import InfiniteScroll from 'react-infinite-scroll-component';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';







const UserContext = createContext();
let theme = createTheme({
  typography: {
    fontFamily: [
      'Praise',
      'Dancing+Script',
    ]
  },
});
theme = responsiveFontSizes(theme);
const useStyle = makeStyles((theme) => ({
  list: {
    display: "flex",
    flexDirection: "row",
    color: "secondary",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  brandtext: {
    fontFamily: "Praise",
    color: "black",
    flexGrow: 1,


  },
}));
//main file starts
const Header = () => {

  const classes = useStyle();

  const APP_ID = "eBaJFfAQilsMjB5hZavB5w8t4RZxIYzMCxlsc7cs6ak";

  const [Data, setData] = useState("landscape");
  const [state, setState] = useState([]);

  
//drawable state
  const [open,setOpen]=useState(false);

  //usestate of infinite scrolling
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);




  const textchange = (e) => {
    setData(e.target.value);
    setState([]);
  }

  useEffect(() => {
    loading()

  }, [Data])

  const loading = async () => {
    const fetchdata = await axios.get(`https://api.unsplash.com/search/photos/?query=${Data}&page=${page}&client_id=` + APP_ID)
    console.log(fetchdata);
    setState([...state, ...fetchdata.data.results])
    setPage(page + 1)
  }



  return (

    <UserContext.Provider value={state}>

    <div  >
      <AppBar color="inherit" position="sticky" >
     
        <Toolbar  className={theme.typography.fontFamily}>
          <ThemeProvider theme={theme}>
            <Typography variant="h4"  className={classes.brandtext}>Image Gallery</Typography>
          </ThemeProvider>

          <TextField placeholder="Search" style={{ width: 400,flexGrow:1 }} onChange={textchange}></TextField>
          
            <IconButton onClick={loading}>
              <SearchIcon/>
            </IconButton>
         

          <Hidden mdDown>
            <div style={{flexGrow:1,marginLeft:100}}>
              <Button style={{ color: "black" }}>Explore</Button>
              <Button style={{ color: "black" }}>Collections</Button>
              <Button style={{ color: "black" }}>Community</Button>
            </div>
          </Hidden>

          <Hidden mdUp>
            <IconButton>
              <MenuIcon  onClick={()=>setOpen(true)}/>
            </IconButton>
          </Hidden>

          
         
        </Toolbar>
        
        <SwipeableDrawer
            anchor="right"
            open={open}
            onOpen={()=>setOpen(true)}
            onClose={()=>setOpen(false)}
           >
             <div>
             <IconButton>
               <ChevronRightIcon position="left" onClick={()=>setOpen(false)}/>
               </IconButton>
               </div>

               <Divider/>
               <List>
                 <ListItem>Explore</ListItem>
                 <ListItem>Collections</ListItem>
                 <ListItem>Community</ListItem>
               </List>
             </SwipeableDrawer>

      </AppBar>




      <div className="container"></div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

        <Typography sx={{ fontFamily: "cursive", }} variant="h4" gutterBottom>Unsplash Images</Typography>
        <Typography sx={{ fontFamily: "cursive" }} variant="subtitle1">Browse  pictures from around the world, including  pictures and a lot more.
          This collection of beautiful and breathtaking photos is free for personal and commercial use.
          .</Typography>

      </div>






      <InfiniteScroll
        dataLength={state.length} //This is important field to render the next data
        next={loading}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}>
        <Imagecontainer state={state} />
      </InfiniteScroll>
    </div>
    </UserContext.Provider>





  )
}

export default Header;
export { UserContext };
