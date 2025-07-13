import React from "react";
import { Col, Form } from "react-bootstrap";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SalesPerformance = () => {
  const data = [
    { name: "Jan", sales: 4000, profit: 2400 },
    { name: "Feb", sales: 3000, profit: 1398 },
    { name: "Mar", sales: 2000, profit: 9800 },
    { name: "Apr", sales: 2780, profit: 3908 },
    { name: "May", sales: 1890, profit: 4800 },
  ];
  return (
    <Col xs={12} md={9}>
      <div className="border rounded-4 py-3 px-4 h-100 d-flex flex-column gap-4">
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
        <LineChart height={400} width={1000} data={data} className="w-100">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="" />
          <Tooltip />
          <CartesianGrid stroke="#ffffffff" />
          <Line type="monotone" dataKey="sales" stroke="#ff7300" />
          <Line type="monotone" dataKey="profit" stroke="#387908" />
        </LineChart>
      </div>
    </Col>
  );
};

export default SalesPerformance;
