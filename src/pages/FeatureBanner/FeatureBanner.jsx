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

const FeatureBanner = () => {
  const dispatch = useDispatch();

  const { featureBanner } = useSelector((state) => state.featureBannerInfo);

  const { form, handleOnChange } = useForm({
    searchQuery: "",
    date: "newest",
  });

  const [isCreatingBanner, setIsCreatingBanner] = useState(false);

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
        <ControlBarFeatureBanner form={form} handleOnChange={handleOnChange} />
        <hr />
        <div className="d-flex flex-row flex-wrap justify-content-start gap-4 mt-4 w-100">
          {/* Adding new Banner */}
          <NewFeatureBanner setIsCreatingBanner={setIsCreatingBanner} />

          {featureBanner?.length > 0
            ? featureBanner.map((item) => (
                <FeatureBannerCard key={item._id} item={item} />
              ))
            : ""}
        </div>

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
