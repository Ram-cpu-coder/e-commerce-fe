import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  handleStockAction,
  verifyPaymentAction,
} from "../../features/payment/PaymentActions";
import { updateOrderAction } from "../../features/orders/orderActions";
import { useNavigate } from "react-router-dom";
import { deleteCartAction } from "../../features/cart/cartAction";
import { createUserHistoryAction } from "../../features/userHistory/userHistoryAction";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import {
  createRecentActivityAction,
  createRecentActivityWithAuthenticationAction,
} from "../../features/recentActivity/recentActivityAction";

const CheckOutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingAddress = localStorage.getItem("shippingAddressNew");
  const { user } = useSelector((state) => state.userInfo);
  const { cart } = useSelector((state) => state.cartInfo);

  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  console.log(cart, "cart");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      if (!stripe || !elements) {
        return;
      }

      const hasEnoughStock = await dispatch(handleStockAction());

      if (!hasEnoughStock) {
        toast.error("Not Enough Stock!");
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/`,
        },
        redirect: "if_required",
      });

      if (error) {
        alert(error?.message);
        return;
      }

      if (paymentIntent?.status !== "succeeded") {
        toast("Payment Failed!");
        // I need to add the roll back fucntion for the stock
        return;
      }
      const response = await dispatch(
        verifyPaymentAction({
          shippingAddress:
            !shippingAddress === undefined ? shippingAddress : user.address,
          userId: user._id,
        })
      );

      const { order, verified } = response;
      if (verified === true) {
        await dispatch(
          updateOrderAction({
            _id: order?._id,
            status: "confirmed",
            paymentIntent,
          })
        );
        await dispatch(
          createRecentActivityWithAuthenticationAction({
            action: "orderPlaced",
            entityId: order?._id,
            entityType: "order",
          })
        );
        await dispatch(deleteCartAction());

        await dispatch(
          createUserHistoryAction(
            cart?.map((item) => {
              return {
                userId: user._id || null,
                productId: item._id,
                categoryId: item.category,
                action: "purchase",
              };
            })
          )
        );
        console.log("After Order update");

        navigate("/");
      }
    } finally {
      setProcessing(false);
    }
  };
  return (
    <div style={{ minHeight: "80vh" }}>
      {/* order Summary and the shipping address */}
      {/* order summary */}
      {/* shipping address */}
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <div className="d-flex justify-content-center mt-3">
          <Button disabled={!stripe || processing} type="submit">
            {processing ? (
              <div className=" d-flex align-items-center gap-2">
                <Spinner
                  className="border-1"
                  style={{ width: "1.5rem", height: "1.5rem" }}
                />
                Processing
              </div>
            ) : (
              "Place Order"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;
