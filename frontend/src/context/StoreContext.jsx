import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);
import axios from "axios";
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // const removeFromCart = async (itemId) => {
  //   const key = String(itemId);

  //   // update (instant in UI)
  //   setCartItems((prev) => {
  //     const updated = { ...prev };
  //     if (updated[key] > 1) {
  //       updated[key] -= 1;
  //     } else {
  //       delete updated[key];
  //     }
  //     return updated;
  //   });

  //   // Sync with backend in background
  //   if (token) {
  //     try {
  //       const response = await axios.post(
  //         url + "/api/cart/remove",
  //         { itemId: key },
  //         { headers: { token } }
  //       );

  //       if (response.data.success) {
  //         // ensure UI stays consistent with backend
  //         setCartItems(response.data.cartData || {});
  //       }
  //     } catch (error) {
  //       console.error("Remove failed:", error);
  //     }
  //   }
  // };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  // useEffect(() => {
  //   async function loadData() {
  //     await fetchFoodList();
  //     if (localStorage.getItem("token")) {
  //       setToken(localStorage.getItem("token"));
  //       await loadCartData(localStorage.getItem("token")); // ✅ fetch cart on refresh
  //     }
  //   }
  //   loadData();
  // }, []);

  const contextValue = {
    food_list,
    cartItems,
    removeFromCart,
    setCartItems,
    addToCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
