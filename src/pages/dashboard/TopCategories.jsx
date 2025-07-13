import React from "react";
import { Col } from "react-bootstrap";

const TopCategories = () => {
  return (
    <Col xs={12} md={3}>
      <div className="border rounded-4 py-3 px-4 h-100">
        <strong className="fs-5">Top Categories</strong>

        {/* Pie chart */}
      </div>
    </Col>
  );
};

export default TopCategories;
