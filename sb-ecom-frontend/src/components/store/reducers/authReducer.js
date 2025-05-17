const initialState = {
  user: null,
  address: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.typw) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      return { user: null, address: null };
    default:
      return state;
  }
};
