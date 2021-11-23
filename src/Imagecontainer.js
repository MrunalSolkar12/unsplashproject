import React, { useContext } from 'react'
import { UserContext } from "./Components/Header";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Grid';



const Imagecontainer = () => {
  const state = useContext(UserContext);
  console.log(state);
  return (
    <Grid container>
      <Grid item sm={6} md={12} lg={12}>
      <ImageList  variant="masonry" cols={4} gap={8}>
        
        {state.map((item) => (
          <ImageListItem key={item.urls.small}>
            <img
              src={item.urls.small}
              alt="mrunal"
              
              
              loading="lazy"
            />
             <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={item.user.instagram_username}
              position="bottom"
              actionIcon={
                <div style={{display:"flex",flexDirection:"row",}}>
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${item.title}`}
                >
                  <AccountCircleIcon/>
                </IconButton>
                <IconButton
                sx={{ color: 'white' }}
                aria-label={`star ${item.title}`}
              >
               <DownloadIcon/>
              </IconButton>
              <IconButton
                sx={{ color: 'white' }}
                aria-label="likes"
                alt="likes"
              >
               <FavoriteIcon/>
              </IconButton>

               
              </div>
              }
              actionPosition="left"
            />
          </ImageListItem>
          
        ))}
        
      </ImageList>
      </Grid>
      </Grid>

    
  )
}

export default Imagecontainer
