import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
  'Редактировать',
  'Удалить',
];

const ITEM_HEIGHT = 48;

export default function DelBtn({ postDelete, user, post, anchorEl , handleClick, handleClose }) {

  function deletePost() {
    postDelete(post);
  }
  const open = Boolean(anchorEl);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            boxShadow: '0px 5px 8px -2px rgb(0 0 0 / 20%)'
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={(option==="Удалить") ? deletePost : handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}