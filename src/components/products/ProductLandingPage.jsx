import React, { useEffect, useState, lazy, Suspense, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSingleProductAction,
  updateProductActionIndividually,
} from "../../features/products/productActions";
import {
  createWishlistAction,
  deleteWishlistItemAction,
  getWishlistAction,
} from "../../features/wishlist/wishlistAction";
import { getPubReviewAction } from "../../features/reviews/reviewAction";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const ProductsImages = lazy(() => import("./ProductsImages"));
const ProductsDetails = lazy(() => import("./ProductsDetails"));
const ProductReviews = lazy(() => import("./ProductReviews"));
const ShareProduct = lazy(() => import("./ShareProduct"));

const calculateAvgRating = (reviews) => {
  if (!reviews.length) return 1;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / reviews.length;
};

const ProductLandingPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedProduct } = useSelector((state) => state.productInfo);
  const { allPubReviews } = useSelector((state) => state.reviewInfo);
  const { wishlist } = useSelector((state) => state.wishlistSliceInfo);
  const { user } = useSelector((state) => state.userInfo);

  const [loading, setLoading] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  const favourite = wishlist.some((item) => item.productId === id);

  const handleDeleteWishlist = (id) => {
    dispatch(deleteWishlistItemAction(id));
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        dispatch(getSingleProductAction(id)),
        dispatch(getPubReviewAction()),
        user?._id ? dispatch(getWishlistAction()) : Promise.resolve(),
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, [dispatch, id, user?._id]);

  useEffect(() => {
    const delay = setTimeout(() => setShowReviews(true), 300);
    return () => clearTimeout(delay);
  }, []);

  const itemReviews = useMemo(() => {
    if (!allPubReviews) return [];
    return allPubReviews?.filter((r) => r.productId === id);
  }, [allPubReviews, id]);

  const avgRating = useMemo(
    () => calculateAvgRating(itemReviews),
    [itemReviews]
  );

  useEffect(() => {
    if (!user?._id) {
      const timer = setTimeout(() => {
        if (selectedProduct && avgRating !== selectedProduct.ratings) {
          dispatch(updateProductActionIndividually(id, { ratings: avgRating }));
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [avgRating, dispatch, id, selectedProduct, user?._id]);

  const toggleWishlist = () => {
    if (!selectedProduct) return;

    if (favourite) {
      const item = wishlist.find((i) => i.productId === id);
      if (item) dispatch(deleteWishlistItemAction(item._id));
    } else {
      const obj = {
        productId: selectedProduct._id,
        name: selectedProduct.name,
        unitPrice: selectedProduct.price,
        stockStatus: selectedProduct.stock,
        image: selectedProduct.images[0],
      };
      dispatch(createWishlistAction(obj));
    }
  };

  if (loading) {
    return (
      <Backdrop
        sx={(theme) => ({ color: "white", zIndex: theme.zIndex.drawer + 1 })}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div
      className="w-100 d-flex justify-content-center py-2 position-relative bg-light-subtle"
      style={{ minHeight: "75dvh" }}
    >
      <div className="d-flex align-items-center w-100 flex-column gap-4 mb-5">
        <div className="d-flex flex-column flex-md-row justify-content-around align-items-start container col-11 col-lg-8 col-md-12 rounded-4 shadow bg-white py-3 px-2">
          <Suspense
            fallback={
              <Box sx={{ width: 300, height: 300, m: 2 }}>
                <Skeleton variant="rectangular" width="100%" height="100%" />
              </Box>
            }
          >
            <ProductsImages selectedProduct={selectedProduct} />
          </Suspense>
          <Suspense fallback={<div>Loading Details...</div>}>
            <ProductsDetails
              handleFavourite={toggleWishlist}
              handleDeleteWishlist={handleDeleteWishlist}
              favourite={favourite}
              avgRating={avgRating}
              selectedProduct={selectedProduct}
              wishlist={wishlist}
            />
          </Suspense>
        </div>

        {showReviews && (
          <div className="d-flex flex-column flex-md-row justify-content-around align-items-start container col-11 col-lg-8 col-md-12 rounded-4 shadow bg-white py-3 px-2">
            <Suspense fallback={<div>Loading Reviews...</div>}>
              <ProductReviews selectedProduct={selectedProduct} />
            </Suspense>
          </div>
        )}
      </div>

      <Suspense fallback={null}>
        <ShareProduct />
      </Suspense>
    </div>
  );
};

export default ProductLandingPage;
