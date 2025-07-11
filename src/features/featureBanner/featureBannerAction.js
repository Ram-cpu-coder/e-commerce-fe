import { toast } from "react-toastify";
import { setFeatureBanner } from "./featureBannerSlice";
import { createFeatureBannerApi, deleteFeatureBannerApi, fetchFeatureBannerApi, updateFeatureBannerApi } from "./featureBannerApi";

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

export const deleteFeatureBannerAction = (id) => async (dispatch) => {
    const { status, message, deletedBanner } = await deleteFeatureBannerApi(id);
    toast[status](message)
    if (status === "success") {
        dispatch(fetchFeatureBannerAction())
    }
}
export const updateFeatureBannerAction = (id, updateObj) => async (dispatch) => {
    const pending = updateFeatureBannerApi(id, updateObj)
    toast(pending, {
        pending: "Updating ... "
    })
    const { status, message, update } = await pending;
    toast[status](message)
    if (status === "success") {
        dispatch(fetchFeatureBannerAction())
    }
}