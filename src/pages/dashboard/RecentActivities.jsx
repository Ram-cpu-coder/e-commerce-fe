import React from "react";
import { Col, Row } from "react-bootstrap";

const RecentActivities = () => {
  return (
    <Row className="g-3 mt-3">
      <Col>
        <div className="border rounded-4 py-3 px-4 h-100 d-flex flex-column">
          <strong className="fs-5">Recent Activity</strong>
          <hr />
          <div className="d-flex flex-column">
            <p>Activity1</p>
            <p>Activity1</p>
            <p>Activity1</p>
            <p>Activity1</p>
            <p>Activity1</p>
            <p>Activity1</p>
            <p>Activity1</p>
            <p>Activity1</p>
            <p>Activity1</p>
            <p>Activity1</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default RecentActivities;
