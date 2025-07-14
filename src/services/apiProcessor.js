import axios from "axios";

const authEp = import.meta.env.VITE_BACKEND_BASE_URL + "/auth";

let isRefreshing = false
let refreshPromise = null

const getAccessJWT = () => {
  return sessionStorage.getItem("accessJWT");
};

const getRefreshJWT = () => {
  return localStorage.getItem("refreshJWT");
};

// api processor
export const apiProcessor = async ({
  method,
  url,
  isPrivate,
  isRefreshToken = false,
  data,
  contentType = "application/json",
  responseType = undefined,
}) => {
  // setting the headers
  const headers = {
    Authorization: isPrivate
      ? getAccessJWT()
      : isRefreshToken
        ? getRefreshJWT()
        : null,
    "Content-type": contentType,
  };

  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
      responseType
    });
    return response.data;
  } catch (error) {
    const errorMsg = error?.response?.data?.message || error?.message;

    // Avoid retrying the refresh endpoint itself
    if (errorMsg === "jwt expired" && !isRefreshToken) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = (async () => {
          try {
            // Call apiProcessor to refresh the token itself
            const refreshData = await apiProcessor({
              method: "get",
              url: authEp + "/renew-jwt",
              isPrivate: false,
              isRefreshToken: true,
            });

            if (refreshData?.accessToken) {
              sessionStorage.setItem("accessJWT", refreshData.accessToken);
            }

            isRefreshing = false;
            return refreshData;
          } catch (refreshError) {
            sessionStorage.removeItem("accessJWT");
            sessionStorage.removeItem("refreshJWT");

            console.warn("Refresh token expired. Logging out.");
          } finally {
            isRefreshing = false;
          }
        })();
      }


      const refreshData = await refreshPromise
      if (refreshData?.accessToken) {

        // returning the actual original api processor
        return apiProcessor({
          method,
          data,
          url,
          isPrivate,
          contentType,
          responseType,
        });
      } else {
        return {
          status: "error",
          message: "Unable to refresh token",
        };
      }

    }

    return {
      status: "error",
      message: errorMsg,
    };
  }
};
