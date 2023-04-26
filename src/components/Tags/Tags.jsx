import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import s from "./tags.module.css"
import { useNavigate } from 'react-router-dom';

export default function Tags({ tag, handleTagSearch }) {

  const navigate = useNavigate()
  const searchTagFunc = (tag) => {
    navigate(`/fo_homework4_post4/search-tag/${tag}`)
    handleTagSearch(tag)
  }


  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1} className={s.tags}  onClick={() => searchTagFunc(tag)}>
        {tag && tag.length < 4 && <Chip label={tag} title={tag} color="secondary" variant="outlined" />}
        {tag && tag.length >= 4 && tag.length < 7 && <Chip label={tag} title={tag} color="primary" variant="outlined" />}
        {tag && tag.length >= 7 && <Chip label={tag} title={tag} color="success" variant="outlined"/>}
      </Stack>
    </Stack>
  );
}