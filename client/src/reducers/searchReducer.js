const initialState = { text: "" };

export const searchReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SEARCH_QUERY":
      return { ...state, ...payload };
    default:
      return state;
  }
};

// type payload
