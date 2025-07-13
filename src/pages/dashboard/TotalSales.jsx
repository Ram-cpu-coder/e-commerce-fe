import React from "react";
import { Col } from "react-bootstrap";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { IoBagHandleSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const TotalSales = () => {
  return (
    <Col xs={12} sm={6}>
      <div className="border rounded-4 bg-dark text-white py-3 px-4 h-100">
        <div className="d-flex flex-row align-items-center">
          <div className="d-flex flex-row align-items-center gap-2 me-auto">
            <IoBagHandleSharp className="fs-1 bg-secondary rounded-3 p-2" />
            <div className="d-flex flex-column">
              <strong className="fs-5">Total Sales</strong>
              <span className="text-secondary">731 Orders</span>
            </div>
          </div>
          <MdOutlineKeyboardArrowRight className="fs-4" />
        </div>
        <p className="fs-2 my-3">$9,328.55</p>
        <div className="d-flex flex-row align-items-center">
          <p className="me-auto">
            <HiMiniArrowTrendingUp /> <span>+15.6%</span>
          </p>
          <p>
            +1.4k <span className="text-secondary">this week</span>
          </p>
        </div>
      </div>
    </Col>
  );
};

export default TotalSales;
