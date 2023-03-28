import { combineReducers } from "redux"
import { paginateReducer } from "./paginateReducers"
import { modalReducer } from "./modalReducer"

export const rootReducer = combineReducers({
  paginate: paginateReducer,
  modal: modalReducer,
})