import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import s from "./search.module.css";
import cn from "classnames";

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

export default function SearchAddPost({
  active,
  setActive,
  setSearchQuery,
  searchQuery,
  setPopupEdit
}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent className={s.search}>
        <Typography
          className={s.wrapper}
          sx={{ fontSize: 26 }}
          color="text.secondary"
          gutterBottom
        >
          <span className={s.title}>Социально-новостные посты</span>
          <input
            className={cn(s.input, { [s.active]: active })}
            type="text"
            placeholder="Поиск"
            value={active ? searchQuery : ""}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
          {active && (
            <CloseOutlinedIcon
              className={s.searchIcon}
              onClick={(e) => {
                setActive(false);
                e.preventDefault();
                setSearchQuery("");
              }}
            />
          )}
          {!active && (
            <SearchOutlinedIcon
              className={s.searchIcon}
              onClick={() => setActive(true)}
            />
          )}
        </Typography>
        <div className={s.btn}>
          <Button size="small"  onClick={() => setPopupEdit(true)}>Новый пост</Button>
        </div>
        {/* <Typography variant="h3" component="div">
        
        </Typography> */}
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <button type="button"></button>
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        
      </CardActions> */}
    </Card>
  );
}
