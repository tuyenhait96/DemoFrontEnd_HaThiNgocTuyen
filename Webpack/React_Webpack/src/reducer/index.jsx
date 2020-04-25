import { combineReducers } from "redux";
import productReducer from "./productReducer";
import itemEdittingReducer from "./itemEditting";

const appReducers = combineReducers({
  productReducer,
  itemEdittingReducer,
});

export default appReducers;
