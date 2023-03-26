import React from 'react'
import s from "./paginate.module.css"
import cn from "classnames"
import { useDispatch, useSelector } from 'react-redux'
import { nextPageAction } from '../../storage/reducers/paginateReducers'

export default function Paginate({ page }) {

  const toUp = () => {
    window.scrollTo({
        top: 0,
        behavior: "auto" 
    })
}

  const dispatch = useDispatch()

  const nextPage = (data) => {
    dispatch(nextPageAction(data))
    toUp()
  }
  const currentPage = useSelector(state => state.paginate.page)

  return (
    <span className={cn(s.page, {[s.currentPage]: currentPage === page})} onClick={() => nextPage(page)}>
      {page}
    </span>
  )
}
