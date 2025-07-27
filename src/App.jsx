import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { getAllCategoriesAction } from "./features/category/CategoryActions.js";
import { Bounce, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchCartAction } from "./features/cart/cartAction.js";
import { autoLogin } from "./features/user/userAction.js";
import { getWishlistAction } from "./features/wishlist/wishlistAction.js";
import { getAllPubReviewAction } from "./features/reviews/reviewAction.js";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCritical = async () => {
      await Promise.all([
        dispatch(getAllCategoriesAction()),
        dispatch(autoLogin()),
      ]);

      // Lazy load the rest
      dispatch(getAllPubReviewAction()), dispatch(fetchCartAction());
      dispatch(getWishlistAction());
    };

    fetchCritical();
  }, []);

  return (
    <div>
      <AppRoutes />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default App;
