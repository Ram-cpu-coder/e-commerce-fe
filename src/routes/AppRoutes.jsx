import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../components/layouts/DefaultLayout";
import HomePage from "../pages/home/HomePage";
import { useDispatch } from "react-redux";
import { getPublicProductAction } from "../features/products/productActions.js";
import { fetchUserAction } from "../features/user/userAction.js";

import FeatureBanner from "../pages/FeatureBanner/FeatureBanner.jsx";
import ViewProductsListed from "../pages/FeatureBanner/ViewProductsListed.jsx";
import CarouselLandingPage from "../pages/home/CarouselLandingPage.jsx";
import OrderLandingPage from "../components/ordersComponent/OrderLandingPage.jsx";

const Register = lazy(() => import("../pages/auth/Register"));
const ForgetPassword = lazy(() => import("../pages/auth/ForgetPassword"));
const Login = lazy(() => import("../pages/auth/Login"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard.jsx"));
const CategoryLanding = lazy(() => import("../pages/CategoryLanding"));
const Profile = lazy(() => import("../pages/account/Profile"));
const VerifyUser = lazy(() => import("../pages/auth/VerifyUser"));
const ProductLandingPage = lazy(() =>
  import("../components/products/ProductLandingPage")
);
const Cart = lazy(() => import("../pages/Cart"));
const ProductList = lazy(() => import("../pages/product/ProductList.jsx"));
const AddNewProduct = lazy(() => import("../pages/product/AddNewProduct.jsx"));
const EditProduct = lazy(() => import("../pages/product/EditProduct.jsx"));
const Categories = lazy(() =>
  import("../pages/admin/categories/Categories.jsx")
);
const EditCategory = lazy(() =>
  import("../pages/admin/categories/EditCategory.jsx")
);
const AddCategory = lazy(() => import("../pages/admin/categories/AddCategory"));
const PaymentResult = lazy(() => import("../pages/payment/PaymentResult.jsx"));
const Order = lazy(() => import("../pages/order/Order.jsx"));
const PaymentMethod = lazy(() => import("../pages/account/PaymentMethod.jsx"));
const AdminOrders = lazy(() => import("../pages/order/AdminOrders.jsx"));
const ShippingAddress = lazy(() => import("../components/ShippingAddress.jsx"));
const AboutPage = lazy(() => import("../pages/AboutPage.jsx"));
const SearchPage = lazy(() => import("../pages/SearchPage.jsx"));
const AddressUpdate = lazy(() =>
  import("../components/shippingAddress/AddressUpdate.jsx")
);
const Logout = lazy(() => import("../pages/auth/Logout.jsx"));
const Shop = lazy(() => import("../pages/shop/Shop.jsx"));
const WishList = lazy(() => import("../pages/wishList/WishList.jsx"));
const AdminReview = lazy(() => import("../pages/review/AdminReview.jsx"));
const UpdateFeatureBanner = lazy(() =>
  import("../pages/FeatureBanner/UpdateFeatureBanner.jsx")
);

const AppRoutes = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(getPublicProductAction());
    await dispatch(fetchUserAction());
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/category/:categoryName" element={<CategoryLanding />} />
        <Route path="/verify-user" element={<VerifyUser />} />
        <Route path="/:id" element={<ProductLandingPage />} />
        <Route path="/payment-result" element={<PaymentResult />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/featured/:id" element={<CarouselLandingPage />} />
      </Route>
      {/* private routes */}
      <Route path="/user" element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="account" element={<Profile />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Order />} />
        <Route path="payment-method" element={<PaymentMethod />} />
        <Route path="logout" element={<Logout />} />
        <Route path="shippingAddress" element={<ShippingAddress />} />
        <Route path="address/:id" element={<AddressUpdate />} />
        <Route path="wishlist" element={<WishList />} />
        <Route path="orders/:id" element={<OrderLandingPage />} />
      </Route>

      <Route path="/admin" element={<DefaultLayout />}>
        <Route path="adminDashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<AddNewProduct />} />
        <Route path="products/edit/:_id" element={<EditProduct />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:_id" element={<EditCategory />} />
        <Route path="categories/new" element={<AddCategory />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="banner" element={<FeatureBanner />} />
        <Route path="reviews" element={<AdminReview />} />
        <Route path="banner/:id" element={<UpdateFeatureBanner />} />
        <Route
          path="banner/listed-products/:_id"
          element={<ViewProductsListed />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
