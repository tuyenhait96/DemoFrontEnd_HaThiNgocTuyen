import * as types from "../constant/types";
import callApi from "../utils/callApi";

export const apiFetchProductRequest = () => {
  return (dispatch) => {
    // phia co du lieu moi dispatch action // dung redux thunk
    return callApi("products", "GET", null).then((res) => {
      dispatch(actFetchProducts(res.data));
    });
  };
};

export const actFetchProducts = (products) => {
  return {
    type: types.FETCH_PRODUCTS,
    products,
  };
};

export const apiDeleteProduct = (id) => (dispatch) => {
  return callApi(`products/${id}`, "DELETE", null).then((res) => {
    dispatch(actDeleteProduct(id));
  });
};

export const actDeleteProduct = (id) => {
  return {
    type: types.DELETE_PRODUCTS,
    id,
  };
};

export const apiAddProduct = (products) => dispatch => {
  return callApi('products', "POST", products).then(res =>{
    dispatch(addProduct(res.data))
  })
}
export const addProduct = (products) => {
  return {
    type: types.ADD_PRODUCTS,
    products,
  };
};

export const apiGetEditProduct = (id) => (dispatch) => {
  return callApi(`products/${id}`, "GET", null).then((res) => {
    dispatch(actGetProduct(res.data));
  });
}; 

export const actGetProduct = (products) => {
  return {
    type: types.EDIT_PRODUCTS,
    products,
  };
};

export const apiGetUpdateProduct = (products) => (dispatch) => {
  return callApi(`products/${products.id}`, "PUT", products).then((res) => {
    dispatch(actUpdateProducts(res.data));
  });
}; 

export const actUpdateProducts = (products) => {
  return {
    type: types.UDATE_PRODUCTS,
    products,
  };
};
