const initialState = {
  modalNotificationPass: false,
}

export const RESETPASS = "RESETPASS"

export const notificPassAction = (data) => {
  return {
    type: RESETPASS,
    data: data
  }
}

export const modalReducer = (state = initialState, action) => {
  switch(action.type) {
    case RESETPASS:
      return {...state, modalNotificationPass: action.data}
    default:
      return state
  }
}
