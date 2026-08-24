import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Analytics = () => {
  const dataFilter = ["Week", "Month", "Year"];
  const [stateButton, setStateButton] = useState("Week");

  const data = [
    { name: "Transport", value: 325 },
    { name: "Food", value: 425 },
    { name: "Entertainment", value: 350 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  return (
    <div className="main-block page-analytics">
      <h3 className="title-h3">financial insights</h3>
      <h2 className="title-h2">Analytics</h2>
      <div className="filter-analytics">
        {dataFilter.map((item, index) => {
          return (
            <button
              key={index}
              className={
                stateButton === item
                  ? "btn btn-filter active"
                  : "btn btn-filter"
              }
              onClick={() => setStateButton(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="filter-donut">
        <div className="camembert">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={175}
              cy={175}
              innerRadius={60} // Makes it a donut chart (optional)
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
