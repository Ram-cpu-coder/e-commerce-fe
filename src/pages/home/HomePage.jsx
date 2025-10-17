import React, { useEffect, useState } from "react";
import CategoryList from "../../components/layouts/CategoryList";
import ProductCard from "../../components/cards/ProductCard";
import CarouselHomePage from "../../components/carousel/CarouselHomePage";
import { useDispatch, useSelector } from "react-redux";
import PaginationRounded from "../../components/pagination/PaginationRounded";
import { getPublicProductAction } from "../../features/products/productActions";
import { handleOnClickProduct } from "../../utils/productFunctions";
import HotPicks from "../../components/hotpicks/HotPicks";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import {
  createUserHistoryAction,
  getRecommendationsAction,
} from "../../features/userHistory/userHistoryAction";
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

  const fetchBanners = async () => {
    await dispatch(fetchFeatureBannerAction());
  };

  const fetchPubProducts = async () => {
    await dispatch(getPublicProductAction());
  };

  useEffect(() => {
    fetchPubProducts();
    fetchBanners();
  }, [dispatch, productCustomerPage]);

  useEffect(() => {
    const isDataLoaded = publicProducts?.docs?.length > 0;
    if (isDataLoaded) {
      setLoading(false);
    }
  }, [publicProducts]);

  useEffect(() => {
    const fetchHotPicks = async () => {
      await dispatch(getRecommendationsAction(user._id));
    };
    if (!hotPicks.length) {
      fetchHotPicks();
    }
    setLoading(false);
  }, []);

  return (
    <div className="mx-2">
      {featureBanner.length === 0 ? (
        ""
      ) : (
        <div className="carouselDiv">
          <CarouselHomePage featureBanner={featureBanner} />
        </div>
      )}

      <CategoryList />
      {hotPicks.length ? (
        <HotPicks handleOnClickProduct={handleOnClickProduct} />
      ) : (
        ""
      )}
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
              {publicProducts?.docs?.map((item, index) => {
                return (
                  <div
                    className="col"
                    style={{ cursor: "pointer" }}
                    key={index}
                    onClick={async (e) => {
                      e.preventDefault();
                      handleOnClickProduct(item, user, dispatch);
                      // window.location.href = `/${item._id}`;
                    }}
                  >
                    <ProductCard item={item} />
                  </div>
                );
              })}

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
