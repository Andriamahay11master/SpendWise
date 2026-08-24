import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
        <ResponsiveContainer width="100%" aspect={1}>
          <PieChart>
            <Pie
              data={data}
              cx={"50%"}
              cy={"45%"}
              innerRadius={"30%"} // Makes it a donut chart (optional)
              outerRadius={"55%"}
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
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default Analytics;
