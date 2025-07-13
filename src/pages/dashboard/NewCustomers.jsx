import React from "react";
import { Col } from "react-bootstrap";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { IoBagHandleSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const NewCustomers = () => {
  return (
    <Col xs={12} sm={6}>
      <div className="border rounded-4 py-3 px-4 h-100">
        <div className="d-flex flex-row align-items-center">
          <div className="d-flex flex-row align-items-center gap-2 me-auto">
            <IoBagHandleSharp className="fs-1 bg-warning rounded-3 p-2" />
            <div className="d-flex flex-column">
              <strong className="fs-5">New Customers</strong>
              <span className="text-muted">324 Signups</span>
            </div>
          </div>
          <MdOutlineKeyboardArrowRight className="fs-4" />
        </div>
        <p className="fs-2 my-3">1,294</p>
        <div className="d-flex flex-row align-items-center">
          <p className="me-auto">
            <HiMiniArrowTrendingUp /> <span>+9.2%</span>
          </p>
          <p>
            +180 <span className="text-muted">this week</span>
          </p>
        </div>
      </div>
    </Col>
  );
};

export default NewCustomers;
