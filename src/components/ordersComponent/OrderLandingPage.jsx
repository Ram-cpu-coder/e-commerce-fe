import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrderNoPaginationAction } from "../../features/orders/orderActions";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { UserLayout } from "../layouts/UserLayout";
import axios from "axios";
import { toast } from "react-toastify";

const OrderLandingPage = () => {
  const inquiryURL = import.meta.env.VITE_BACKEND_BASE_URL + "/inquiry/order";

  const [orderData] = useState({
    id: "ORD-789456123",
    status: "Shipped",
    courier: "Australian Post",
    products: [
      { id: 1, name: "Wireless Headphones", price: 129.99, quantity: 1 },
      { id: 2, name: "Smartphone Case", price: 24.99, quantity: 2 },
      { id: 3, name: "USB Charger", price: 19.99, quantity: 1 },
    ],
    statusHistory: [
      {
        status: "Pending",
        date: "2023-05-15",
        time: "10:30 AM",
        description: "Order placed successfully",
      },
      {
        status: "Confirmed",
        date: "2023-05-15",
        time: "2:15 PM",
        description: "Payment confirmed",
      },
      {
        status: "Shipped",
        date: "2023-05-16",
        time: "9:45 AM",
        description: "Package shipped via Australian Post",
      },
      {
        status: "In Transit",
        date: "2023-05-17",
        time: "3:20 PM",
        description: "Package is on the way",
      },
      { status: "Delivered", date: "", time: "", description: "" },
    ],
  });

  const { id } = useParams();
  const dispatch = useDispatch();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { ordersNoPagination } = useSelector((state) => state.orderInfo);

  const selectedOrder = ordersNoPagination?.find((item) => item._id === id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitted(false);

    // Basic validation before hitting backend
    if (message.trim().length < 10) {
      alert("Message should be at least 10 characters long.");
      return;
    }

    try {
      const obj = {
        customer_name: name.trim(),
        customer_email: email.trim(),
        customer_message: message.trim(),
        orderNumber: selectedOrder?._id || "N/A", // dynamic fallback
      };

      const response = await axios.post(inquiryURL, obj, {
        headers: { "Content-Type": "application/json" },
      });

      // Check for valid response
      if (response.status !== 200 && response.status !== 201) {
        alert("Form could not be submitted! Try again later.");
        return;
      }

      setIsSubmitted(true);
      setEmail("");
      setName("");
      setMessage("");
      toast("Submitted");
      setLoading(false);
    } catch (error) {
      console.error(
        "❌ Submission error:",
        error.response?.data || error.message
      );

      // More user-friendly feedback
      if (error.response?.status === 400) {
        alert(error.response.data?.message || "Invalid form data.");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  console.log(selectedOrder, 999);

  useEffect(() => {
    const fetchingAllOrders = async () => {
      await dispatch(getAllOrderNoPaginationAction());
    };
    fetchingAllOrders();
  }, [dispatch]);
  const steps = ["Pending", "Confirmed", "Shipped", "In Transit", "Delivered"];
  return (
    <UserLayout pageTitle="Track Your Order">
      <section className="d-flex flex-column align-items-center col-12 col-md-11 col-lg-8">
        <div className="col-10 d-flex flex-column align-items-center">
          <header className="d-flex justify-content-between w-100">
            <p className="d-flex justify-content-center w-100">
              <strong>Tracking Number: </strong>{" "}
              <span> &nbsp;{selectedOrder?._id}</span>
            </p>
          </header>
          {/*  Stepper */}
          <p>
            <strong>Courier: </strong> Australian Post
          </p>
        </div>

        {/* for stepper we will control the activeStep */}
        <Stepper activeStep={0} alternativeLabel className="col-12 my-5">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* ordered products images */}
        <div className="col-10 mb-5 d-flex flex-column align-items-center">
          <strong className="mb-2">Ordered Items</strong>
          <span>
            {selectedOrder?.products?.map((item) => {
              return (
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="me-3"
                  style={{ height: "50px", width: "50px", aspectRatio: "10/5" }}
                />
              );
            })}
          </span>
        </div>

        {/* table that shows the status , time and the description or maye be no description */}
        {/* Status Timeline */}
        <div className="mb-10 col-10 d-flex flex-column align-items-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Status Timeline
          </h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden col-12">
            <table className="min-w-full divide-y divide-gray-200 w-100">
              <thead className="bg-gray-50">
                <tr className="w-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-4">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-4">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-4">
                    Description
                  </th>
                </tr>
              </thead>
              {/* <tbody className="bg-white divide-y divide-gray-200">
                {orderData.statusHistory.map((status, index) => (
                  <tr
                    key={index}
                    className={
                      index <= getCurrentStatusIndex() ? "bg-indigo-50" : ""
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-2 ${
                            index <= getCurrentStatusIndex()
                              ? "bg-indigo-600"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span
                          className={
                            index <= getCurrentStatusIndex()
                              ? "font-medium text-indigo-700"
                              : "text-gray-500"
                          }
                        >
                          {status.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {status.date && status.time ? (
                        <>
                          {status.date} at {status.time}
                        </>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {status.description || (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
        </div>

        {/* input field to enter the email and the description or let's say comment for that order to be send to the admin  */}
        {/* Contact Form */}
        <div className="bg-light p-4 rounded col-10 my-3 d-flex flex-column align-items-center">
          <h3 className="h5 fw-semibold mb-3 text-dark">Contact Support</h3>
          <p className="text-secondary mb-3">
            Have questions about your order? Send us a message.
          </p>

          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center col-9"
          >
            {[
              {
                id: "name",
                label: "Name",
                type: "text",
                value: name,
                setter: setName,
                placeholder: "John Doe",
              },
              {
                id: "email",
                label: "Email Address",
                type: "email",
                value: email,
                setter: setEmail,
                placeholder: "your.email@example.com",
              },
            ].map((field) => (
              <div key={field.id} className="mb-3 w-100">
                <label htmlFor={field.id} className="form-label">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  required
                  className="form-control"
                />
              </div>
            ))}

            <div className="mb-3 w-100">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="form-control"
                placeholder="Enter your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary rounded py-2 px-4"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </UserLayout>
  );
};

export default OrderLandingPage;
