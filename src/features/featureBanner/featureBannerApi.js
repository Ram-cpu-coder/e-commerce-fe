import { apiProcessor } from "../../services/apiProcessor"

const URL = import.meta.env.VITE_BACKEND_BASE_URL + "/featureBanner"
export const createFeatureBannerApi = (obj) => {
    return apiProcessor({
        method: "post",
        url: URL,
        data: obj,
        isPrivate: true,
        contentType: "multipart/form-data",
    })
}
export const fetchFeatureBannerApi = () => {
    return apiProcessor({
        method: "get",
        url: URL,
    })
}
export const deleteFeatureBannerApi = (id) => {
    return apiProcessor({
        method: "delete",
        url: `${URL}/${id}`,
        isPrivate: true
    })
}