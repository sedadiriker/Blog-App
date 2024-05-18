import React, { useState } from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

const ShareBlog = ({ title, content, image }) => {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };
  
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(image)}`, //!encodeURIComponent() JavaScript'te bir global fonksiyondur ve bir dizeyi URI (Uniform Resource Identifier) bileşenine uygun olarak kodlar.
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(image)}&text=${encodeURIComponent(content)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(image)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(content)} ${encodeURIComponent(image)}`
    };
  
    return (
      <div>
        <Typography
          color="primary"
          onMouseEnter={handleOpenMenu}
          style={{ cursor: 'pointer' }}
          startIcon={<ShareIcon />}
        >
          Share
        </Typography>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem component="a" href={shareUrls.facebook} target="_blank" onClick={handleCloseMenu}>
          Share on Facebook
          </MenuItem>
          <MenuItem component="a" href={shareUrls.twitter} target="_blank" onClick={handleCloseMenu}>
          Share on Twitter
          </MenuItem>
          <MenuItem component="a" href={shareUrls.linkedin} target="_blank" onClick={handleCloseMenu}>
          Share on Linkedin
          </MenuItem>
          <MenuItem component="a" href={shareUrls.email} onClick={handleCloseMenu}>
          Share on Email
          </MenuItem>
        </Menu>
      </div>
    );
  };
  
  export default ShareBlog;
