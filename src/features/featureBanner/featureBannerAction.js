import { toast } from "react-toastify";
import { setFeatureBanner } from "./featureBannerSlice";
import { createFeatureBannerApi, deleteFeatureBannerApi, fetchFeatureBannerApi, updateFeatureBannerApi } from "./featureBannerApi";
import { createRecentActivityWithAuthenticationAction } from "../recentActivity/recentActivityAction";

export const createFeatureBannerAction = (obj) => async (dispatch) => {
    const pending = createFeatureBannerApi(obj);

    toast.promise(pending, {
        pending: "Processing..."
    })

    const { status, message, newFeaturedBanner } = await pending

    toast[status](message)
    if (status === "success") {
        dispatch(fetchFeatureBannerAction())
        const recentActivity = {
            action: "bannerCreated",
            entityId: newFeaturedBanner._id,
            entityType: "banner"
        }
        dispatch(createRecentActivityWithAuthenticationAction(recentActivity))
        return true
    }
}

export const fetchFeatureBannerAction = () => async (dispatch) => {
    const { status, message, featuredBanner } = await fetchFeatureBannerApi();
    toast[status](message)
    if (status === "success") {
        dispatch(setFeatureBanner(featuredBanner))
        return featuredBanner
    }
}

export const deleteFeatureBannerAction = (id) => async (dispatch) => {
    const { status, message, deletedBanner } = await deleteFeatureBannerApi(id);
    toast[status](message)
    if (status === "success") {
        dispatch(fetchFeatureBannerAction())

        const recentActivity = {
            action: "bannerDeleted",
            entityId: deletedBanner._id,
            entityType: "banner"
        }
        dispatch(createRecentActivityWithAuthenticationAction(recentActivity))
    }
}
export const updateFeatureBannerAction = (id, updateObj) => async (dispatch) => {
    const pending = updateFeatureBannerApi(id, updateObj)
    console.log(updateObj)
    toast(pending, {
        pending: "Updating ... "
    })
    const { status, message, update } = await pending;
    toast[status](message)
    if (status === "success") {
        dispatch(fetchFeatureBannerAction())

        const recentActivity = {
            action: "bannerUpdated",
            entityId: update._id,
            entityType: "banner"
        }
        dispatch(createRecentActivityWithAuthenticationAction(recentActivity))
        return true
    }
}