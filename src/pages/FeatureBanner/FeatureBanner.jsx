import React, { useEffect, useState } from "react";
import { UserLayout } from "../../components/layouts/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../../features/user/userSlice";
import BreadCrumbsAdmin from "../../components/breadCrumbs/BreadCrumbsAdmin";
import ControlBarFeatureBanner from "./ControlBarFeatureBanner";
import useForm from "../../hooks/useForm";
import { fetchFeatureBannerAction } from "../../features/featureBanner/featureBannerAction";
import FeatureBannerCard from "./FeatureBannerCard";
import NewFeatureBanner from "./NewFeatureBanner";
import AddNewBannerForm from "./AddNewBannerForm";
import { getAllCategoriesAction } from "../../features/category/CategoryActions";
import { getActiveProductAction } from "../../features/products/productActions";
import { Col, Row } from "react-bootstrap";
import useFeatureBannerForm from "../../hooks/useFeatureBannerForm";

const FeatureBanner = () => {
  const dispatch = useDispatch();

  const { featureBanner } = useSelector((state) => state.featureBannerInfo);

  const { form, handleOnChange } = useForm({
    searchQuery: "",
    date: "newest",
  });

  const { setIsCreatingBanner, isCreatingBanner } = useFeatureBannerForm();

  const [displayData, setDisplayData] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    dispatch(setMenu("Banners"));
  }, []);

  useEffect(() => {
    dispatch(fetchFeatureBannerAction());
    dispatch(getAllCategoriesAction());
    dispatch(getActiveProductAction());
  }, []);

  return (
    <UserLayout pageTitle="Banners">
      <div className="position-relative">
        <BreadCrumbsAdmin />
        <ControlBarFeatureBanner
          featureBanner={featureBanner}
          setDisplayData={setDisplayData}
          setIsFiltering={setIsFiltering}
        />
        <hr />
        <Row className="mt-4 w-100 g-4">
          {!isFiltering && (
            <Col xs={12} sm={6} md={4} lg={3}>
              <NewFeatureBanner setIsCreatingBanner={setIsCreatingBanner} />
            </Col>
          )}
          {displayData.length > 0 ? (
            displayData?.map((item) => (
              <Col key={item._id} xs={12} sm={6} md={6} lg={3}>
                <FeatureBannerCard item={item} />
              </Col>
            ))
          ) : (
            <div className="text-center">
              <strong>No products found</strong>
              <div className="text-muted small">
                Try adjusting your filters or search keywords.
              </div>
            </div>
          )}
        </Row>

        {isCreatingBanner && (
          <AddNewBannerForm
            form={form}
            handleOnChange={handleOnChange}
            setIsCreatingBanner={setIsCreatingBanner}
          />
        )}
      </div>
    </UserLayout>
  );
};

export default FeatureBanner;
