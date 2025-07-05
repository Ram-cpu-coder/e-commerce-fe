import { toast } from "react-toastify";
import { setFeatureBanner } from "./featureBannerSlice";
import { createFeatureBannerApi, fetchFeatureBannerApi } from "./featureBannerApi";

export const createFeatureBannerAction = (obj) => async (dispatch) => {
    const pending = createFeatureBannerApi(obj);

    toast.promise(pending, {
        pending: "Processing..."
    })

    const { status, message, newFeaturedBanner } = await pending

    if (status === "success") {
        dispatch(fetchFeatureBannerAction())
        return true
    }
}

export const fetchFeatureBannerAction = () => async (dispatch) => {
    const { status, message, featuredBanner } = await fetchFeatureBannerApi();
    toast[status](message)
    if (status === "success") {
        dispatch(setFeatureBanner(featuredBanner))
    }
}