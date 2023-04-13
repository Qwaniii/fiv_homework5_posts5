import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import s from "./tags.module.css"

export default function Tags({ tag }) {
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1} className={s.tags}>
        {tag && tag.length < 4 && <Chip label={tag} color="secondary" variant="outlined" />}
        {tag && tag.length >= 4 && tag.length < 7 && <Chip label={tag} color="primary" variant="outlined" />}
        {tag && tag.length >= 7 && <Chip label={tag} color="success" variant="outlined" />}
      </Stack>
    </Stack>
  );
}