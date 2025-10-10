import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrderNoPaginationAction } from "../../features/orders/orderActions";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { UserLayout } from "../layouts/UserLayout";

const OrderLandingPage = () => {
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

  const { ordersNoPagination } = useSelector((state) => state.orderInfo);

  const selectedOrder = ordersNoPagination?.find((item) => item._id === id);

  console.log(selectedOrder);

  useEffect(() => {
    const fetchingAllOrders = async () => {
      await dispatch(getAllOrderNoPaginationAction());
    };
    fetchingAllOrders();
  }, [dispatch]);
  const steps = ["Pending", "Confirmed", "Shipped", "In Transit", "Delivered"];
  return (
    <UserLayout pageTitle="Track Your Order">
      <section className="d-flex flex-column align-items-center">
        <div className="col-10 d-flex flex-column">
          {/* <h1 className="text-center">Tracking Order</h1> */}
          <header className="d-flex justify-content-between w-100">
            <p className="d-flex flex-column">
              <strong>Tracking Number</strong> <span>{selectedOrder?._id}</span>
            </p>
          </header>
          {/*  Stepper */}
          <p>
            <strong>Courier: </strong> Australian Post
          </p>
        </div>

        {/* for stepper we will control the activeStep */}
        <Stepper activeStep={0} alternativeLabel className="col-10 my-5">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* ordered products images */}
        <div className="col-10 mb-5 d-flex flex-column">
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

        {/* input field to enter the email and the description or let's say comment for that order to be send to the admin  */}

        {/* Status Timeline */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Status Timeline
          </h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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

        {/* Contact Form */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Contact Support
          </h3>
          <p className="text-gray-600 mb-4">
            Have questions about your order? Send us a message.
          </p>

          {/* {isSubmitted ? (
            <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Your message has been sent successfully!
            </div>
          ) : null} */}

          {/* <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Send Message
            </button>
          </form> */}
        </div>
        {/* </div> */}
      </section>
    </UserLayout>
  );
};

export default OrderLandingPage;
