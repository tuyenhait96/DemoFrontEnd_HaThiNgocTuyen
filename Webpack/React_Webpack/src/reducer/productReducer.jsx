import {
  FETCH_PRODUCTS,
  DELETE_PRODUCTS,
  ADD_PRODUCTS,
  UDATE_PRODUCTS,
} from "../constant/types";

const initState = [];
let findIndex = (arr, id) => {
  let result = -1;
  arr.forEach((element, index) => {
    if (element.id === id) {
      result = index;
    }
  });
  return result;
};
const productReducer = (state = initState, action) => {
  let index = -1;
  let { products } = action;
  switch (action.type) {
    case FETCH_PRODUCTS: {
      state = action.products;
      return [...state];
    }
    case DELETE_PRODUCTS: {
      index = findIndex(state, action.id);
      state.splice(index, 1);
      return [...state];
    }
    case ADD_PRODUCTS: {
      state.push(action.products);
      return [...state];
    }
    case UDATE_PRODUCTS: {
      index = findIndex(state, products.id);
      state[index] = products;
      return [...state];
    }
    default:
      return [...state];
  }
};

export default productReducer;
