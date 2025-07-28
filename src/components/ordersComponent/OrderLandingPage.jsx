import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrderNoPaginationAction } from "../../features/orders/orderActions";

const OrderLandingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);
  const { ordersNoPagination } = useSelector((state) => state.orderInfo);

  const selectedOrder = ordersNoPagination?.find((item) => item._id === id);

  console.log(selectedOrder);

  useEffect(() => {
    const fetchingAllOrders = async () => {
      await dispatch(getAllOrderNoPaginationAction());
    };
    fetchingAllOrders();
  }, [dispatch]);
  return (
    <section className="d-flex justify-content-center">
      <div className="col-10 d-flex align-items-center flex-column">
        <h1>Tracking Order</h1>
        <header className="d-flex justify-content-between w-100">
          <p>
            {/* <p style={{ marginInlineEnd: "auto" }}> */}
            Tracking Number <span></span>
          </p>
          {/* <p style={{ marginInlineStart: "auto" }}> */}
          <p>
            Order Number <span></span>
          </p>
        </header>
      </div>
    </section>
  );
};

export default OrderLandingPage;
