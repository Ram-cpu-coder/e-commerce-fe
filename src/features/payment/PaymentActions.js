import { toast } from "react-toastify";
import { makePaymentAxios, verifyPaymentSession } from "./PaymentAxios.js";

export const makePaymentAction = async () => {
  const pending = makePaymentAxios();
  toast.promise(pending, {
    pending: "Redirecting to payment page...",
  });
  const data = await pending;
  if (data.status === "success") {
    return data;
  }
  toast[data.status](data.message);
};

export const verifyPaymentAction = async (sessionId, obj) => {
  const pending = verifyPaymentSession(sessionId, obj);
  toast.promise(pending, {
    pending: "Verifying the payment ...",
  });

  try {
    const data = await pending;
    console.log(data)
    if (data?.verified === true) {
      toast.success("Successfully placed the order!");
      return data;
    }

    toast.error(data.message || "Order verification failed.");
    return null;
  } catch (error) {
    toast.error("An unexpected error occurred during verification.");
    return null;
  }
};

