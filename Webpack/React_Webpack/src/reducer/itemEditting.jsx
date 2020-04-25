import { EDIT_PRODUCTS } from "../constant/types";

const initState = {};

const itemEdittingReducer = (state = initState, action) => {
  switch (action.type) {
    case EDIT_PRODUCTS: {
      return action.products;
    }
    default:
      return state;
  }
};

export default itemEdittingReducer;
