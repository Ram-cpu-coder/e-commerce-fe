import React from "react";
import { Col } from "react-bootstrap";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const TopCategories = () => {
  const data = [
    { name: "Electronics", value: 400 },
    { name: "Fashion", value: 300 },
    { name: "Grocery", value: 300 },
    { name: "Others", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20; // push label further out
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#333"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <Col xs={12} md={3}>
      <div className="border rounded-4 py-4 px-3 h-100 d-flex flex-column">
        <strong className="text-center mb-3 fs-5">Top Categories</strong>

        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{ fontSize: "0.8rem" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Col>
  );
};

export default TopCategories;
