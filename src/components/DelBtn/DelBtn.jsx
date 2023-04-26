import * as React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function DelBtn({ deletePost, user, post, anchorEl , handleClick, handleClose }) {

  return (
    <div>
      <DeleteOutlinedIcon  fontSize="medium" onClick={deletePost}/>
    </div>
  );
}