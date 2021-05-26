const initialState = null;

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGGED_IN_USER":
      return payload;
    case "LOGOUT":
      return payload;
    default:
      return state;
  }
};

// type payload
