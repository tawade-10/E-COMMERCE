import toast from "react-hot-toast";
import api from "../../api/api";

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
export const addToCart =
  (data, quantity = 1, toast) =>
  (dispatch, getState) => {
    const { products } = getState().products;
    const getProduct = products.find(
      (item) => item.productId === data.productId
    );
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
export const increaseCartQuantity =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    const { products } = getState().products;
    const getProduct = products.find(
      (item) => item.productId === data.productId
    );

    if (getProduct) {
      const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

      if (isQuantityExist) {
        const newQuantity = currentQuantity + 1;
        setCurrentQuantity(newQuantity);
        dispatch({
          type: "ADD_CART",
          payload: { ...data, quantity: newQuantity },
        });
        localStorage.setItem(
          "cartItems",
          JSON.stringify(getState().carts.cart)
        );
      } else {
        toast.error("Quantity Reached to Limit");
      }
    } else {
      toast.error("Product not found");
    }
  };

// Decrease Cart Quantity
export const decreaseCartQuantity =
  (data, currentQuantity) => (dispatch, getState) => {
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

export const authenticateSignInUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signin", sendData);
      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signup", sendData);
      reset();
      toast.success(data?.message || "User Registered Success");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.message ||
          "Internal Server Error"
      );
    } finally {
      setLoader(false);
    }
  };

export const logoutUser = (navigate) => (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  localStorage.removeItem("auth");
  navigate("/login");
};

export const addUpdateUserAddress =
  (sendData, toast, addressId, setOpenAddressModal) =>
  async (dispatch, getState) => {
    //const { user } = getState().auth;
    dispatch({ type: "BUTTON_LOADER" });
    try {
      if (!addressId) {
        const { data } = await api.post("/addresses", sendData);
      } else {
        await api.put(`/users/${addressId}`, sendData);
      }
      dispatch(getUserAddresses());
      toast.success("Address Saved Successfully!");
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.message ||
          "Internal Server Error"
      );
      dispatch({ type: "IS_ERROR", payload: null });
    } finally {
      setOpenAddressModal(false);
    }
  };

export const getUserAddresses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/addresses`);
    dispatch({
      type: "USER_ADDRESS",
      payload: data,
      // pageNumber: data.pageNumber,
      // pageSize: data.pageSize,
      // totalElements: data.totalElements,
      // totalPages: data.totalPages,
      // lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to Fetch User addresses",
    });
  }
};

export const selectUserCheckoutAddress = (address) => {
  return {
    type: "SELECT_CHECKOUT_ADDRESS",
    payload: address,
  };
};

export const deleteUserAddress =
  (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
    try {
      dispatch({ type: "BUTTON_LOADER" });
      const { data } = await api.delete(`/users/${addressId}`);
      dispatch({ type: "IS_SUCCESS" });
      dispatch(getUserAddresses());
      dispatch(clearCheckoutAddress());
      toast.success("Address Deleted Successfully");
    } catch (error) {
      console.log(error);
      dispatch({
        type: "IS_ERROR",
        payload: error?.response?.data?.message || "Error!",
      });
    } finally {
      setOpenDeleteModal(false);
    }
  };

export const addPaymentMethod = (method) => {
  return {
    type: "ADD_PAYMENT_METHOD",
    payload: method,
  };
};

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    await api.post(`/carts/create`, sendCartItems);
    await dispatch(getUserCart());
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Error!",
    });
  }
};

export const getUserCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/carts/users/cart`);
    dispatch({
      type: "GET_USER_CART_PRODUCTS",
      payload: data.products,
      totalPrice: data.totalPrice,
      cartId: data.cartId,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Error!",
    });
  }
};
