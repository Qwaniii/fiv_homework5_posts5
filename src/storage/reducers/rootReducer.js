import { combineReducers } from "redux"
import { paginateReducer } from "./paginateReducers"

export const rootReducer = combineReducers({
  paginate: paginateReducer,
})