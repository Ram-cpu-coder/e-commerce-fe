import React, { useState } from "react";
import { makePaymentAction } from "../features/payment/PaymentActions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../hooks/useForm";
import { Form } from "react-bootstrap";

import { updateUserAction } from "../features/user/userAction";
import ShippingAddressForm from "./shippingAddress/ShippingAddressForm";
import { setShippingAddress } from "../features/orders/orderSlice";
import CheckOutForm from "../pages/payment/CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const ShippingAddress = () => {
  const dispatch = useDispatch();
  const { handleOnChange, form } = useForm({});

  const { user } = useSelector((state) => state.userInfo);

  const [clientSecret, setClientSecret] = useState(null);

  // checkout
  const handleCheckoutAction = async (mode) => {
    const fullAddress = `Unit ${form.unit}/${form.street}, ${form.city}, ${form.state}, ${form.postalCode}, ${form.country}`;
    localStorage.setItem("shippingAddressNew", fullAddress);

    if (mode === "update") {
      await dispatch(setShippingAddress(fullAddress));

      if (!user.address || user.address.length === 0) {
        dispatch(updateUserAction({ address: fullAddress }));
      }
    }

    if (mode === "existing") {
      dispatch(setShippingAddress(fullAddress));
    }

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
    <div className="d-flex w-100 justify-content-center my-5">
      <div className="row col-9 col-md-6 col-lg-5">
        {!clientSecret && <h1 className="py-2">Add Shipping Address</h1>}
        {/* if user wants to go with existing address */}
        {user.address && !clientSecret ? (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0 border px-3 rounded">{user.address}</p>
              <button
                className="btn btn-link"
                onClick={() => handleCheckoutAction("existing")}
              >
                Existing address
              </button>
            </div>
            <b className="my-4">Or, New address</b>
          </>
        ) : (
          ""
        )}
        {/*  */}
        {!clientSecret && (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheckoutAction("update");
            }}
          >
            <ShippingAddressForm form={form} handleOnChange={handleOnChange} />
          </Form>
        )}
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckOutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default ShippingAddress;
