import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryList from "../../components/layouts/CategoryList";
import ProductCard from "../../components/cards/ProductCard";
import CarouselHomePage from "../../components/carousel/CarouselHomePage";
import PaginationRounded from "../../components/pagination/PaginationRounded";
import HotPicks from "../../components/hotpicks/HotPicks";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { getPublicProductAction } from "../../features/products/productActions";
import { handleOnClickProduct } from "../../utils/productFunctions";
import { getRecommendationsAction } from "../../features/userHistory/userHistoryAction";
import { fetchFeatureBannerAction } from "../../features/featureBanner/featureBannerAction";

const HomePage = () => {
  const dispatch = useDispatch();

  const { publicProducts, productCustomerPage } = useSelector(
    (state) => state.productInfo
  );
  const { user } = useSelector((state) => state.userInfo);
  const { hotPicks } = useSelector((state) => state.userHistoryInfo);
  const { featureBanner } = useSelector((state) => state.featureBannerInfo);

  const [loading, setLoading] = useState(true);

  //  Fetch banners and products in parallel on first load
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      await Promise.all([
        dispatch(fetchFeatureBannerAction()),
        dispatch(getPublicProductAction()),
      ]);
      setLoading(false);
    };
    fetchInitialData();
  }, [dispatch]);

  //  Re-fetch products when pagination changes (no need to re-fetch banners)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await dispatch(getPublicProductAction());
      setLoading(false);
    };
    if (productCustomerPage > 1) fetchProducts();
  }, [dispatch, productCustomerPage]);

  //  Fetch recommendations only once per user
  useEffect(() => {
    if (user?._id && !hotPicks.length) {
      dispatch(getRecommendationsAction(user._id));
    }
  }, [dispatch, user, hotPicks.length]);

  // === RENDER ===
  return (
    <div className="mx-2">
      {/* Banner */}
      {featureBanner.length > 0 && (
        <div className="carouselDiv">
          <CarouselHomePage featureBanner={featureBanner} />
        </div>
      )}

      <CategoryList />

      {/* Hot Picks */}
      {hotPicks.length > 0 && (
        <HotPicks handleOnClickProduct={handleOnClickProduct} />
      )}

      {/* Products Section */}
      <div className="py-5 w-100 d-flex justify-content-center">
        {loading ? (
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <div className="d-flex flex-column align-items-center col-10 mt-5">
            <h1 className="display-5 fw-bold text-dark text-center mb-3">
              Explore More
            </h1>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 w-100">
              {publicProducts?.docs?.map((item, index) => (
                <div
                  className="col"
                  style={{ cursor: "pointer" }}
                  key={item._id || index}
                  onClick={(e) => {
                    e.preventDefault();
                    handleOnClickProduct(item, user, dispatch);
                  }}
                >
                  <ProductCard item={item} />
                </div>
              ))}

              <div className="mt-2 d-flex justify-content-center w-100">
                {publicProducts?.totalPages > 1 && (
                  <PaginationRounded
                    totalPages={publicProducts?.totalPages}
                    page={productCustomerPage}
                    mode="product"
                    client="customer"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
