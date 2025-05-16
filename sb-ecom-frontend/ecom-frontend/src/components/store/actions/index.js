import api from "../../api/api";
import toast from "react-hot-toast";

// Fetch Products
export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/public/products?${queryString}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to Fetch Products!",
    });
  }
};

// Fetch Categories
export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/public/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to Fetch Categories!",
    });
  }
};

// Add to Cart
export const addToCart = (data, quantity = 1, toast) => (dispatch, getState) => {
  const { products } = getState().products;
  const getProduct = products.find((item) => item.productId === data.productId);
  const isQuantityExists = getProduct.quantity >= quantity;

  if (isQuantityExists) {
    dispatch({ type: "ADD_CART", payload: { ...data, quantity: quantity } });
    toast.success(`${data?.productName} added to the cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  } else {
    toast.error("Out of Stock");
  }
};

// Increase Cart Quantity
export const increaseCartQuantity = (data, toast, currentQuantity, setCurrentQuantity) => (dispatch, getState) => {
  const { products } = getState().products;
  const getProduct = products.find((item) => item.productId === data.productId);

  if (getProduct) {
    const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

    if (isQuantityExist) {
      const newQuantity = currentQuantity + 1;
      setCurrentQuantity(newQuantity);
      dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: newQuantity },
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Quantity Reached to Limit");
    }
  } else {
    toast.error("Product not found");
  }
};

// Decrease Cart Quantity
  export const decreaseCartQuantity = (data, currentQuantity) => (dispatch, getState) => {
     if (currentQuantity > 1) {
       const newQuantity = currentQuantity - 1;
       dispatch({
         type: "ADD_CART",
         payload: { ...data, quantity: newQuantity },
       });
       localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
     } else {
       // Optionally handle the case where quantity is already 1
       toast.error("Quantity cannot be less than 1");
     }
   };


export const removeFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CART",
    payload: data,
  });
  toast.success(`${data.productName} removed from cart`);
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};
