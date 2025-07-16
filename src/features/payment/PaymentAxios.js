import { apiProcessor } from "../../services/apiProcessor";

export const makePaymentAxios = () => {
  return apiProcessor({
    method: "get",
    url: import.meta.env.VITE_BACKEND_BASE_URL + "/payment/checkout",
    isPrivate: true,
  });
};

export const verifyPaymentSession = (sessionId, orderObj) => {
  return apiProcessor({
    method: "post",
    url:
      import.meta.env.VITE_BACKEND_BASE_URL +
      `/payment/verify-session?session_id=${sessionId}`,
    isPrivate: false,
    data: orderObj
  });
};
