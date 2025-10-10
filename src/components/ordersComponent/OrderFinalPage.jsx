import { Elements } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import CheckOutForm from "../../pages/payment/CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { makePaymentAction } from "../../features/payment/PaymentActions";
import { toast } from "react-toastify";
import OrderSummaryCard from "./OrderSummaryCard";

const OrderFinalPage = () => {
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState(null);

  const { cart } = useSelector((state) => state.cartInfo);

  const handleOrderConfirmation = async () => {
    try {
      const data = await dispatch(makePaymentAction());
      setClientSecret(data?.paymentIntent?.client_secret);
    } catch (error) {
      toast.error("Something went wrong during checkout");
    }
  };

  const stripePromise = loadStripe(
    "pk_test_51RTBwfFT5aSpx6hL9yjuit9otXGJrq0FfRvDMOVihFGfXwQJv6Hc4hqhGv44091BO8fohBAay5grzEZNHgmMDWlx001lQaMhgU"
  );

  return (
    <div className="row col-12 col-md-8 col-lg-7">
      <div className="container d-flex justify-content-center gap-3">
        <section className="w-50 border-end ">
          <h5>Order Summary</h5>

          <div className="d-flex flex-column align-items-center bg-white py-3 position-relative vh-100">
            <div>
              {cart.map((item, index) => (
                <OrderSummaryCard item={item} key={index} />
              ))}
            </div>

            <Button onClick={() => handleOrderConfirmation()}>Confirm</Button>
          </div>
        </section>

        {clientSecret && (
          <section className="w-50">
            <h5>Payment</h5>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckOutForm />
            </Elements>
          </section>
        )}
      </div>
    </div>
  );
};

export default OrderFinalPage;
