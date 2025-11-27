import { useState, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import { useNavigate } from "react-router-dom";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function GlobalProvider({ children }) {
  const [panelVisible, setPanelVisible] = useState(false);
  const navigate = useNavigate();

  const move = (somewhere) => {
    setPanelVisible(false);
    navigate(somewhere);
    window.scrollTo({ top: 0 });
  };

  const moveBack = () => {
    setPanelVisible(false);
    navigate(-1);
  };

  const showToast = (message) => {
    Toastify({
      text: message + " ",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      style: {
        background: "rgba(28, 57, 63, 0.9)",
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
      },
    }).showToast();
  };

  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState({});

  const addRemoveCart = (kitId) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.kit_id === kitId
          ? { ...product, selected: !product.selected }
          : product
      )
    );

    const targetProduct = products.find((item) => item.kit_id === kitId);
    if (!targetProduct.selectedSize) {
      updateSize(kitId, targetProduct.sizes[0]);
    }
    if (!targetProduct.selectedTheme) {
      updateTheme(kitId, targetProduct.theme_colors[0]);
    }
  };

  const updateTheme = (kitId, selectedTheme) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.kit_id === kitId ? { ...product, selectedTheme } : product
      )
    );
  };

  const updateSize = (kitId, selectedSize) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.kit_id === kitId ? { ...product, selectedSize } : product
      )
    );
  };

  const updateQuantity = (kitId, quantity) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.kit_id === kitId ? { ...product, quantity } : product
      )
    );
  };

  const updateUserData = (key, value) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  const fetchProducts = () => {
    const savedProducts = localStorage.getItem("synergy_products");

    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        setProducts(parsedProducts);
        //console.log("Loaded products from localStorage");
        return; // Exit, don't fetch from JSON
      } catch {
        //console.log("Error parsing localStorage data", error);
      }
    }

    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  };

  const fetchUser = () => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUserData(parsedUser);
        return;
      } catch {
        console.log("Error getting localStorageUser");
      }
    }

    setUserData(initialUser);
  };

  const clearProductsLocalStorage = () => {
    localStorage.removeItem("synergy_products");
    fetchProducts(); // Reload fresh data
    showToast("Local storage cleared");
  };

  const clearProductsAfterCheckout = () => {
    localStorage.removeItem("synergy_products");
    fetchProducts(); // Reload fresh data
    showToast("Order has been placed successfully");
    setTimeout(() => {
      navigate("/order-history", { replace: true });
    }, 1000);
  };

  const clearOrderHistory = () => {
    setUserData((prev) => ({ ...prev, history: [] }));
  };

  const clearUserData = () => {
    localStorage.removeItem("user");
    fetchUser();
    showToast("Profile has been cleared");
  };

  const initialUser = {
    firstName: "",
    lastName: "",
    email: "",

    chestBust: "",
    topLength: "",
    pantLength: "",
    preferredFit: "",
    shoeSize: "",

    houseAddress: "",
    city: "",
    state: "",
    postalCode: "",

    tier: "",
  };

  useEffect(() => {
    fetchProducts();
    fetchUser();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("synergy_products", JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [userData]);

  const value = {
    panelVisible,
    setPanelVisible,
    move,
    moveBack,
    addRemoveCart,
    updateTheme,
    updateSize,
    updateQuantity,
    updateUserData,
    showToast,
    products,
    userData,
    setUserData,
    setProducts,
    fetchProducts,
    fetchUser,
    clearProductsLocalStorage,
    clearProductsAfterCheckout,
    clearUserData,
    clearOrderHistory,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
