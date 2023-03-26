const initialState = {
  page: 1,
  maxPage: undefined,
  viewPosts: 12,
}

export const NEXTPAGE = "NEXTPAGE"
export const MAXPAGE = "MAXPAGE"
export const VIEWPOSTS = "VIEWPOSTS"

export const nextPageAction = (data) => {
  return {
    type: NEXTPAGE,
    data: data,
  }
}

export const maxPageAction = (data) => {
  return {
    type: MAXPAGE,
    data: data,
  }
}

export const viewPostsAction = (data) => {
  return {
    type: VIEWPOSTS,
    data: data,
  }
}

export const paginateReducer = (state = initialState, action) => {
  switch(action.type) {
    case NEXTPAGE:
      return { ...state, page: action.data };
    case MAXPAGE:
      return { ...state, maxPage: action.data };
    case VIEWPOSTS: 
      return { ...state, viewPosts: action.data };
    default:
      return state
  }
} 