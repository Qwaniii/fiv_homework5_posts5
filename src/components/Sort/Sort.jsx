import { Card, CardContent, Typography } from '@mui/material';
import React from 'react'
import s from "./sort.module.css"
import cn from "classnames"
import tabs from "./tabs"
import { useDispatch } from 'react-redux';
import { nextPageAction } from '../../storage/reducers/paginateReducers';

export default function Sort({ selectedTab, setSelectedTab }) {

  const dispatch = useDispatch()

  const nextPage = (data) => {
    dispatch(nextPageAction(data))
  }


  function handleClickTab(e, tab) {
    e.preventDefault();
    setSelectedTab(tab.id)
    nextPage(1)
  }

  return (
    <div>
      <Card sx={{ minWidth: 275 }} className={s.sorting}>
      <CardContent >
        <Typography
          className={s.wrapper}
          gutterBottom
        >
          <span className={s.title}>Сортировать:</span>

          <span className={s.option}>
            {tabs
              .map((tab) => {
                return (<span 
                  key={tab.id}
                  className={cn(s.sort, {[s.selected]: selectedTab === tab.id})}
                  onClick={(e) => handleClickTab(e, tab)}
                  >{tab.title}
                  </span>)
              })}
          </span>
        </Typography>
      </CardContent>
    </Card>
    </div>
  )
}
