let initialState = [];

// load cart items from local storage

if (typeof window !== "undefined") {
  // if cart exists
  initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TO_CART":
      return payload;
    default:
      return state;
  }
};

// type payload
