import React from "react";
import { Col, Form } from "react-bootstrap";

const SalesPerformance = () => {
  return (
    <Col xs={12} md={9}>
      <div className="border rounded-4 py-3 px-4 h-100">
        {/* header part  */}
        <div className="d-flex justify-content-between align-items-center">
          <strong className="fs-5">Sales Performance</strong>

          <div className="d-flex gap-3" style={{ width: "50%" }}>
            <Form.Select className="w-50 h-100 rounded-4">
              <option>Export Data</option>
              <option value="pdf">Pdf File</option>
              <option value="word">Word File</option>
              <option value="excel">Excel File</option>
            </Form.Select>
            <Form.Select className="w-50 h-100 rounded-4">
              <option value="14d">Last 14 Days</option>
              <option value="1mnth">Last Month</option>
              <option value="3mnths">Last 3 Months</option>
              <option value="6mnths">Last 6 Months</option>
              <option value="1yr">Last 1 year</option>
            </Form.Select>
          </div>
        </div>

        {/* Line chart */}
      </div>
    </Col>
  );
};

export default SalesPerformance;
